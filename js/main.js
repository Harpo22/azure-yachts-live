/* =============================================
   AZURE YACHTS — Global Scripts
   ============================================= */

(function () {
  'use strict';

  /* Custom cursor (desktop only) */
  var cursor = document.getElementById('cursor');
  var ring   = document.getElementById('cursorRing');

  if (cursor && ring && window.matchMedia('(hover: hover)').matches) {
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
    (function tick() {
      cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(tick);
    })();
    document.querySelectorAll('a, button, [data-hover]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('hover'); ring.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
    });
  }

  /* Navbar scroll class */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    function onScroll() { navbar.classList.toggle('scrolled', window.scrollY > 60); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Mobile hamburger */
  var hamburger  = document.getElementById('navHamburger');
  var mobileMenu = document.getElementById('navMobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileMenu.classList.toggle('open', open);
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* Scroll-reveal */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* Form helpers */
  window.AzureForm = {
    validate: function (form) {
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        var group    = field.closest('.form-group');
        var empty    = field.type === 'checkbox' ? !field.checked : !field.value.trim();
        var badEmail = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        if (empty || badEmail) { group && group.classList.add('invalid'); valid = false; }
        else { group && group.classList.remove('invalid'); }
      });
      return valid;
    },
    setLoading: function (btn, loading) {
      if (loading) { btn.dataset.originalText = btn.textContent; btn.textContent = 'Sending\u2026'; btn.disabled = true; }
      else { btn.textContent = btn.dataset.originalText || 'Submit'; btn.disabled = false; }
    },
    setSuccess: function (btn, msg) { btn.textContent = msg || 'Sent \u2713'; btn.style.background = 'var(--gold-dark)'; btn.disabled = true; },
    setError:   function (btn, msg) { btn.textContent = msg || 'Error \u2014 please try again'; btn.style.background = '#8a2020'; btn.disabled = false; }
  };

})();
