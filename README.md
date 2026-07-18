# Dynamic Design & Construction

A fast, responsive static marketing website for a construction and design studio.

## Project structure

- `index.html` — main page entry point
- `src/styles/main.css` — site styling (design tokens in `:root`, section-commented)
- `src/scripts/main.js` — lightweight JavaScript initialisation
- `src/assets/` — images, favicon, and media assets
- `robots.txt` — crawler access rules
- `sitemap.xml` — search-engine sitemap

## Security

- **Content-Security-Policy** meta tag locks down script, style, font, and image sources.
- **Referrer-Policy** set to `strict-origin-when-cross-origin`.
- No inline scripts or styles — the CSP can stay strict.
- No third-party JavaScript libraries (zero supply-chain risk).

## SEO

- Open Graph and Twitter Card meta tags for social sharing.
- JSON-LD `LocalBusiness` structured data for Google rich results.
- Canonical URL, `robots.txt`, and `sitemap.xml` included.

## Accessibility

- Skip-to-content link for keyboard and screen-reader users.
- `:focus-visible` ring on all interactive elements.
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<blockquote>`.

## Maintainability notes

- All colour values live in CSS custom properties in `:root`.
- CSS is organised with section comments (`/* ===== HERO ===== */`).
- Keep the site simple and static for easier maintenance.
- Keep JavaScript small, focused, and progressively enhanced.
- Avoid inline scripts and inline styles where possible.
- For future growth, consider a static-site generator (Astro, 11ty, Hugo) or a lightweight build step.

