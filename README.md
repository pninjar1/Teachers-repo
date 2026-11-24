# Mr. Ugochukwu Ekenedirichukwu: Portfolio Website

A fast, static, mobile-first portfolio with an elegant dark theme and a light mode toggle. No build step: it is plain HTML, CSS and JavaScript, so it can be hosted free almost anywhere.

## Files

```
index.html        All sections of the site
404.html          Custom "page not found" page
css/styles.css    Colours, layout, dark and light themes
js/main.js        Menu, theme toggle, gallery, resources list, contact form
favicon.svg       Browser tab icon
robots.txt        Search engine rules
sitemap.xml       Page list for search engines
assets/           Put your own photos, CV and PDFs here (see below)
```

## 1. Fill in your real details

Everything still to be completed is outlined with a **dashed border** (class `ph`). Search `index.html` for `data-ph` to find each one, replace the text, then delete the `ph` class and `data-ph` attribute from that element.

Still needed from you: school, classes taught, qualifications, certifications, teaching philosophy, biography, skills, email, WhatsApp number, social links, and your own profile photo. Nothing has been invented: achievements and testimonials show an empty state until you supply real ones.

Only list credentials, achievements and testimonials that are genuine and that the people concerned have approved.

## 2. Add your files

| What | Where | How to connect |
|---|---|---|
| Profile photo | `assets/profile.jpg` | In `index.html`, replace the `.photo-frame` block with `<img src="assets/profile.jpg" alt="Mr. Ugochukwu Ekenedirichukwu" width="380" height="475">` |
| CV | `assets/Ugochukwu-Ekenedirichukwu-CV.pdf` | Already linked. The button says "CV coming soon" until the file exists. |
| Gallery photos | `assets/gallery/` | List them in the `GALLERY` array at the top of `js/main.js` |
| Resources (PDF) | `assets/resources/` | List them in the `RESOURCES` array at the top of `js/main.js` |
| Share preview image | `assets/og-image.jpg` (1200 x 630 px) | Already referenced in the meta tags |

Compress photos before uploading (squoosh.app is free) and keep each under about 300 KB so the site loads quickly on mobile data.

The three photos you shared look like stock images, so I did not use them. Use your own photo of yourself and your own classroom. Get school and parent permission before showing pupils.

## 3. Connect the contact form

1. Go to web3forms.com and enter your email address to get a free access key.
2. In `index.html`, replace `YOUR_WEB3FORMS_ACCESS_KEY` with that key.
3. Send a test message. Messages arrive in your inbox.

The form has validation and a hidden spam trap.

## 4. WhatsApp and social links

- In `index.html`, find `wa.me/234XXXXXXXXXX` and replace it with your number in international format without `+` or spaces (for example `2348012345678`).
- Replace the three `href="#"` social links with your profile URLs, or delete the ones you do not use.

## 5. Choose and connect a domain

1. Pick a name you can say aloud on a phone call and that has no hyphens or numbers. Examples to check: `ugochukwuekenedirichukwu.com`, `ekenedirichukwu.com`, `mrugochukwu.com`, `ugoteaches.com`. A `.ng` or `.com.ng` name is a good local choice.
2. Check availability and buy from a registrar such as Whogohost, Qservers or Namecheap.
3. Deploy the site (next section), then in your host's **Domains** settings add your domain. The host shows the DNS records to add at your registrar (usually an `A` record for the root domain and a `CNAME` for `www`). Propagation can take from a few minutes to 48 hours.
4. Replace `www.YOUR-DOMAIN.com` with your real domain in `index.html`, `robots.txt` and `sitemap.xml`.

## 6. Deploy with HTTPS (free options)

**Netlify (easiest):** sign in at netlify.com, choose **Add new site, Deploy manually**, and drag the whole project folder onto the page. HTTPS is enabled automatically, and `404.html` is used as the error page.

**Cloudflare Pages or GitHub Pages:** upload or connect the folder in the same way. HTTPS is automatic. On GitHub Pages, `404.html` also works as the error page.

**Vercel:** import the folder as a project with the "Other" framework preset and no build command.

## 7. Search engine setup

- After going live, add the site at search.google.com/search-console and submit `https://your-domain/sitemap.xml`.
- Keep the page title and description in `index.html` accurate. The page already includes semantic headings, Open Graph tags, and structured data.

## 8. Maintenance

- **Edit text:** open `index.html`, change the words, save, and upload again.
- **Colours:** change the variables at the top of `css/styles.css` (`--gold` is the accent colour).
- **Add a job to the timeline:** copy one `<li class="reveal">` block inside `<ol class="timeline">`.
- **Add a portfolio item:** copy one `<article class="card item reveal">` block.
- Update `lastmod` in `sitemap.xml` when you make big changes.
- Back up the folder on Google Drive after each update.
