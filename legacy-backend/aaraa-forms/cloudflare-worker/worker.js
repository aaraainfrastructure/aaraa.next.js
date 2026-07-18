/**
 * AARAA Infrastructure - Form handler for Cloudflare Workers (alternative to Firebase).
 * Cloudflare Workers cannot open SMTP sockets, so this uses the Resend HTTP API
 * to send the email WITH attachments. Set RESEND_API_KEY, MAIL_FROM, MAIL_TO as
 * Worker secrets (wrangler secret put RESEND_API_KEY).
 *
 * NOTE: MAIL_FROM must be a verified domain in Resend. You cannot send "from" a
 * gmail.com address; instead send from e.g. forms@aaraainfrastructure.com and set
 * MAIL_TO=aaraainfrastructure@gmail.com.
 */
export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    if (request.method === 'OPTIONS') return new Response('', { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ ok: false, message: 'Method not allowed' }, 405, cors);

    try {
      const form = await request.formData();
      if (form.get('company_website_hp')) return json({ ok: true }, 200, cors); // honeypot
      if (!form.get('consent')) return json({ ok: false, message: 'Consent is required.' }, 400, cors);

      const fields = {};
      const attachments = [];
      for (const [key, value] of form.entries()) {
        if (value instanceof File) {
          const buf = await value.arrayBuffer();
          attachments.push({ filename: value.name, content: arrayBufferToBase64(buf) });
        } else {
          fields[key] = value;
        }
      }

      const formType = fields._formType || 'Website Form';
      const skip = { _formType: 1, _submittedAt: 1, _pageUrl: 1, company_website_hp: 1, consent: 1 };
      const rows = Object.keys(fields).filter((k) => !skip[k] && fields[k] !== '')
        .map((k) => `<tr><td style=\"padding:6px 12px;border:1px solid #eee;font-weight:600;background:#fafafa\">${k}</td><td style=\"padding:6px 12px;border:1px solid #eee\">${esc(fields[k])}</td></tr>`).join('');
      const html = `<h2 style=\"color:#e11d2a\">New ${formType} submission</h2><table style=\"border-collapse:collapse;font-size:14px\">${rows}</table><p>Attachments: ${attachments.length}</p>`;

      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.MAIL_FROM,
          to: [env.MAIL_TO || 'aaraainfrastructure@gmail.com'],
          reply_to: fields.email || undefined,
          subject: `[Website] ${formType} - ${fields.company || fields.full_name || fields.organization || 'New submission'}`,
          html,
          attachments
        })
      });
      if (!r.ok) return json({ ok: false, message: 'Email provider error.' }, 502, cors);
      return json({ ok: true }, 200, cors);
    } catch (e) {
      return json({ ok: false, message: 'Server error.' }, 500, cors);
    }
  }
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', ...cors } });
}
function esc(s) { return String(s).replace(/</g, '&lt;'); }
function arrayBufferToBase64(buf) {
  let binary = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}
