# AQ Tech website

Static HTML, CSS, SVG and browser JavaScript for https://aqtech.shop. No build step, framework, runtime packages, database, analytics or server-side form handler is required.

## Review and preview

Serve the repository root over HTTP (for example `python -m http.server 8000`) and open `http://localhost:8000`. Root-relative links assume the custom domain or a server rooted at this directory; opening files directly or hosting under `/AQ-Tech/` is not a supported preview.

Run `python tools/check_site.py` and `node --check assets/site.js`. The Website checks workflow runs these checks with read-only repository permission on pull requests and main-branch pushes. It does not deploy anything.

## Styles and behavior

- `assets/style.css`: common design and layouts.
- `assets/home.css`, `assets/packages.css`: existing page-specific designs extracted from inline styles.
- `assets/review.css`: shared contrast, focus, responsive and progressive-enhancement corrections; load it last.
- `assets/site.js`: menu, keyboard-accessible package tabs and WhatsApp quote preparation. Load once per page.

The quote form prepares all six fields in a WhatsApp URL. The customer must send the message there. Draft fields are not cleared by the site, and no message is sent automatically. Without JavaScript, direct contact links remain available and the form submit button stays disabled.

## Deployment

`CNAME` is `aqtech.shop`; canonical URLs, robots and sitemap use HTTPS and that domain. `.nojekyll` makes the plain static serving intent explicit. `404.html` supplies a useful missing-page screen. The Google verification file is intentionally preserved.

GitHub's existing successful Pages run deployed commit `658dbfcd6a81c68c6c06bfc5a956a57ecb57fecb` from `main` on 23 October 2026. Keep fixes on the PR branch until reviewed; merging into the configured publishing branch may update the live site.

See [WEBSITE_REVIEW.md](WEBSITE_REVIEW.md) for evidence, checks and remaining owner tasks.
