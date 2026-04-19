# Vishnu Vardhan Pullagura Portfolio

A responsive personal portfolio website for Vishnu Vardhan Pullagura, focused on AI, machine learning, deep learning, computer vision, NLP, and full-stack web projects.

The site is built as a lightweight static website using plain HTML, CSS, and JavaScript. It includes animated hero text, custom cursor interactions, project rendering from JavaScript data, SEO metadata, structured data, a sitemap, and a robots file.

## Live Site

https://vishnu-vardhan-pullagura.vercel.app/

## Features

- Animated hero section with typewriter name reveal
- Interactive particle background
- Custom cursor and hover effects
- About, projects, skills, experience, and contact sections
- Project cards rendered from `js/data.js`
- SEO-friendly metadata and JSON-LD structured data
- `robots.txt` and `sitemap.xml` for search engines
- Responsive layout for desktop and mobile

## Tech Stack

- HTML5
- CSS3
- JavaScript ES modules
- Google Fonts
- Static deployment-ready structure

## Project Structure

```text
.
|-- index.html
|-- robots.txt
|-- sitemap.xml
|-- VishnuResume.pdf
|-- css/
|   |-- animations.css
|   |-- base.css
|   |-- hero.css
|   |-- nav.css
|   |-- responsive.css
|   |-- sections.css
|   `-- variables.css
`-- js/
    |-- counters.js
    |-- cursor.js
    |-- data.js
    |-- loader.js
    |-- main.js
    |-- particles.js
    |-- scroll.js
    |-- tilt.js
    `-- typing.js
```

## Run Locally

Because this is a static website, you can open `index.html` directly in a browser.

For a local server, run one of these commands from the project root:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

If you use VS Code, the Live Server extension also works well.

## Customize Content

- Update main page content in `index.html`
- Update project cards in `js/data.js`
- Update colors and fonts in `css/variables.css`
- Update hero animation styles in `css/hero.css` and `css/animations.css`
- Update section layouts in `css/sections.css`
- Replace the resume by updating `VishnuResume.pdf`

## SEO

SEO-related files and metadata are included:

- Page title and description in `index.html`
- Open Graph metadata for social previews
- Twitter card metadata
- JSON-LD `Person` structured data
- Canonical URL
- `robots.txt`
- `sitemap.xml`

If the live domain changes, update the canonical URL, Open Graph URL, JSON-LD URL, `robots.txt`, and `sitemap.xml`.

## Deployment

This project can be deployed on any static hosting platform, including:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

For Vercel or Netlify, deploy the project root as a static site. No build command is required.

## Contact

- Email: vishnuyadavpullagura@gmail.com
- LinkedIn: https://www.linkedin.com/in/vishnu-pullagura
- GitHub: https://github.com/Vishnuyadav-P
