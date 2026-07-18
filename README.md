# Dynamic Design & Constructions

> **Where Concepts Meet Creation.**

This repository contains the source code for the official website of **Dynamic Design & Constructions**, a premier architecture, construction, and interior design firm based in Patna, Bihar.

## 🌐 Live Website
*(Add your live GitHub Pages or Netlify URL here! e.g., `https://anoobdev.github.io/dynamic-design-construction`)*

## ✨ Key Features

- **Blazing Fast Performance**: Built completely without heavy frameworks (zero dependencies) for instant load times.
- **Fully Responsive**: Fluid, mobile-first design system utilizing modern CSS layouts.
- **SEO & Accessibility Optimized**: Includes proper semantic HTML structure, strict WAI-ARIA accessibility standards, and full JSON-LD `LocalBusiness` structured data for Google Rich Snippets.
- **Ironclad Security**: Enforces a strict `Content-Security-Policy` (CSP) with zero third-party script supply chain risks.
- **Rich Media Gallery**: Highly optimized architectural renders and construction site progress photos.

## 🛠️ Tech Stack

- **HTML5**: Semantic and accessible DOM structure.
- **CSS3**: Modern Vanilla CSS (`:root` tokens, flexbox/grid layouts, micro-animations, and hover states).
- **Vanilla JavaScript**: Extremely lightweight logic for mobile navigation toggles.

## 📂 Project Structure

```text
├── index.html            # Main entry point and page layout
├── sitemap.xml           # Search engine sitemap
├── robots.txt            # Search engine crawler permissions
└── src/
    ├── scripts/
    │   └── main.js       # Lightweight interaction logic
    ├── styles/
    │   └── main.css      # Core design system and section styling
    └── assets/           # Portfolio images, team photos, and SVG logo
```

## 🚀 Running Locally

Because this project is a purely static website with absolutely no build steps, running it locally is incredibly easy:

1. Clone the repository to your machine.
2. Simply double-click `index.html` to open it in any web browser.
3. *Optional:* Use an extension like VS Code's **Live Server** to get automatic hot-reloading while making edits.

## 🛡️ Maintainability Notes

- **Centralized Design Tokens**: All brand colors, typography sizes, and spacing variables are maintained as CSS Custom Properties in the `:root` pseudo-class inside `main.css`.
- **Organized Styles**: The CSS file is clearly labeled and split into logical sections (e.g., `/* ===== HERO ===== */`).
- **Future Proof**: By avoiding complex JavaScript frameworks, anyone on the team can edit the code instantly without needing Node.js, `npm`, or complex package managers.

## 👨‍💻 Developer Credit

This website was proudly designed and developed by **[Aftab Alam](https://www.linkedin.com/in/aftab-alam-8a662a126/)**.
