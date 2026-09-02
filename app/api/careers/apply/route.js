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

/* ---------- Helper: Validate Phone ---------- */
function isValidPhone(phone) {
  if (!phone) return false;
  const clean = phone.replace(/[-+ ]/g, "").slice(-10);
  return /^[6789]\d{9}$/.test(clean);
}

/* ---------- Helper: Validate Email ---------- */
function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---------- Helper: Validate File Upload Security ---------- */
function validateFile(filename, mimeType, bufferSize) {
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const ext = path.extname(filename).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return { valid: false, message: `Extension ${ext} is not allowed. Only PDF, DOC, DOCX are permitted.` };
  }

  if (mimeType && !allowedMimeTypes.includes(mimeType)) {
    return { valid: false, message: `MIME type ${mimeType} is not allowed. Only PDF, DOC, DOCX are permitted.` };
  }

  const maxSizeBytes = 5 * 1024 * 1024; // 5MB limit
  if (bufferSize > maxSizeBytes) {
    return { valid: false, message: `File size exceeds the 5MB limit.` };
  }

  return { valid: true };
}

/* ---------- Helper: Generate Sequential Application ID (AICRYYYYMMDD-SERIALNO) ---------- */
async function generateCareerApplicationId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  const prefix = `AICR${dateStr}-`;

  let maxSeq = 0;
  try {
    const localDir = path.join(process.cwd(), 'public', 'local_submissions');
    await fs.mkdir(localDir, { recursive: true });
    const files = await fs.readdir(localDir);
    for (const f of files) {
      if (f.startsWith(`careers_${prefix}`)) {
        const match = f.match(/careers_AICR\d{8}-(\d{3})\.json/);
        if (match) {
          const seq = parseInt(match[1], 10);
          if (seq > maxSeq) maxSeq = seq;
        }
      }
    }
  } catch (err) {
    console.warn("Local storage directory read warning (expected on read-only serverless runtimes):", err.message);
  }

  const nextSeq = maxSeq > 0 
    ? String(maxSeq + 1).padStart(3, '0')
    : String(Date.now() % 1000).padStart(3, '0');

  return `${prefix}${nextSeq}`;
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

    // Honeypot Check
    if (fields._honeypot && String(fields._honeypot).trim() !== "") {
      return Response.json({ success: false, message: "Spam detected." }, { status: 400 });
    }

    const formType = "careers";

    // Sanitize fields
    const name = sanitizeString(fields.name || fields.full_name || "");
    const phone = sanitizeString(fields.phone || fields.mobile || "");
    const email = sanitizeString(fields.email || "");
    const message = sanitizeString(fields.message || fields.cover_message || "");
    const position = sanitizeString(fields.position || fields.job_title || "General Application");
    const jobCode = sanitizeString(fields.jobCode || fields.job_id || "N/A");
    const location = sanitizeString(fields.location || fields.current_location || "Unknown");
    const qualification = sanitizeString(fields.qualification || fields.highest_qualification || "N/A");
    const experience = sanitizeString(fields.experience || fields.years_of_experience || "N/A");
    const company = sanitizeString(fields.company || fields.current_company || "N/A");
    const consent = fields.consent === 'true' || fields.consent === true || fields.consent === 'yes';

    if (!name || !phone) {
      return Response.json({ success: false, message: "Name and Mobile Number are required." }, { status: 400 });
    }
    if (!isValidPhone(phone)) {
      return Response.json({ success: false, message: "Please enter a valid 10-digit mobile number." }, { status: 400 });
    }
    if (email && !isValidEmail(email)) {
      return Response.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
    }

    // Generate Application ID in exact AICRYYYYMMDD-SERIALNO format
    const submissionId = await generateCareerApplicationId();
    const timestamp = new Date().toISOString();
    const dateStr = timestamp.split('T')[0];

    const fileUrls = {};

    // File validation & optional local backup
    if (uploads.length > 0) {
      for (const up of uploads) {
        const check = validateFile(up.originalname, up.mimetype, up.size);
        if (!check.valid) {
          return Response.json({ success: false, message: check.message }, { status: 400 });
        }
      }

      try {
        const uploadDir = path.join(process.cwd(), 'public', 'local_uploads');
        await fs.mkdir(uploadDir, { recursive: true });

        for (const up of uploads) {
          const sanitizedFilename = up.originalname.replace(/\s+/g, "_");
          const localFilePath = path.join(uploadDir, `${submissionId}_${sanitizedFilename}`);
          await fs.writeFile(localFilePath, up.buffer);

          const publicUrl = `/local_uploads/${submissionId}_${sanitizedFilename}`;
          fileUrls[up.fieldname] = publicUrl;
          fileUrls[`${up.fieldname}Name`] = up.originalname;
        }
      } catch (uploadErr) {
        console.warn("Local upload storage warning (expected on read-only serverless runtimes):", uploadErr.message);
      }
    }

    const record = {
      application_id: submissionId,
      submission_id: submissionId,
      form_type: formType,
      timestamp,
      createdAt: timestamp,
      full_name: name,
      phone,
      email: email || null,
      current_location: location,
      highest_qualification: qualification,
      years_of_experience: experience,
      current_company: company,
      cover_message: message,
      consent: consent ? "Yes" : "No",
      job_id: jobCode,
      job_title: position,
      application_date: dateStr,
      fileUrls,
      page_url: sanitizeString(fields.sourceUrl || "Unknown"),
      ipAddress,
      lead_status: "new"
    };

    // Save submission locally for persistence (graceful fallback on serverless)
    try {
      const localDir = path.join(process.cwd(), 'public', 'local_submissions');
      await fs.mkdir(localDir, { recursive: true });
      const submissionPath = path.join(localDir, `careers_${submissionId}.json`);
      await fs.writeFile(submissionPath, JSON.stringify(record, null, 2), 'utf8');
    } catch (saveErr) {
      console.warn("Local submission file save warning (expected on read-only serverless runtimes):", saveErr.message);
    }

    // Submit to FormBold for Career Applications
    try {
      const fbFormData = new FormData();
      fbFormData.append('application_id', submissionId);
      fbFormData.append('subject', `AARAA Career Application — ${submissionId} — ${position}`);
      fbFormData.append('_to', 'aaraainfrastructure@gmail.com');
      fbFormData.append('_replyto', email);
      fbFormData.append('job_id', jobCode);
      fbFormData.append('job_title', position);
      fbFormData.append('full_name', name);
      fbFormData.append('email', email);
      fbFormData.append('phone', phone);
      fbFormData.append('current_location', location);
      fbFormData.append('highest_qualification', qualification);
      fbFormData.append('years_of_experience', experience);
      fbFormData.append('current_company', company);
      fbFormData.append('cover_message', message);
      fbFormData.append('consent', consent ? 'Yes' : 'No');
      fbFormData.append('application_date', dateStr);

      if (uploads.length > 0) {
        const up = uploads[0];
        // Construct native File object for proper multipart email attachment handling in Node/FormBold
        const fileObj = new File([up.buffer], up.originalname, { 
          type: up.mimetype || 'application/pdf' 
        });

        fbFormData.append('resume', fileObj, up.originalname);
        fbFormData.append('attachment', fileObj, up.originalname);
        fbFormData.append('file', fileObj, up.originalname);
        fbFormData.append('attached_resume_name', up.originalname);
      }

      const fbResponse = await fetch(FORMBOLD_URL, {
        method: 'POST',
        body: fbFormData,
        headers: {
          'Accept': 'application/json'
        }
      });

      // Single-pass response body reading to prevent stream double-read crash
      const fbRawText = await fbResponse.text();
      let fbParsed = null;
      try {
        fbParsed = JSON.parse(fbRawText);
      } catch (pErr) {
        fbParsed = null;
      }

      if (!fbResponse.ok) {
        const errText = (fbParsed && (fbParsed.message || fbParsed.error)) || fbRawText || "FormBold submission failed.";
        console.error(`FormBold returned status ${fbResponse.status}:`, errText);
        return Response.json({
          success: false,
          message: `FormBold submission error (${fbResponse.status}): ${errText}`
        }, { status: fbResponse.status || 500 });
      }

      console.log(`[FormBold Success] Application ${submissionId} submitted successfully to FormBold (${FORMBOLD_URL}) with attachment.`);
    } catch (fbErr) {
      console.error("FormBold fetch exception:", fbErr);
      return Response.json({
        success: false,
        message: "FormBold submission connection error. Please check network and retry."
      }, { status: 502 });
    }

    return Response.json({
      success: true,
      message: "Your application has been submitted successfully.",
      submission_id: submissionId,
      application_id: submissionId
    });

  } catch (err) {
    console.error("Error in /api/careers/apply route handler:", err);
    return Response.json({ success: false, message: `Internal server error: ${err.message}` }, { status: 500 });
  }
}
