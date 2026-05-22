# Azure Yachts — Production Website

Ultra-luxury yacht charter website. Production-ready static site, deployable to Vercel in under 2 minutes.

---

## Project Structure

```
azure-yachts/
├── index.html              ← Homepage
├── 404.html                ← Custom 404 page
├── robots.txt              ← SEO crawler rules
├── sitemap.xml             ← SEO sitemap
├── vercel.json             ← Vercel deployment config (headers, redirects)
│
├── css/
│   ├── style.css           ← Global styles (nav, footer, forms, responsive)
│   ├── index.css           ← Homepage-specific styles
│   └── enquiry.css         ← Enquiry page styles
│
├── js/
│   ├── components.js       ← Nav + Footer injection (shared across pages)
│   ├── main.js             ← Global scripts (cursor, nav scroll, reveals)
│   ├── index.js            ← Homepage form handling
│   └── enquiry.js          ← Enquiry form handling + pre-fill logic
│
└── pages/
    ├── enquiry.html        ← Full charter enquiry form
    ├── thank-you.html      ← Post-submission confirmation
    └── privacy.html        ← Privacy policy
```

---

## Before You Deploy — Required Steps

### 1. Set Your Email Address (FormSubmit)
FormSubmit sends form submissions to your email. Replace the placeholder email in **two places**:

**`index.html`** (line ~260):
```html
<form action="https://formsubmit.co/YOUR_EMAIL_HERE" method="POST">
```

**`pages/enquiry.html`** (line ~85):
```html
<form action="https://formsubmit.co/YOUR_EMAIL_HERE" method="POST">
```

Replace `YOUR_EMAIL_HERE` with your actual email, e.g. `charter@yourdomain.com`.

> **First submission**: FormSubmit will send you an activation email. Click the link to activate your form endpoint. All subsequent submissions will go straight to your inbox.

### 2. Update the Thank-You Page URL
In both forms, update the `_next` hidden input to your actual domain:
```html
<input type="hidden" name="_next" value="https://YOURDOMAIN.com/pages/thank-you.html">
```

### 3. Update Your Domain in SEO Tags
Search and replace `azureyachts.com` with your actual domain in:
- `index.html` (canonical, og:url)
- `pages/enquiry.html` (canonical, og:url)
- `sitemap.xml`
- `robots.txt`

### 4. Update Contact Details
Replace placeholder contact info throughout:
- Phone: `+377 000 000 000`
- Email: `charter@azureyachts.com`
- Address: `7 Quai Antoine 1er, Monte Carlo`

---

## Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
npm i -g vercel
cd azure-yachts
vercel
# Follow prompts — select "No framework"
# Build command: leave empty
# Output directory: . (current directory)
```

### Option B — Vercel Dashboard (no CLI)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New → Project**
3. Import from GitHub (push this folder first) OR use **"Deploy without Git"**
4. Framework preset: **Other**
5. Build command: *(leave empty)*
6. Output directory: `.` (dot — current directory)
7. Click **Deploy**

Your site will be live in ~30 seconds.

---

## Vercel Features Configured

| Feature | Status |
|---|---|
| Clean URLs (`/pages/enquiry` not `.html`) | ✅ |
| Custom 404 page | ✅ |
| Security headers (CSP, XSS, Frame) | ✅ |
| Long-cache headers for CSS/JS | ✅ |
| Redirects (`/contact` → `/pages/enquiry`) | ✅ |

---

## FormSubmit Features Configured

| Feature | Config |
|---|---|
| Custom email subject | `_subject` hidden field |
| Redirect to thank-you page | `_next` hidden field |
| Auto-response to enquirer | `_autoresponse` hidden field |
| Formatted table email | `_template: table` |
| Spam honeypot | `_honey` hidden field |
| CAPTCHA disabled | `_captcha: false` |

---

## Customisation

**Change colours**: Edit CSS variables at the top of `css/style.css` (`:root` block).

**Add a vessel**: Copy a `.yacht-card` block in `index.html` and update the `enquiry.html` vessel select options.

**Add a destination**: Add an `<a class="dest-item">` in `index.html` and an `<option>` in `pages/enquiry.html`.

**Google Analytics**: Add your GA4 script tag before `</head>` in each HTML file.

---

## Browser Support
Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. Mobile responsive at 320px+.
