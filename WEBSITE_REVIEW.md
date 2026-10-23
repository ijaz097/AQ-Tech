# Website review — 23 October 2026

Reviewed all 15 content pages, the Google verification file, both SVGs, all existing CSS and JavaScript, CNAME, robots and sitemap at baseline `658dbfcd6a81c68c6c06bfc5a956a57ecb57fecb`. No package manifests, custom Actions workflows or server configuration existed at that revision.

## Changes

- Fixed inherited white headings on light feature/package panels. Assigned explicit foregrounds to shared white cards, corrected the home feature heading/label and retained readable dark hero text treatments. Corrected package breadcrumbs, introductory text, price notes and both tabs. The original tabs measured only 1.14:1 and 1.03:1 against their backgrounds in axe-core.
- Darkened primary buttons, muted labels, placeholder text and the WhatsApp icon background; made footer branding readable. Added consistent visible focus rings, FAQ summary focus, underlined prose links and scroll clearance for the sticky header.
- Fixed the home footer's inherited column spans on narrow screens, mobile menu positioning at intermediate breakpoints, wrapping of long contact details and oversized button flex sizing. Improved input sizing on phones and reserved footer space for the floating contact button.
- Added a packages skip link and focusable main targets everywhere. Added Arrow Left/Right, Home and End navigation to tabs, correct tab stops and hidden panels. The IP and analog content both remain visible without JavaScript.
- Added menu dismissal with Escape (returning focus), outside click and navigation, plus reset on desktop resizing. Navigation remains available without JavaScript.
- Fixed quotation fields: location and property were omitted, and the HTML `message` name did not match JavaScript's `details` name. All six fields now appear in the encoded WhatsApp draft. The form uses a multiline details control, telephone input and same-tab navigation to avoid popup blocking, and retains entered values. No-JavaScript submission is disabled with direct-contact guidance.
- Removed duplicate loading of the home script and competing inline package-tab script. Moved page-specific CSS to cached files and loaded a shared corrections stylesheet last.
- Added a restrictive meta Content Security Policy and referrer policy to content pages. Executable scripts must be same-origin; connections, form posts, object embedding and base URL overrides are blocked. Existing JSON-LD remains parseable. External new-window links retain `noopener noreferrer`. Inline styles remain allowed for the existing style attributes.
- Normalized internal home links to `/`, and normalized explicit index URLs using history replacement without another network request. Preserved unique titles, descriptions, canonical/OG URLs, structured data, sitemap, robots, CNAME and Google verification.
- Added a noindex custom 404, `.nojekyll`, maintenance documentation and a dependency-free validation script. Added a read-only, non-deploying PR workflow with a pinned checkout action and disabled credential persistence.

## Verification

- Python site checks: all 15 content pages; local links/assets/fragments, unique titles and IDs, one H1, skip links, JSON-LD parsing, canonical URLs, sitemap parity, HTTPS references, script duplication, CSP presence and safe external targets.
- JavaScript syntax and Git whitespace checks passed.
- Local headless Microsoft Edge 155: all 15 pages at widths 320, 390, 768, 850, 1024 and 1440 pixels (90 page/viewport combinations). No horizontal document overflow, broken local links/resources, uncaught JavaScript errors or browser-console errors in those runs.
- axe-core 4.10.3 WCAG 2 A/AA and 2.1 AA scans at 390 and 1440 pixels: no reported violations. Also scanned expanded FAQs and the IP package panel. Automated contrast detection has limits on gradients and composited backgrounds; screenshots were also visually inspected.
- Keyboard tab switching, panel visibility, menu Escape/focus return, no-JavaScript navigation and package visibility, disabled no-JavaScript form and custom 404 checked. Captured the outbound quote URL locally and verified all six fields with punctuation preserved. No real message was sent.

## Remaining limits and owner tasks

- GitHub's connector rejected the Pages settings endpoint, so the exact publishing directory, Enforce HTTPS setting, certificate and domain-verification settings could not be inspected. The existing Pages deployment history confirms successful publishing from main, and the public HTTPS site responds. Preserve the current Pages source and verify Enforce HTTPS and domain verification in Settings → Pages before merging. See https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https.
- The branch endpoint reports `main` is unprotected. An owner should require pull requests and the Website checks validation job before merges. Repository administration and DNS settings were not changed.
- Meta CSP cannot provide HTTP-header-only controls such as `frame-ancestors`; configure appropriate response headers at a capable proxy/host if required. No unsupported `_headers` file was added to GitHub Pages. This is a basic source/security review, not penetration testing or a scan of repository history/secrets.
- SVG social-preview images were preserved; some social networks require a raster preview. A branded PNG/JPEG and verification through the relevant social debuggers remain future work.
- Automated accessibility checks are not a WCAG conformance certification. Manual screen-reader testing, Safari/Firefox and physical iOS/Android device checks remain outstanding. Live WhatsApp delivery, indexing and real deployment behavior require post-merge checks.
- Business claims, team details, package prices, equipment availability and service qualifications were preserved and require owner confirmation. No legal or technical certification of those claims is implied.
- No live publication, merge, DNS change or Pages configuration change was performed by this review.
