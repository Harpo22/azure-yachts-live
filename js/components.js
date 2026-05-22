/* =============================================
   AZURE YACHTS — Shared HTML components
   ============================================= */

(function () {

  const inPages = window.location.pathname.includes('/pages/');
  const root    = inPages ? '../' : './';

  const path = window.location.pathname.split('/').pop() || 'index.html';
  function isActive(page) {
    if (page === 'enquiry.html' && path === 'enquiry.html') return 'active';
    return '';
  }

  const navHTML = `
<nav id="navbar">
  <a href="${root}index.html" class="nav-logo">Azure</a>
  <ul class="nav-links">
    <li><a href="${root}index.html#fleet">Fleet</a></li>
    <li><a href="${root}index.html#destinations">Destinations</a></li>
    <li><a href="${root}index.html#experience">Experience</a></li>
    <li><a href="${root}pages/enquiry.html" class="${isActive('enquiry.html')}">Charter</a></li>
    <li><a href="${root}pages/enquiry.html" class="nav-cta">Private Charter</a></li>
  </ul>
  <button class="nav-hamburger" id="navHamburger" aria-label="Toggle menu" aria-expanded="false" type="button">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="nav-mobile" id="navMobile" aria-hidden="true">
  <a href="${root}index.html">Home</a>
  <a href="${root}index.html#fleet">Fleet</a>
  <a href="${root}index.html#destinations">Destinations</a>
  <a href="${root}index.html#experience">Experience</a>
  <a href="${root}index.html#about">About</a>
  <a href="${root}pages/enquiry.html" class="mobile-cta">Private Charter Enquiry</a>
</div>

<div class="cursor" id="cursor" aria-hidden="true"></div>
<div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>
`;

  const footerHTML = `
<footer>
  <div class="footer-grid">
    <div>
      <a href="${root}index.html" class="footer-logo">Azure</a>
      <p class="footer-tagline">The world's most distinguished private yacht charter company, curating extraordinary voyages since 1987.</p>
    </div>
    <div class="footer-col">
      <h4>Fleet</h4>
      <ul>
        <li><a href="${root}index.html#fleet">Superyachts</a></li>
        <li><a href="${root}index.html#fleet">Motor Yachts</a></li>
        <li><a href="${root}index.html#fleet">Sailing Yachts</a></li>
        <li><a href="${root}index.html#fleet">Classic Vessels</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="${root}pages/enquiry.html">Private Charter</a></li>
        <li><a href="${root}pages/enquiry.html">Corporate Events</a></li>
        <li><a href="${root}index.html#experience">Yacht Management</a></li>
        <li><a href="${root}index.html#experience">Crew Placement</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="${root}index.html#about">About Azure</a></li>
        <li><a href="${root}index.html#about">Our Story</a></li>
        <li><a href="${root}pages/enquiry.html">Contact</a></li>
        <li><a href="${root}pages/privacy.html">Privacy Policy</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span class="footer-copy">&copy; 2025 Azure Yachts. All rights reserved. Monaco.</span>
    <div class="footer-social">
      <a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a>
      <a href="https://linkedin.com/" target="_blank" rel="noopener">LinkedIn</a>
      <a href="${root}pages/privacy.html">Privacy</a>
    </div>
  </div>
</footer>
`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

})();
