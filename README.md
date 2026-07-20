# HOA Start — Static Rebuild (POC)

A clean, tracker-free static rebuild of **www.hoastart.com**, built to prove the marketing site can be maintained without the current WordPress customization tangle.

**Live preview:** https://jdlane2.github.io/hoastart-preview/

## What this is

- **Plain static HTML/CSS/JS** — no framework, no build step, no database.
- **No trackers, no analytics, no cookie-consent scripts.** The only automatic third-party request is Google Fonts (Inter). The product video loads from YouTube *only after a click* (facade pattern). Review badges are static.
- **CTAs and forms** point to the existing app at `free.hoastart.com` — no backend here.
- Matches the tech approach of the earlier `membershine-preview` demo.

## Three ways to use the output

1. **GitHub Pages preview** — the live URL above (demo surface).
2. **Paste into WordPress** — each page is standalone HTML; the body can drop into a WP Custom HTML block (WordPress stays the CMS; blog/posts/permissions unchanged).
3. **Clean-switch option** — framework-free, so it's also a migration path if WP is ever retired.

## Structure

```
index.html                 Homepage
features-*.html            9 feature pages
services-*.html            8 service pages
pricing / designs / contact / who-we-are / resources /
customer-journey / see-the-difference / faqs /
testimonials / case-studies / privacy-policy / terms-of-service
assets/css/site.css        Design system (HOA Start brand tokens)
assets/js/site.js          Nav + click-to-load facades (first-party only)
```

## Notes

- Copy is representative placeholder content for the POC, not a verbatim copy of the live site.
- Product screenshots are shown as labeled placeholders — swap in real captures before any production use.
