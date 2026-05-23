import { initLoader }    from './loader.js';
import { initCursor }    from './cursor.js';
import { initTyping, initHeroName } from './typing.js?v=5';
import { initScroll }    from './scroll.js';
import { initCounters }  from './counters.js';
import { initTilt }      from './tilt.js';
import { projects, activities }  from './data.js';
import { initParticles }         from './particles.js';

// Helper function to escape HTML characters to prevent XSS
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>'"]/g, tag => {
    switch (tag) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case "'": return '&#39;';
      case '"': return '&quot;';
      default: return tag;
    }
  });
}

// Helper function to sanitize URLs to prevent javascript: XSS
function sanitizeURL(url) {
  if (!url) return '#';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/') || trimmed.startsWith('#')) {
    return trimmed;
  }
  return '#';
}

// Render projects from data
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map(p => {
    const safeNum = escapeHTML(p.num);
    const safeName = escapeHTML(p.name);
    const safeDesc = escapeHTML(p.desc);
    const safeBg = escapeHTML(p.bg);
    const safeUrl = sanitizeURL(p.url);
    const featuredClass = p.featured ? ' featured' : '';
    const safeTags = p.tags.map(t => `<span class="project-tag">${escapeHTML(t)}</span>`).join('');

    return `
      <article class="project-card tilt-card reveal${featuredClass}">
        <div class="project-bg ${safeBg}"></div>
        <div class="project-overlay"></div>
        <div class="project-content">
          <div class="project-num" aria-hidden="true">${safeNum}</div>
          <h3 class="project-name">${safeName}</h3>
          <p class="project-desc">${safeDesc}</p>
          <div class="project-tags" aria-label="Technologies used">
            ${safeTags}
          </div>
        </div>
        <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="project-arrow" aria-label="View ${safeName} project">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 14L14 2M14 2H6M14 2V10" stroke="var(--accent)" stroke-width="1.2"/>
          </svg>
        </a>
      </article>
    `;
  }).join('');
}

// Render activities from data
function renderActivities() {
  const grid = document.getElementById('activities-grid');
  if (!grid) return;

  grid.innerHTML = activities.map(p => {
    const safeNum = escapeHTML(p.num);
    const safeName = escapeHTML(p.name);
    const safeDesc = escapeHTML(p.desc);
    const safeBg = escapeHTML(p.bg);
    const safeUrl = sanitizeURL(p.url);
    const featuredClass = p.featured ? ' featured' : '';
    const safeTags = p.tags.map(t => `<span class="project-tag">${escapeHTML(t)}</span>`).join('');

    return `
      <article class="project-card tilt-card reveal${featuredClass}">
        <div class="project-bg ${safeBg}"></div>
        <div class="project-overlay"></div>
        <div class="project-content">
          <div class="project-num" aria-hidden="true">${safeNum}</div>
          <h3 class="project-name">${safeName}</h3>
          <p class="project-desc">${safeDesc}</p>
          <div class="project-tags" aria-label="Tags">
            ${safeTags}
          </div>
        </div>
        <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="project-arrow" aria-label="View ${safeName} details">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 14L14 2M14 2H6M14 2V10" stroke="var(--accent)" stroke-width="1.2"/>
          </svg>
        </a>
      </article>
    `;
  }).join('');
}

renderProjects();
renderActivities();
initLoader();
initCursor();
initTyping();
initHeroName();
initScroll();
initCounters();
initTilt();
initParticles();

// Mobile hamburger menu
(function initHamburger() {
  const navRight = document.querySelector('.nav-right');
  const navLinks = document.querySelector('.nav-links');
  if (!navRight || !navLinks) return;

  // Create hamburger button
  const btn = document.createElement('button');
  btn.className = 'nav-hamburger';
  btn.setAttribute('aria-label', 'Toggle navigation');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';
  navRight.appendChild(btn);

  function toggleMenu(open) {
    btn.classList.toggle('open', open);
    navLinks.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  btn.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    toggleMenu(!isOpen);
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });
})();
