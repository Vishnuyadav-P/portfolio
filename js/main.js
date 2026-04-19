import { initLoader }    from './loader.js';
import { initCursor }    from './cursor.js';
import { initParticles } from './particles.js';
import { initTyping, initHeroName } from './typing.js';
import { initScroll }    from './scroll.js';
import { initCounters }  from './counters.js';
import { initTilt }      from './tilt.js';
import { projects }      from './data.js';

// Render projects from data
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map(p => `
    <div class="project-card tilt-card reveal${p.featured ? ' featured' : ''}">
      <div class="project-bg ${p.bg}"></div>
      <div class="project-overlay"></div>
      <div class="project-content">
        <div class="project-num">${p.num}</div>
        <div class="project-name">${p.name}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
      </div>
      <a href="${p.url}" target="_blank" rel="noopener" class="project-arrow" aria-label="View on GitHub">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 14L14 2M14 2H6M14 2V10" stroke="var(--accent)" stroke-width="1.2"/>
        </svg>
      </a>
    </div>
  `).join('');
}

renderProjects();
initLoader();
initCursor();
initParticles();
initTyping();
initHeroName();
initScroll();
initCounters();
initTilt();
