/* =============================================
   AZURE YACHTS — Global Scripts
   ============================================= */

(function () {
  'use strict';

  /* ------------------------------------------
     Custom Cursor (desktop only)
  ------------------------------------------ */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');

  if (cursor && ring && window.matchMedia('(hover: hover)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    (function animateCursor() {
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateCursor);
    })();

    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
    });
  }

  /* ------------------------------------------
     Navigation — scroll behaviour
  ------------------------------------------ */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------
     Navigation — mobile hamburger
  ------------------------------------------ */
  const hamburger   = document.getElementById('navHamburger');
  const mobileMenu  = document.getElementById('navMobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ------------------------------------------
     Active nav link (same-page anchors)
  ------------------------------------------ */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navAs    = document.querySelectorAll('.nav-links a[href^="#"], .nav-links a[href^="index.html#"]');

  if (sections.length && navAs.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navAs.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href').includes(e.target.id));
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => io.observe(s));
  }

  /* ------------------------------------------
     Reveal on scroll
  ------------------------------------------ */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealIO = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => revealIO.observe(el));
  }

  /* ------------------------------------------
     Form validation helper
  ------------------------------------------ */
  window.AzureForm = {
    validate(form) {
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        const group = field.closest('.form-group');
        const empty = field.value.trim() === '';
        const badEmail = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);

        if (empty || badEmail) {
          group && group.classList.add('invalid');
          valid = false;
        } else {
          group && group.classList.remove('invalid');
        }
      });
      return valid;
    },

    setLoading(btn, loading) {
      if (loading) {
        btn.dataset.originalText = btn.textContent;
        btn.textContent = 'Sending…';
        btn.disabled = true;
      } else {
        btn.textContent = btn.dataset.originalText || 'Submit';
        btn.disabled = false;
      }
    },

    setSuccess(btn, msg) {
      btn.textContent = msg || 'Sent ✓';
      btn.style.background = 'var(--gold-dark)';
      btn.disabled = true;
    },

    setError(btn, msg) {
      btn.textContent = msg || 'Error — please try again';
      btn.style.background = '#8a2020';
      btn.disabled = false;
    }
  };

})();

/* =============================================
   FLEET NAV DROPDOWN
   — appended separately so it runs after DOM inject
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {

  const fleetItem    = document.getElementById('navFleetItem');
  const fleetTrigger = document.getElementById('navFleetTrigger');
  const fleetDrop    = document.getElementById('navFleetDropdown');

  if (!fleetItem || !fleetTrigger || !fleetDrop) return;

  let closeTimer = null;

  /* ---- helpers ---- */
  function openDropdown() {
    clearTimeout(closeTimer);
    fleetItem.classList.add('is-open');
    fleetTrigger.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    fleetItem.classList.remove('is-open');
    fleetTrigger.setAttribute('aria-expanded', 'false');
  }

  function scheduleClose() {
    closeTimer = setTimeout(closeDropdown, 120);
  }

  /* ---- Desktop: hover on <li> (covers both trigger AND panel) ---- */
  fleetItem.addEventListener('mouseenter', openDropdown);
  fleetItem.addEventListener('mouseleave', scheduleClose);

  /* If mouse re-enters the item/panel before timer fires, cancel close */
  fleetItem.addEventListener('mouseenter', () => clearTimeout(closeTimer));

  /* ---- Click/keyboard toggle (for keyboard users & touch) ---- */
  fleetTrigger.addEventListener('click', function (e) {
    e.preventDefault();
    if (fleetItem.classList.contains('is-open')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  fleetTrigger.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fleetItem.classList.contains('is-open') ? closeDropdown() : openDropdown();
    }
    if (e.key === 'Escape') closeDropdown();
  });

  /* ---- Close on Escape anywhere ---- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && fleetItem.classList.contains('is-open')) {
      closeDropdown();
      fleetTrigger.focus();
    }
  });

  /* ---- Close when clicking outside the dropdown ---- */
  document.addEventListener('click', function (e) {
    if (!fleetItem.contains(e.target)) closeDropdown();
  });

  /* ---- Close when any OTHER nav link is clicked ---- */
  document.querySelectorAll('.nav-links a:not(.nav-fleet-trigger), .nav-links .nav-cta').forEach(function (a) {
    a.addEventListener('click', closeDropdown);
  });

  /* ---- Mobile fleet sub-menu ---- */
  const mobileToggle = document.getElementById('navMobileFleetToggle');
  const mobileSub    = document.getElementById('navMobileFleetSub');

  if (mobileToggle && mobileSub) {
    mobileToggle.addEventListener('click', function () {
      const open = !mobileSub.classList.contains('open');
      mobileSub.classList.toggle('open', open);
      mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileSub.setAttribute('aria-hidden', open ? 'false' : 'true');
    });
  }

});
