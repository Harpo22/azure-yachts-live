/* =============================================
   AZURE YACHTS — Enquiry Page Scripts
   ============================================= */

(function () {
  'use strict';

  /* ------------------------------------------
     Pre-fill from URL query params
     e.g. enquiry.html?vessel=Elara&destination=maldives
  ------------------------------------------ */
  const params = new URLSearchParams(window.location.search);

  const vesselParam = params.get('vessel');
  if (vesselParam) {
    const sel = document.getElementById('eq-vessel');
    if (sel) {
      Array.from(sel.options).forEach(o => {
        if (o.value.toLowerCase().includes(vesselParam.toLowerCase()) ||
            o.text.toLowerCase().includes(vesselParam.toLowerCase())) {
          o.selected = true;
        }
      });
    }
  }

  const destMap = {
    'french-riviera' : 'French Riviera',
    'greek-islands'  : 'Greek Islands',
    'amalfi-coast'   : 'Amalfi Coast',
    'maldives'       : 'Maldives',
    'caribbean'      : 'Caribbean — BVI'
  };
  const destParam = params.get('destination');
  if (destParam) {
    const sel = document.getElementById('eq-dest');
    const label = destMap[destParam] || destParam;
    if (sel) {
      Array.from(sel.options).forEach(o => {
        if (o.text.toLowerCase().includes(label.toLowerCase())) o.selected = true;
      });
    }
  }

  /* ------------------------------------------
     Vessel thumbnail click → pre-fill select
  ------------------------------------------ */
  window.selectVessel = function (name) {
    const sel = document.getElementById('eq-vessel');
    if (!sel) return;
    const decoded = decodeURIComponent(name);
    Array.from(sel.options).forEach(o => {
      if (o.value === decoded || o.text.startsWith(decoded)) o.selected = true;
    });
    sel.closest('.form-group') && sel.dispatchEvent(new Event('change'));
    sel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  /* ------------------------------------------
     Date validation — end must be after start
  ------------------------------------------ */
  const fromDate = document.getElementById('eq-from');
  const toDate   = document.getElementById('eq-to');
  if (fromDate && toDate) {
    const today = new Date().toISOString().split('T')[0];
    fromDate.min = today;
    fromDate.addEventListener('change', () => { toDate.min = fromDate.value; });
  }

  /* ------------------------------------------
     Form submission with FormSubmit
  ------------------------------------------ */
  const form = document.getElementById('enquiryForm');
  const btn  = document.getElementById('enquirySubmitBtn');

  if (form && btn) {
    /* Live validation on blur */
    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('blur', () => {
        const group = field.closest('.form-group');
        const empty  = field.type === 'checkbox' ? !field.checked : !field.value.trim();
        const badEmail = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        if (empty || badEmail) {
          group && group.classList.add('invalid');
        } else {
          group && group.classList.remove('invalid');
        }
      });
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      /* Validate */
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        const group = field.closest('.form-group');
        const empty  = field.type === 'checkbox' ? !field.checked : !field.value.trim();
        const badEmail = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        if (empty || badEmail) {
          group && group.classList.add('invalid');
          valid = false;
        } else {
          group && group.classList.remove('invalid');
        }
      });

      if (!valid) {
        const firstInvalid = form.querySelector('.invalid input, .invalid select, .invalid textarea');
        firstInvalid && firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      /* Submit via fetch (AJAX) */
      window.AzureForm.setLoading(btn, true);

      try {
        const fd  = new FormData(form);
        const res = await fetch(form.action, {
          method : 'POST',
          body   : fd,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          /* Redirect to thank-you page */
          window.location.href = '../pages/thank-you.html';
        } else {
          window.AzureForm.setError(btn, 'Could not send — please email us directly');
        }
      } catch (_) {
        /* Network issue or CORS — fall back to native form submission */
        form.submit();
      }
    });
  }

})();
