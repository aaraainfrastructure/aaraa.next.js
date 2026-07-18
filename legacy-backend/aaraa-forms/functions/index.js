/**
 * AARAA Infrastructure - Form submission handler (Firebase Cloud Functions, 2nd gen)
 * Receives multipart/form-data (fields + file uploads), emails everything to the
 * destination inbox WITH attachments via Nodemailer, stores data to Firestore and
 * Storage, and verifies Turnstile token.
 */
const { onRequest } = require('firebase-functions/v2/https');
const Busboy = require('busboy');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// Specific file limits (Priority 3)
const FILE_LIMITS = {
  resume: 5 * 1024 * 1024,      // 5MB
  portfolio: 10 * 1024 * 1024    // 10MB
};
const DEFAULT_LIMIT = 10 * 1024 * 1024; // 10MB default for other documents

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '*')
  .split(',')
  .map((s) => s.trim());

function cors(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes('*')) res.set('Access-Control-Allow-Origin', '*');
  else if (origin && ALLOWED_ORIGINS.includes(origin)) res.set('Access-Control-Allow-Origin', origin);
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
}

function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const fields = {};
    const files = [];
    const bb = Busboy({ headers: req.headers, limits: { files: 10 } });
    let sizeError = false;

    bb.on('field', (name, val) => { fields[name] = val; });
    bb.on('file', (name, stream, info) => {
      const chunks = [];
      let currentSize = 0;
      const limit = FILE_LIMITS[name] || DEFAULT_LIMIT;

      stream.on('data', (c) => {
        currentSize += c.length;
        if (currentSize > limit) {
          sizeError = true;
          stream.resume(); // Drop remaining chunks
        } else {
          chunks.push(c);
        }
      });

      stream.on('end', () => {
        if (!sizeError && chunks.length) {
          files.push({ field: name, filename: info.filename, contentType: info.mimeType, content: Buffer.concat(chunks) });
        }
      });
    });
    bb.on('error', reject);
    bb.on('finish', () => {
      if (sizeError) return reject(new Error('FILE_TOO_LARGE'));
      resolve({ fields, files });
    });
    bb.end(req.rawBody);
  });
}

// Turnstile verification handler (Priority 1)
async function verifyTurnstile(token, ipAddress) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";
  if (!token) return false;

  try {
    const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}&remoteip=${encodeURIComponent(ipAddress)}`
    });
    const data = await response.json();
    return !!data.success;
  } catch (err) {
    console.error("Turnstile verification check failed:", err);
    return false;
  }
}

function buildEmail(fields, files, fileUrls = {}) {
  const formType = fields._formType || 'Website Form';
  const skip = { _formType: 1, _submittedAt: 1, _pageUrl: 1, company_website_hp: 1, consent: 1, 'cf-turnstile-response': 1 };
  
  // Format details as HTML table
  const rows = Object.keys(fields)
    .filter((k) => !skip[k] && fields[k] !== '')
    .map((k) => `<tr><td style="padding:6px 12px;border:1px solid #eee;font-weight:600;background:#fafafa">${k}</td><td style="padding:6px 12px;border:1px solid #eee">${String(fields[k]).replace(/</g,'&lt;')}</td></tr>`)
    .join('');

  // Add attachment links to the email HTML
  let fileRows = '';
  for (const [key, url] of Object.entries(fileUrls)) {
    if (key.endsWith('Name')) continue;
    const originalName = fileUrls[`${key}Name`] || 'Download File';
    fileRows += `<tr><td style="padding:6px 12px;border:1px solid #eee;font-weight:600;background:#fafafa">${key} Link</td><td style="padding:6px 12px;border:1px solid #eee"><a href="${url}" target="_blank">Download ${originalName}</a></td></tr>`;
  }

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1a1a1a">
      <h2 style="color:#e11d2a;margin:0 0 4px">New ${formType} submission</h2>
      <p style="color:#666;margin:0 0 16px">Submitted ${fields._submittedAt || ''} &middot; ${fields._pageUrl || ''}</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">${rows}${fileRows}</table>
      <p style="color:#666;font-size:12px;margin-top:14px">Consent given: ${fields.consent ? 'Yes' : 'No'} &middot; ${files.length} attachment(s).</p>
    </div>`;
  return { formType, html };
}

