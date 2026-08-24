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
  const allowedExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(filename).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return { valid: false, message: `Extension ${ext} is not allowed. Only PDF, DOC, DOCX, JPG, PNG are permitted.` };
  }

  const maxSizeBytes = 10 * 1024 * 1024; // 10MB limit
  if (bufferSize > maxSizeBytes) {
    return { valid: false, message: `File size exceeds the 10MB limit.` };
  }

  return { valid: true };
}

/* ---------- Helper: Generate Sequential Vendor ID (AAVN-YYYYMMDD-SERIALNO) ---------- */
async function generateVendorSubmissionId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  const prefix = `AAVN${dateStr}-`;

  const localDir = path.join(process.cwd(), 'public', 'local_submissions');
  await fs.mkdir(localDir, { recursive: true });

  let maxSeq = 0;
  try {
    const files = await fs.readdir(localDir);
    for (const f of files) {
      if (f.startsWith(`vendor_${prefix}`)) {
        const match = f.match(/vendor_AAVN\d{8}-(\d{3})\.json/);
        if (match) {
          const seq = parseInt(match[1], 10);
          if (seq > maxSeq) maxSeq = seq;
        }
      }
    }
  } catch (err) {
    console.error("Error reading local_submissions directory:", err);
  }

  const nextSeq = String(maxSeq + 1).padStart(3, '0');
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
    if ((fields._honeypot && fields._honeypot.trim() !== "") || (fields.company_website_hp && fields.company_website_hp.trim() !== "")) {
      return Response.json({ success: false, message: "Spam detected." }, { status: 400 });
    }

    const company = sanitizeString(fields.company || fields.company_name || "");
    const contactPerson = sanitizeString(fields.contact_person || fields.name || fields.signatory_name || "");
    const email = sanitizeString(fields.email || "");
    const phone = sanitizeString(fields.phone || fields.mobile || fields.signatory_contact || "");
    const category = sanitizeString(fields.vendor_category || fields.vendorCategory || "General Vendor");
    const cityState = sanitizeString(fields.city_state || fields.location || "");
    const gst = sanitizeString(fields.gst || fields.gst_number || "");
    const pan = sanitizeString(fields.pan || fields.pan_number || "");
    const services = sanitizeString(fields.services || fields.message || "");

    if (!company || !contactPerson || !phone || !email) {
      return Response.json({ success: false, message: "Company Name, Contact Person, Phone, and Email are required." }, { status: 400 });
    }
    if (!isValidPhone(phone)) {
      return Response.json({ success: false, message: "Please enter a valid 10-digit mobile number." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return Response.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
    }

    const submissionId = await generateVendorSubmissionId();
    const timestamp = new Date().toISOString();

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
      form_type: "vendor",
      timestamp,
      company_name: company,
      contact_person: contactPerson,
      email,
      phone,
      vendor_category: category,
      city_state: cityState,
      gst_number: gst,
      pan_number: pan,
      services_provided: services,
      all_fields: fields,
      fileUrls,
      page_url: sanitizeString(fields.sourceUrl || fields._pageUrl || "Unknown"),
      ipAddress
    };

    // Save submission locally
    const localDir = path.join(process.cwd(), 'public', 'local_submissions');
    await fs.mkdir(localDir, { recursive: true });
    const submissionPath = path.join(localDir, `vendor_${submissionId}.json`);
    await fs.writeFile(submissionPath, JSON.stringify(record, null, 2), 'utf8');

    // 1. Direct SMTP Email Dispatch to aaraainfrastructure@gmail.com
    try {
      const smtpUser = process.env.SMTP_USER || "aaraainfrastructure@gmail.com";
      const smtpPass = process.env.SMTP_PASS || "aumcvlriokritkwt";
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
      const smtpSecure = process.env.SMTP_SECURE !== "false";
      const smtpTo = process.env.SMTP_TO || "aaraainfrastructure@gmail.com";

      if (smtpUser && smtpPass) {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: { user: smtpUser, pass: smtpPass }
        });

        const subject = `AARAA Vendor Registration — ${company} (${category}) — [${submissionId}]`;
        let htmlBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; color: #333;">
            <h2 style="color: #1a365d; border-bottom: 2px solid #3182ce; padding-bottom: 10px; margin-top: 0;">New Vendor Registration Received</h2>
            <p><strong>Submission ID:</strong> ${submissionId}</p>
            <p><strong>Date & Time:</strong> ${timestamp}</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr style="background-color: #f7fafc;"><td style="padding: 8px; border: 1px solid #cbd5e0; font-weight: bold; width: 40%;">Company Name</td><td style="padding: 8px; border: 1px solid #cbd5e0;">${company}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #cbd5e0; font-weight: bold;">Contact Person</td><td style="padding: 8px; border: 1px solid #cbd5e0;">${contactPerson}</td></tr>
              <tr style="background-color: #f7fafc;"><td style="padding: 8px; border: 1px solid #cbd5e0; font-weight: bold;">Email Address</td><td style="padding: 8px; border: 1px solid #cbd5e0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px; border: 1px solid #cbd5e0; font-weight: bold;">Phone Number</td><td style="padding: 8px; border: 1px solid #cbd5e0;"><a href="tel:${phone}">${phone}</a></td></tr>
              <tr style="background-color: #f7fafc;"><td style="padding: 8px; border: 1px solid #cbd5e0; font-weight: bold;">Vendor Category</td><td style="padding: 8px; border: 1px solid #cbd5e0;">${category}</td></tr>
              ${cityState ? `<tr><td style="padding: 8px; border: 1px solid #cbd5e0; font-weight: bold;">City / State</td><td style="padding: 8px; border: 1px solid #cbd5e0;">${cityState}</td></tr>` : ''}
              ${gst ? `<tr style="background-color: #f7fafc;"><td style="padding: 8px; border: 1px solid #cbd5e0; font-weight: bold;">GST Number</td><td style="padding: 8px; border: 1px solid #cbd5e0;">${gst}</td></tr>` : ''}
              ${pan ? `<tr><td style="padding: 8px; border: 1px solid #cbd5e0; font-weight: bold;">PAN Number</td><td style="padding: 8px; border: 1px solid #cbd5e0;">${pan}</td></tr>` : ''}
              ${services ? `<tr style="background-color: #f7fafc;"><td style="padding: 8px; border: 1px solid #cbd5e0; font-weight: bold;">Services / Products</td><td style="padding: 8px; border: 1px solid #cbd5e0;">${services}</td></tr>` : ''}
            </table>
            <br/>
            <p style="font-size: 12px; color: #718096; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 10px;">Sent via AARAA Infrastructure Vendor Portal</p>
          </div>
        `;

        const mailAttachments = uploads.map(up => ({
          filename: up.originalname,
          content: up.buffer
        }));

        await transporter.sendMail({
          from: `"AARAA Infrastructure" <${smtpUser}>`,
          replyTo: email,
          to: smtpTo,
          subject,
          html: htmlBody,
          attachments: mailAttachments
        });

        console.log(`[Direct Email Success] Vendor submission ${submissionId} emailed directly to ${smtpTo}`);
      }
    } catch (smtpErr) {
      console.error("[Direct Email Error] Failed to send email directly:", smtpErr);
    }

    // 2. Dual Dispatch to FormBold
    try {
      const fbFormData = new FormData();
      fbFormData.append('subject', `AARAA Vendor Registration — ${company} (${category}) — [${submissionId}]`);
      fbFormData.append('_subject', `AARAA Vendor Registration — ${company} (${category}) — [${submissionId}]`);
      fbFormData.append('submission_id', submissionId);
      fbFormData.append('form_type', 'Vendor Registration');
      fbFormData.append('company_name', company);
      fbFormData.append('contact_person', contactPerson);
      fbFormData.append('name', contactPerson);
      fbFormData.append('_name', contactPerson);
      fbFormData.append('email', email);
      fbFormData.append('_replyto', email);
      fbFormData.append('phone', phone);
      fbFormData.append('vendor_category', category);
      if (cityState) fbFormData.append('city_state', cityState);
      if (gst) fbFormData.append('gst_number', gst);
      if (pan) fbFormData.append('pan_number', pan);
      if (services) {
        fbFormData.append('services_provided', services);
        fbFormData.append('message', services);
        fbFormData.append('_message', services);
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

      await fetch(FORMBOLD_URL, {
        method: 'POST',
        body: fbFormData,
        headers: { 'Accept': 'application/json' }
      });

      console.log(`[FormBold Success] Vendor Registration ${submissionId} submitted to FormBold.`);
    } catch (fbErr) {
      console.error("FormBold fetch exception:", fbErr);
    }

    return Response.json({
      success: true,
      message: "Your vendor registration has been submitted successfully.",
      submission_id: submissionId
    });

  } catch (err) {
    console.error("Error in /api/vendor route handler:", err);
    return Response.json({ success: false, message: "Internal server error occurred." }, { status: 500 });
  }
}
