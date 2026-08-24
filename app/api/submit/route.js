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
    const ipAddress = request.headers.get("x-forwarded-for") || "127.0.0.1";
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

    // Honeypot anti-spam check
    if ((fields._honeypot && fields._honeypot.trim() !== "") || (fields.company_website_hp && fields.company_website_hp.trim() !== "")) {
      return Response.json({ success: false, message: "Spam submission rejected." }, { status: 400 });
    }

    const formType = fields._formType || fields.formType || fields.leadType || "Vendor Registration";
    const company = sanitizeString(fields.company || fields.company_name || "");
    const name = sanitizeString(fields.contact_person || fields.name || fields.signatory_name || fields.full_name || "");
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

      const uploadDir = path.join(process.cwd(), 'public', 'local_uploads');
      await fs.mkdir(uploadDir, { recursive: true });

      for (const up of uploads) {
        const sanitizedFilename = up.originalname.replace(/\s+/g, "_");
        const localFilePath = path.join(uploadDir, `${submissionId}_${sanitizedFilename}`);
        await fs.writeFile(localFilePath, up.buffer);
        fileUrls[up.fieldname] = `/local_uploads/${submissionId}_${sanitizedFilename}`;
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

    // Save submission locally
    const localDir = path.join(process.cwd(), 'public', 'local_submissions');
    await fs.mkdir(localDir, { recursive: true });
    const submissionPath = path.join(localDir, `submission_${submissionId}.json`);
    await fs.writeFile(submissionPath, JSON.stringify(record, null, 2), 'utf8');

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
      if (fields.email) fbFormData.append('_replyto', fields.email);
      if (fields.name || fields.contact_person || fields.full_name) {
        fbFormData.append('_name', fields.name || fields.contact_person || fields.full_name);
      }

      for (const [k, v] of Object.entries(fields)) {
        if (typeof v === 'string' && v.trim() !== '' && !fbFormData.has(k) && !k.startsWith('_')) {
          fbFormData.append(k, v.trim());
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
        let errText = "FormBold submission error.";
        try {
          const errJson = await fbResponse.json();
          errText = errJson.message || errText;
        } catch (pErr) {
          const txt = await fbResponse.text();
          if (txt) errText = txt;
        }
        console.error(`FormBold returned status ${fbResponse.status}:`, errText);
        return Response.json({ success: false, message: errText }, { status: fbResponse.status || 500 });
      }

      console.log(`[FormBold Success] ${formType} (${submissionId}) forwarded to FormBold successfully.`);
    } catch (fbErr) {
      console.error("FormBold fetch exception:", fbErr);
      return Response.json({
        success: false,
        message: "Form submission connection error. Please try again."
      }, { status: 502 });
    }

    return Response.json({
      success: true,
      message: "Thank you! Your submission has been received. Our team will contact you shortly.",
      submission_id: submissionId
    });

  } catch (err) {
    console.error("Error in /api/submit route handler:", err);
    return Response.json({ success: false, message: "Internal server error occurred." }, { status: 500 });
  }
}
