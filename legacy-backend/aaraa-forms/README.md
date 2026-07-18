# AARAA Infrastructure - Unified Website Forms

A clean, consistent rebuild of all AARAA website forms with every audit fix applied,
plus a backend that emails each submission (with file attachments) to your inbox.

## What's included

```
aaraa-forms/
  public/                       <- static site (host on Cloudflare Pages OR Firebase Hosting)
    index.html                  <- Contact Us hub
    forms/                      <- generated forms (run the build step below)
      quick-enquiry.html
      subcontractor.html
      vendor.html
      partnership.html
      careers.html
      joint-venture.html
    assets/css/styles.css       <- shared brand design system
    assets/js/forms.js          <- validation, file UX, anti-spam, submit
    assets/js/config.js         <- set your backend endpoint here
  build/generate.js             <- regenerates all forms from one schema
  functions/                    <- Firebase Cloud Function (Nodemailer + SMTP)
  cloudflare-worker/            <- Cloudflare Worker alternative (Resend API)
  firebase.json / .firebaserc.example / .env.example
```

## Fixes applied (from the audit)
- Single shared, branded design system across all forms (no more unstyled / dark-header forms).
- One canonical Quick Enquiry (legacy duplicate removed).
- Consent checkbox + privacy link on every form (DPDP Act, 2023).
- Persistent labels + consistent trailing-asterisk required convention.
- Client + server validation: email, phone, GSTIN, PAN, IFSC, Aadhaar (last 4 only).
- Honeypot + optional reCAPTCHA anti-spam.
- Standardized file-type / size handling; Aadhaar reduced to last 4 digits.
- Accessible markup (labels, aria-live status, focus states).

## 1. Build the forms locally
```bash
cd aaraa-forms
node build/generate.js        # writes the 6 HTML files into public/forms/
```
Then open `public/index.html` in a browser to preview. To test locally with live
reload you can run any static server, e.g. `npx serve public`.

## 2. Point the forms at your backend
Edit `public/assets/js/config.js` and set `endpoint` to your deployed function URL.
With Firebase Hosting + the included rewrite, you can leave it as `/api/submit`.

## 3a. Deploy on Firebase (recommended for Gmail + attachments)
```bash
cp .firebaserc.example .firebaserc      # add your project id
cd functions && npm install && cd ..
# set secrets (see credentials section):
firebase functions:secrets:set SMTP_PASS
# OR use environment config via .env in functions/ for local emulation
firebase deploy --only functions,hosting
```
The rewrite in `firebase.json` maps `POST /api/submit` -> the `submitForm` function,
so the static site and API share one domain (no CORS headaches).

## 3b. Deploy on Cloudflare instead
- Host `public/` on **Cloudflare Pages**.
- Deploy `cloudflare-worker/` with `wrangler deploy`.
- Set `endpoint` in `config.js` to the Worker URL.
- Cloudflare Workers can't use SMTP, so the Worker sends via the **Resend** API
  (a verified sending domain is required - you cannot send "from" a gmail.com address).

---

# Credentials you need to email submissions to aaraainfrastructure@gmail.com

## Option A - Firebase + Gmail SMTP (simplest, free)
Delivers straight to the Gmail inbox with attachments. You need:

| Credential | What it is / how to get it |
|---|---|
| **Sender Gmail address** | A Gmail account that sends the mail (can be aaraainfrastructure@gmail.com itself, or a dedicated one). |
| **Gmail App Password** (16 chars) | Enable 2-Step Verification on that Google account -> Google Account -> Security -> App passwords -> generate one for "Mail". This is NOT the normal login password. |
| **Destination email** | aaraainfrastructure@gmail.com (already known). |
| **Firebase project ID** | From the Firebase console. Put it in `.firebaserc`. |
| **Firebase CLI auth** | `firebase login` on your machine (or a service-account key + `GOOGLE_APPLICATION_CREDENTIALS` for CI). |
| **Blaze plan** | Cloud Functions require the pay-as-you-go Blaze plan (free tier covers low volume). |

Set them as: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER`, `SMTP_PASS`,
`MAIL_FROM`, `MAIL_TO=aaraainfrastructure@gmail.com` (see `.env.example`).

## Option B - Cloudflare Worker + Resend (better deliverability)
| Credential | What it is / how to get it |
|---|---|
| **Resend API key** | Sign up at resend.com -> API Keys. (SendGrid/Mailgun work similarly.) |
| **Verified sending domain** | Add + verify a domain (e.g. aaraainfrastructure.com) in Resend via DNS records. Send `from: forms@aaraainfrastructure.com`. |
| **MAIL_TO** | aaraainfrastructure@gmail.com. |
| **Cloudflare account + API token** | For `wrangler deploy` (Workers + Pages). |

## Optional (recommended) - anti-spam
| Credential | Purpose |
|---|---|
| **reCAPTCHA v3 site key + secret** | Google reCAPTCHA admin console. Add the site key to the form pages and the secret to the backend to verify submissions. |

> Security note: bank details + Aadhaar are sensitive personal data. Always serve
> the site over HTTPS, keep all secrets in the platform's secret store (never in
> client JS), and restrict who can read the destination inbox.
