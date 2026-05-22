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

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
    });

    (function tick() {
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(tick);
    })();

    document.querySelectorAll('a, button, [data-hover]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('hover'); ring.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
    });
  }

  /* ------------------------------------------
     Navbar — scroll class
  ------------------------------------------ */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    function onScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------
     Mobile hamburger
  ------------------------------------------ */
  var hamburger  = document.getElementById('navHamburger');
  var mobileMenu = document.getElementById('navMobile');

  function closeMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileMenu.classList.toggle('open', isOpen);
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close mobile menu when any link inside it is clicked */
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMobileMenu);
    });
  }

  /* ------------------------------------------
     Mobile — Fleet sub-menu accordion
  ------------------------------------------ */
  var mobileFleetBtn = document.getElementById('navMobileFleetToggle');
  var mobileFleetSub = document.getElementById('navMobileFleetSub');

  if (mobileFleetBtn && mobileFleetSub) {
    mobileFleetBtn.addEventListener('click', function () {
      var isOpen = mobileFleetSub.classList.toggle('open');
      mobileFleetBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    /* Close sub-menu when its links are clicked (mobile menu close handles the rest) */
    mobileFleetSub.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileFleetSub.classList.remove('open');
        mobileFleetBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------
     Desktop Fleet dropdown
     Two-step open: display:block first, then .is-visible for fade.
     Two-step close: remove .is-visible, wait for transition, remove display.
     Hard reset runs immediately so dropdown is NEVER visible on load.
  ------------------------------------------ */
  var fleetItem    = document.getElementById('navFleetItem');
  var fleetTrigger = document.getElementById('navFleetTrigger');
  var fleetDrop    = document.getElementById('navFleetDropdown');

  if (fleetItem && fleetTrigger && fleetDrop) {

    var closeTimer  = null;
    var openRaf     = null;

    /* Hard reset — called immediately, before any event wiring */
    function hardClose() {
      clearTimeout(closeTimer);
      cancelAnimationFrame(openRaf);
      fleetDrop.classList.remove('is-visible');
      fleetItem.classList.remove('is-open');
      fleetTrigger.setAttribute('aria-expanded', 'false');
      fleetDrop.setAttribute('aria-hidden', 'true');
      /* Force display:none immediately via inline style in case
         a transition is mid-flight */
      fleetDrop.style.display = 'none';
    }

    /* Run hard close RIGHT NOW — before any hover or click can fire */
    hardClose();

    function openFleet() {
      clearTimeout(closeTimer);
      /* Remove inline display:none so the CSS class can take over */
      fleetDrop.style.display = '';
      fleetItem.classList.add('is-open');
      fleetTrigger.setAttribute('aria-expanded', 'true');
      fleetDrop.setAttribute('aria-hidden', 'false');
      /* One rAF tick later: add .is-visible to trigger the CSS fade */
      cancelAnimationFrame(openRaf);
      openRaf = requestAnimationFrame(function () {
        openRaf = requestAnimationFrame(function () {
          fleetDrop.classList.add('is-visible');
        });
      });
    }

    function closeFleet() {
      clearTimeout(closeTimer);
      cancelAnimationFrame(openRaf);
      fleetDrop.classList.remove('is-visible');
      fleetItem.classList.remove('is-open');
      fleetTrigger.setAttribute('aria-expanded', 'false');
      fleetDrop.setAttribute('aria-hidden', 'true');
    }

    function scheduleClose() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(closeFleet, 150);
    }

    /* Hover on the <li> — panel is inside <li> so no gap-close issue */
    fleetItem.addEventListener('mouseenter', openFleet);
    fleetItem.addEventListener('mouseleave', scheduleClose);

    /* Click toggle on the button trigger */
    fleetTrigger.addEventListener('click', function (e) {
      e.stopPropagation(); /* prevent document click closing immediately */
      if (fleetItem.classList.contains('is-open')) {
        closeFleet();
      } else {
        openFleet();
      }
    });

    /* Clicks inside the panel don't bubble to document close handler */
    fleetDrop.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    /* Click outside closes */
    document.addEventListener('click', function () {
      if (fleetItem.classList.contains('is-open')) {
        closeFleet();
      }
    });

    /* Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && fleetItem.classList.contains('is-open')) {
        closeFleet();
        fleetTrigger.focus();
      }
    });

    /* Any other nav link click closes the dropdown */
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', closeFleet);
    });
  }

  /* ------------------------------------------
     Scroll-reveal
  ------------------------------------------ */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { revealIO.observe(el); });
  }

  /* ------------------------------------------
     Form helpers (used by index.js and enquiry.js)
  ------------------------------------------ */
  window.AzureForm = {
    validate: function (form) {
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        var group    = field.closest('.form-group');
        var empty    = (field.type === 'checkbox') ? !field.checked : !field.value.trim();
        var badEmail = (field.type === 'email') && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        if (empty || badEmail) {
          group && group.classList.add('invalid');
          valid = false;
        } else {
          group && group.classList.remove('invalid');
        }
      });
      return valid;
    },

    setLoading: function (btn, loading) {
      if (loading) {
        btn.dataset.originalText = btn.textContent;
        btn.textContent = 'Sending\u2026';
        btn.disabled = true;
      } else {
        btn.textContent = btn.dataset.originalText || 'Submit';
        btn.disabled = false;
      }
    },

    setSuccess: function (btn, msg) {
      btn.textContent = msg || 'Sent \u2713';
      btn.style.background = 'var(--gold-dark)';
      btn.disabled = true;
    },

    setError: function (btn, msg) {
      btn.textContent = msg || 'Error \u2014 please try again';
      btn.style.background = '#8a2020';
      btn.disabled = false;
    }
  };

})();
