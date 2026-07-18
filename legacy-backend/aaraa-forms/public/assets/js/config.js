/* Per-environment config. Change `endpoint` to your deployed backend URL. */
window.AARAA_CONFIG = {
  // Firebase Cloud Function (2nd gen) example:
  //   https://us-central1-<your-project>.cloudfunctions.net/submitForm
  // Cloudflare Worker example:
  //   https://aaraa-forms.<your-subdomain>.workers.dev/submit
  // Local dev (Firebase emulator):
  //   http://127.0.0.1:5001/<your-project>/us-central1/submitForm
  endpoint: '/api/submit',
  turnstileSiteKey: '0x4AAAAAADpJH2i4q1Ziqo1i',
  successMessage: 'Thank you! Your submission has been received. Our team will contact you shortly.',
  privacyUrl: '/privacy-policy'
};

