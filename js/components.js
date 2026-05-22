/* =============================================
   AZURE YACHTS — Shared HTML components
   Injects nav + footer into every page
   ============================================= */

(function () {

  /* ---- Determine root path ---- */
  const inPages = window.location.pathname.includes('/pages/');
  const root    = inPages ? '../' : './';

  /* ---- Current page highlight (non-fleet links only) ---- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  function isActive(page) {
    if (page === 'enquiry.html' && path === 'enquiry.html') return 'active';
    return '';
  }

  /* ---- NAV ---- */
  const navHTML = `
<nav id="navbar">
  <a href="${root}index.html" class="nav-logo">Azure</a>
  <ul class="nav-links" id="navLinks">

    <li class="nav-item-fleet" id="navFleetItem">
      <button
        class="nav-fleet-trigger"
        id="navFleetTrigger"
        aria-haspopup="true"
        aria-expanded="false"
        type="button">
        Fleet <span class="nav-chevron" aria-hidden="true">&#8964;</span>
      </button>
      <div class="nav-dropdown" id="navFleetDropdown" aria-hidden="true">
        <div class="nav-dropdown-inner">
          <a href="${root}pages/enquiry.html?vessel=Seraphine" class="nav-dropdown-vessel">
            <div class="ndv-img" style="background-image:url('https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=300&q=70')"></div>
            <div class="ndv-info">
              <span class="ndv-type">Superyacht</span>
              <span class="ndv-name">S&eacute;raphine</span>
              <span class="ndv-spec">65 m &middot; 12 guests</span>
            </div>
          </a>
          <a href="${root}pages/enquiry.html?vessel=Elara" class="nav-dropdown-vessel">
            <div class="ndv-img" style="background-image:url('https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=300&q=70')"></div>
            <div class="ndv-info">
              <span class="ndv-type">Motor Yacht</span>
              <span class="ndv-name">Elara</span>
              <span class="ndv-spec">42 m &middot; 10 guests</span>
            </div>
          </a>
          <a href="${root}pages/enquiry.html?vessel=Solano" class="nav-dropdown-vessel">
            <div class="ndv-img" style="background-image:url('https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=300&q=70')"></div>
            <div class="ndv-info">
              <span class="ndv-type">Classic Sailing</span>
              <span class="ndv-name">Solano</span>
              <span class="ndv-spec">38 m &middot; 8 guests</span>
            </div>
          </a>
          <div class="nav-dropdown-footer">
            <a href="${root}index.html#fleet" class="nav-dropdown-all">View All Vessels &rarr;</a>
          </div>
        </div>
      </div>
    </li>

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

  <button class="nav-mobile-fleet-toggle" id="navMobileFleetToggle" aria-expanded="false" type="button">
    Fleet <span class="nav-mobile-chevron" aria-hidden="true">&#8964;</span>
  </button>
  <div class="nav-mobile-fleet-sub" id="navMobileFleetSub">
    <a href="${root}pages/enquiry.html?vessel=Seraphine">S&eacute;raphine &mdash; 65m</a>
    <a href="${root}pages/enquiry.html?vessel=Elara">Elara &mdash; 42m</a>
    <a href="${root}pages/enquiry.html?vessel=Solano">Solano &mdash; 38m</a>
    <a href="${root}index.html#fleet">All Vessels</a>
  </div>

  <a href="${root}index.html#destinations">Destinations</a>
  <a href="${root}index.html#experience">Experience</a>
  <a href="${root}index.html#about">About</a>
  <a href="${root}pages/enquiry.html" class="mobile-cta">Private Charter Enquiry</a>
</div>

<div class="cursor" id="cursor" aria-hidden="true"></div>
<div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>
`;

  /* ---- FOOTER ---- */
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

  /* ---- Inject synchronously — elements exist immediately after these lines ---- */
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

})();
