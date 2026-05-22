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
