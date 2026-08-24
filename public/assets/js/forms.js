/* AARAA shared form engine: validation, file UX, anti-spam, submission */
(function () {
  // Endpoint is configured per-environment in /assets/js/config.js
  var CFG = window.AARAA_CONFIG || {};
  var ENDPOINT = CFG.endpoint || '/api/submit';

  var PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    tel: /^(\+91[\-\s]?)?[6-9]\d{9}$/,
    gst: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    pan: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
    ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    aadhaar4: /^\d{4}$/,
    pincode: /^\d{6}$/
  };
  var MSG = {
    required: 'This field is required.',
    email: 'Enter a valid email address.',
    tel: 'Enter a valid 10-digit Indian mobile number.',
    gst: 'Enter a valid 15-character GSTIN (e.g. 22AAAAA0000A1Z5).',
    pan: 'Enter a valid PAN (e.g. ABCDE1234F).',
    ifsc: 'Enter a valid IFSC code (e.g. HDFC0001234).',
    aadhaar4: 'Enter the last 4 digits of Aadhaar only.',
    file: 'Please choose a file.',
    filesize: 'File exceeds the maximum allowed size.',
    consent: 'Please accept the privacy terms to continue.'
  };

  function setError(field, msg) {
    field.classList.add('invalid');
    var e = field.querySelector('.error');
    if (e) e.textContent = msg;
  }
  function clearError(field) {
    field.classList.remove('invalid');
  }

  function validateInput(input) {
    var field = input.closest('.field');
    if (!field) return true;
    var rule = input.getAttribute('data-rule');
    var required = input.hasAttribute('required');
    var val = (input.value || '').trim();

    if (input.type === 'file') {
      if (required && input.files.length === 0) { setError(field, MSG.file); return false; }
      var maxMB = parseFloat(input.getAttribute('data-maxsize') || '0');
      if (input.files.length && maxMB) {
        if (input.files[0].size > maxMB * 1024 * 1024) { setError(field, MSG.filesize + ' (max ' + maxMB + 'MB)'); return false; }
      }
      clearError(field); return true;
    }
    if (required && !val) { setError(field, MSG.required); return false; }
    if (val && rule && PATTERNS[rule] && !PATTERNS[rule].test(rule === 'gst' || rule === 'pan' || rule === 'ifsc' ? val.toUpperCase() : val)) {
      setError(field, MSG[rule] || 'Invalid value.'); return false;
    }
    clearError(field); return true;
  }

  function wireFileInputs(form) {
    form.querySelectorAll('.dropzone').forEach(function (dz) {
      var input = dz.querySelector('input[type=file]');
      var label = dz.querySelector('.dz-file');
      dz.addEventListener('click', function () { input.click(); });
      dz.addEventListener('dragover', function (e) { e.preventDefault(); dz.classList.add('drag'); });
      dz.addEventListener('dragleave', function () { dz.classList.remove('drag'); });
      dz.addEventListener('drop', function (e) {
        e.preventDefault(); dz.classList.remove('drag');
        if (e.dataTransfer.files.length) { input.files = e.dataTransfer.files; }
        update();
      });
      input.addEventListener('change', update);
      function update() {
        label.textContent = input.files.length ? input.files[0].name : '';
        validateInput(input);
      }
    });
  }

  function initTurnstile() {
    var container = document.querySelector('.cf-turnstile-container');
    if (container && window.turnstile && CFG.turnstileSiteKey) {
      if (container.children.length === 0) {
        window.turnstile.render(container, {
          sitekey: CFG.turnstileSiteKey
        });
      }
    }
  }
  window.onloadTurnstileCallback = initTurnstile;

  function init() {
    var form = document.querySelector('form[data-aaraa-form]');
    if (!form) return;
    wireFileInputs(form);
    initTurnstile();

    form.querySelectorAll('input,select,textarea').forEach(function (el) {
      el.addEventListener('blur', function () { if (el.type !== 'file') validateInput(el); });
    });

    var status = form.querySelector('.form-status');
    var submitBtn = form.querySelector('button[type=submit]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status';

      // Honeypot: if filled, silently drop (bot)
      var hp = form.querySelector('input[name="company_website_hp"]');
      if (hp && hp.value) { return; }

      var ok = true;
      form.querySelectorAll('input,select,textarea').forEach(function (el) {
        if (el.classList.contains('hp-input')) return;
        if (!validateInput(el)) ok = false;
      });
      var consent = form.querySelector('input[name="consent"]');
      if (consent && !consent.checked) {
        ok = false;
        status.className = 'form-status err';
        status.textContent = MSG.consent;
      }
      if (!ok) {
        if (!status.textContent) { status.className = 'form-status err'; status.textContent = 'Please correct the highlighted fields.'; }
        var firstErr = form.querySelector('.field.invalid');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      var data = new FormData(form);
      var formName = form.getAttribute('data-aaraa-form') || 'Vendor Registration';
      var companyVal = data.get('company') || data.get('company_name') || '';
      var categoryVal = data.get('vendor_category') || data.get('vendorCategory') || '';
      data.append('subject', 'AARAA ' + formName + ' — ' + (companyVal || 'Submission') + (categoryVal ? ' (' + categoryVal + ')' : ''));
      data.append('_formType', formName);
      data.append('_submittedAt', new Date().toISOString());
      data.append('_pageUrl', window.location.href);

      submitBtn.disabled = true;
      var original = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';

      fetch(ENDPOINT, { method: 'POST', body: data })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, body: j }; }); })
        .then(function (res) {
          if (res.ok) {
            status.className = 'form-status ok';
            status.textContent = CFG.successMessage || 'Thank you! Your submission has been received. Our team will get back to you shortly.';
            form.reset();
            form.querySelectorAll('.dz-file').forEach(function (n) { n.textContent = ''; });
            if (window.turnstile) window.turnstile.reset();
          } else {
            status.className = 'form-status err';
            status.textContent = (res.body && res.body.message) || 'Something went wrong. Please try again or email info@aaraainfrastructure.com.';
            if (window.turnstile) window.turnstile.reset();
          }
        })
        .catch(function () {
          status.className = 'form-status err';
          status.textContent = 'Network error. Please try again or email info@aaraainfrastructure.com.';
          if (window.turnstile) window.turnstile.reset();
        })
        .finally(function () { submitBtn.disabled = false; submitBtn.textContent = original; });
    });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();

