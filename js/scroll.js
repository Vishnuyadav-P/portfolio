export function initScroll() {
  // Generic reveal on scroll
  const items = document.querySelectorAll('.reveal, .reveal-left');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  items.forEach(el => revealObs.observe(el));

  // About raise-up
  const about = document.getElementById('about');
  if (about) {
    const aboutObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          about.classList.add('in-view');
          about.querySelector('.about-left')?.classList.add('raised');
          about.querySelector('.about-right')?.classList.add('raised');
          aboutObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    aboutObs.observe(about);
  }

  // Parallax hero canvas + name
  const canvas  = document.getElementById('particles-canvas');
  const heroName = document.querySelector('.hero-name');
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (sy < window.innerHeight) {
      if (canvas)   canvas.style.transform   = `translateY(${sy * 0.3}px)`;
      if (heroName) heroName.style.transform = `translateY(${sy * 0.15}px)`;
    }
  }, { passive: true });

  // Nav background on scroll
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (!nav) return;
    const scrolled = window.scrollY > 60;
    nav.style.background    = scrolled ? 'rgba(6,6,8,.9)' : 'transparent';
    nav.style.backdropFilter = scrolled ? 'blur(12px)'    : 'none';
    nav.style.transition    = 'background .3s, backdrop-filter .3s';
  }, { passive: true });
}
