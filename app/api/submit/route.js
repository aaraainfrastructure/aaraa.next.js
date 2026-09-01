import fs from 'node:fs/promises';
import path from 'node:path';

const FORMBOLD_URL = 'https://formbold.com/s/oYAAv';

/* ---------- Helper: HTML escape (XSS Protection) ---------- */
function sanitizeString(str) {
  if (typeof str !== "string") return str;
  return str.trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/* ---------- Helper: Validate File Upload Security ---------- */
function validateFile(filename, mimeType, bufferSize) {
  const allowedExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(filename).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return { valid: false, message: `Extension ${ext} is not allowed.` };
  }
  const maxSizeBytes = 10 * 1024 * 1024; // 10MB
  if (bufferSize > maxSizeBytes) {
    return { valid: false, message: `File size exceeds 10MB limit.` };
  }
  return { valid: true };
}

export async function POST(request) {
  try {
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
    const contentType = request.headers.get("content-type") || "";

    let fields = {};
    let uploads = [];

    if (contentType.includes("application/json")) {
      fields = await request.json();
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          if (value.name && value.size > 0) {
            const buffer = Buffer.from(await value.arrayBuffer());
            uploads.push({
              fieldname: key,
              originalname: value.name,
              mimetype: value.type,
              size: value.size,
              buffer
            });
          }
        } else {
          fields[key] = value;
        }
      }
    }

    // Safe Honeypot anti-spam check
    const hp1 = fields._honeypot;
    const hp2 = fields.company_website_hp;
    if ((typeof hp1 === 'string' && hp1.trim() !== '') || (typeof hp2 === 'string' && hp2.trim() !== '')) {
      return Response.json({ success: false, message: "Spam submission rejected." }, { status: 400 });
    }

    const formType = fields._formType || fields.formType || fields.leadType || "Project Consultation";
    const company = sanitizeString(fields.company || fields.company_name || fields.companyName || "");
    const name = sanitizeString(fields.contact_person || fields.name || fields.signatory_name || fields.full_name || fields.fullName || "");
    const category = sanitizeString(fields.vendor_category || fields.vendorCategory || "");

    const timestamp = new Date().toISOString();
    const submissionId = `AARAA-${Date.now().toString(36).toUpperCase()}`;

    const fileUrls = {};
    if (uploads.length > 0) {
      for (const up of uploads) {
        const check = validateFile(up.originalname, up.mimetype, up.size);
        if (!check.valid) {
          return Response.json({ success: false, message: check.message }, { status: 400 });
        }
      }

      // Safe local upload write (with try...catch fallback for read-only serverless filesystems like Vercel)
      try {
        const uploadDir = path.join(process.cwd(), 'public', 'local_uploads');
        await fs.mkdir(uploadDir, { recursive: true });

        for (const up of uploads) {
          const sanitizedFilename = up.originalname.replace(/\s+/g, "_");
          const localFilePath = path.join(uploadDir, `${submissionId}_${sanitizedFilename}`);
          await fs.writeFile(localFilePath, up.buffer);
          fileUrls[up.fieldname] = `/local_uploads/${submissionId}_${sanitizedFilename}`;
        }
      } catch (fsUploadErr) {
        console.warn("[Local Upload Backup Warning] Could not save upload locally (read-only filesystem):", fsUploadErr.message);
      }
    }

    const record = {
      submission_id: submissionId,
      form_type: formType,
      timestamp,
      fields,
      fileUrls,
      page_url: sanitizeString(fields._pageUrl || fields.sourceUrl || "Unknown"),
      ipAddress
    };

    // Safe local submission save (with try...catch fallback for read-only serverless filesystems like Vercel)
    try {
      const localDir = path.join(process.cwd(), 'public', 'local_submissions');
      await fs.mkdir(localDir, { recursive: true });
      const submissionPath = path.join(localDir, `submission_${submissionId}.json`);
      await fs.writeFile(submissionPath, JSON.stringify(record, null, 2), 'utf8');
    } catch (fsDirErr) {
      console.warn("[Local Submission Backup Warning] Could not save submission locally (read-only filesystem):", fsDirErr.message);
    }

    // Forward to FormBold
    try {
      const fbFormData = new FormData();
      const subjectText = company 
        ? `AARAA ${formType} — ${company}${category ? ` (${category})` : ''}` 
        : `AARAA ${formType} Submission — ${name || submissionId}`;

      fbFormData.append('subject', subjectText);
      fbFormData.append('_subject', subjectText);
      fbFormData.append('form_type', formType);
      fbFormData.append('submission_id', submissionId);
      if (fields.email && typeof fields.email === 'string') fbFormData.append('_replyto', fields.email.trim());
      if (name) fbFormData.append('_name', name);

      // Safe field iteration (handles string, boolean, number, array, object)
      for (const [k, v] of Object.entries(fields)) {
        if (v === null || v === undefined) continue;
        if (k.startsWith('_') || fbFormData.has(k)) continue;

        if (typeof v === 'string') {
          if (v.trim() !== '') fbFormData.append(k, v.trim());
        } else if (typeof v === 'number' || typeof v === 'boolean') {
          fbFormData.append(k, String(v));
        } else if (Array.isArray(v)) {
          fbFormData.append(k, v.join(', '));
        } else if (typeof v === 'object') {
          fbFormData.append(k, JSON.stringify(v));
        }
      }

      if (uploads.length > 0) {
        for (const up of uploads) {
          const blob = new Blob([up.buffer], { type: up.mimetype || 'application/octet-stream' });
          fbFormData.append(up.fieldname, blob, up.originalname);
        }
      }

      const fbResponse = await fetch(FORMBOLD_URL, {
        method: 'POST',
        body: fbFormData,
        headers: { 'Accept': 'application/json' }
      });

      if (!fbResponse.ok) {
        let errText = "FormBold submission failed.";
        try {
          const rawText = await fbResponse.text();
          try {
            const errJson = JSON.parse(rawText);
            errText = errJson.message || errJson.error || rawText;
          } catch {
            if (rawText && rawText.trim()) errText = rawText.slice(0, 200);
          }
        } catch (streamErr) {
          console.error("Could not read FormBold error response stream:", streamErr);
        }

        console.error(`FormBold returned status ${fbResponse.status}:`, errText);
        return Response.json({
          success: false,
          message: "Form submission encountered an issue. Please try again or email aaraainfrastructure@gmail.com directly."
        }, { status: fbResponse.status || 500 });
      }

      console.log(`[FormBold Success] ${formType} (${submissionId}) forwarded to FormBold successfully.`);
    } catch (fbErr) {
      console.error("FormBold fetch exception:", fbErr);
      return Response.json({
        success: false,
        message: "Form submission connection error. Please try again or email aaraainfrastructure@gmail.com directly."
      }, { status: 502 });
    }

    return Response.json({
      success: true,
      message: "Thank you! Your submission has been received. Our team will contact you shortly.",
      submission_id: submissionId
    });

  } catch (err) {
    console.error("Error in /api/submit route handler:", err);
    return Response.json({
      success: false,
      message: "Submission processed with internal notice. Please email aaraainfrastructure@gmail.com if not contacted within 24 hours."
    }, { status: 500 });
  }
}
