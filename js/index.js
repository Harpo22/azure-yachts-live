/* =============================================
   AZURE YACHTS — Index Page Scripts
   ============================================= */

(function () {
  'use strict';

  /* ------------------------------------------
     Pre-fill destination from URL param
  ------------------------------------------ */
  const params = new URLSearchParams(window.location.search);
  const dest   = params.get('destination');
  if (dest) {
    const sel = document.getElementById('hc-dest');
    if (sel) {
      const map = {
        'french-riviera': 'French Riviera',
        'greek-islands'  : 'Greek Islands',
        'amalfi-coast'   : 'Amalfi Coast',
        'maldives'       : 'Maldives',
        'caribbean'      : 'Caribbean'
      };
      const label = map[dest];
      if (label) {
        Array.from(sel.options).forEach(o => { if (o.value === label || o.text === label) o.selected = true; });
      }
    }
  }

  /* ------------------------------------------
     Home contact form — FormSubmit
  ------------------------------------------ */
  const form = document.getElementById('homeContactForm');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!window.AzureForm.validate(form)) return;

      const btn = form.querySelector('button[type="submit"]');
      window.AzureForm.setLoading(btn, true);

      try {
        const fd = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: fd,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          window.AzureForm.setSuccess(btn, 'Enquiry Received — We\'ll be in touch shortly');
          form.reset();
        } else {
          window.AzureForm.setError(btn, 'Could not send — please email us directly');
        }
      } catch (_) {
        /* FormSubmit doesn't support AJAX with redirect; fall back to native submit */
        form.submit();
      }
    });

    /* Live validation feedback */
    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('blur', () => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          group && group.classList.add('invalid');
        } else {
          group && group.classList.remove('invalid');
        }
      });
    });
  }

})();