const handler = async (req, res) => {
  cors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).send('');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' });

  try {
    const { fields, files } = await parseMultipart(req);

    // Honeypot: pretend success, send nothing.
    if (fields.company_website_hp) return res.status(200).json({ ok: true });
    if (!fields.consent) return res.status(400).json({ ok: false, message: 'Consent is required.' });

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';

    // 1. Validate Turnstile token (Priority 1)
    const turnstileToken = fields['cf-turnstile-response'];
    const isVerified = await verifyTurnstile(turnstileToken, ipAddress);
    if (!isVerified) {
      return res.status(400).json({ ok: false, message: 'Security verification failed.' });
    }

    const formType = fields._formType || 'contact';
    const timestamp = new Date().toISOString();
    const submissionId = `AAR-${formType.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 2. Upload attachments to Storage (Part of Priority 2)
    const fileUrls = {};
    const emailAttachments = [];
    const bucket = admin.storage().bucket();

    for (const f of files) {
      const sanitizedFilename = f.filename.replace(/\s+/g, '_');
      const storagePath = `submissions/${formType}/${submissionId}_${sanitizedFilename}`;
      const storageFile = bucket.file(storagePath);

      await storageFile.save(f.content, {
        metadata: { contentType: f.contentType }
      });

      // Generate download token to form the public URL
      const token = db.collection("temp").doc().id;
      await storageFile.setMetadata({
        metadata: { firebaseStorageDownloadTokens: token }
      });

      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(storagePath)}?alt=media&token=${token}`;
      
      fileUrls[f.field] = publicUrl;
      fileUrls[`${f.field}Name`] = f.filename;
      emailAttachments.push({ filename: f.filename, content: f.content, contentType: f.contentType });
    }

    // Build Firestore Submission Record
    const record = {
      submission_id: submissionId,
      form_type: formType,
      timestamp,
      createdAt: timestamp,
      ipAddress,
      fileUrls,
      lead_status: "new"
    };

    // Add normal field inputs
    const skip = { company_website_hp: 1, consent: 1, 'cf-turnstile-response': 1 };
    for (const [k, v] of Object.entries(fields)) {
      if (!skip[k]) record[k] = v;
    }

    // 3. Save Submission in Firestore (Priority 2)
    try {
      await db.collection("submissions").doc(formType.toLowerCase()).collection("entries").doc(submissionId).set(record);
    } catch (dbErr) {
      console.error("Firestore persistence failed:", dbErr);
      return res.status(500).json({ ok: false, message: "Could not save submission to database." });
    }

    // 4. Send Notification Email to Admin
    try {
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      if (!smtpUser || !smtpPass) {
        throw new Error("SMTP credentials are not configured in environment variables.");
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT || 465),
        secure: Number(process.env.SMTP_PORT || 465) === 465,
        auth: { user: smtpUser, pass: smtpPass }
      });

      const { html } = buildEmail(fields, files, fileUrls);

      await transporter.sendMail({
        from: process.env.MAIL_FROM || `AARAA Website <${smtpUser}>`,
        to: process.env.MAIL_TO || 'aaraainfrastructure@gmail.com',
        replyTo: fields.email || undefined,
        subject: `[Website] ${formType} - ${fields.company || fields.full_name || fields.organization || 'New submission'}`,
        html,
        attachments: emailAttachments
      });

      // 5. Send Autoresponder Email to user (Priority 4)
      if (fields.email && isValidEmail(fields.email)) {
        await sendAutoresponder(transporter, fields.email);
      }
    } catch (mailErr) {
      console.error("Admin notification email failed:", mailErr);
      
      // Update database status but prevent frontend submission failure
      await db.collection("submissions").doc(formType.toLowerCase()).collection("entries").doc(submissionId).update({
        lead_status: "email_failed",
        email_error: mailErr.message
      });

      return res.status(200).json({
        ok: true,
        partial: true,
        message: 'Thank you! Your submission has been received. Our team will contact you shortly.'
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    if (err.message === 'FILE_TOO_LARGE') {
      return res.status(413).json({ ok: false, message: 'A file exceeds the allowed size limit (Resume: 5MB, Portfolio: 10MB).' });
    }
    console.error(err);
    return res.status(500).json({ ok: false, message: 'Could not process your submission. Please try again.' });
  }
};

async function sendAutoresponder(transporter, emailAddress) {
  try {
    const autoresponderHtml = `
      <div style="font-family: Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <h2 style="color: #e11d2a; margin-top: 0; font-size: 20px;">Thank you for contacting AARAA Infrastructure</h2>
        <p style="font-size: 15px; line-height: 1.6;">We have received your submission and our team will review it shortly.</p>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="margin-bottom: 0; font-size: 14px; color: #6b7280;">Regards,</p>
        <p style="font-weight: bold; margin-top: 4px; color: #e11d2a; font-size: 16px;">Team AARAA</p>
      </div>`;

    await transporter.sendMail({
      from: process.env.MAIL_FROM || `AARAA Website <no-reply@aaraainfrastructure.com>`,
      to: emailAddress,
      subject: `Thank you for contacting AARAA Infrastructure`,
      html: autoresponderHtml
    });
    console.log(`[Autoresponder] Sent response successfully to ${emailAddress}`);
  } catch (err) {
    console.error("[Autoresponder Error] Failed to send email:", err);
  }
}

exports.submitForm = onRequest({ cors: false, memory: '512MiB', timeoutSeconds: 60 }, handler);
