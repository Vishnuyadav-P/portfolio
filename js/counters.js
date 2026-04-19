export function initCounters() {
  // Integer counters
  const counters = document.querySelectorAll('.counter');
  const intObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = parseInt(e.target.dataset.target, 10);
      let cur = 0;
      const step = target / 40;
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(t); }
        e.target.textContent = Math.floor(cur);
      }, 40);
      intObs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => intObs.observe(c));

  // CGPA decimal counter
  const cgpa = document.getElementById('cgpa-counter');
  if (cgpa) {
    const cgpaObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        let cur = 0;
        const t = setInterval(() => {
          cur += 0.12;
          if (cur >= 7.86) { cur = 7.86; clearInterval(t); }
          e.target.textContent = cur.toFixed(2);
        }, 40);
        cgpaObs.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    cgpaObs.observe(cgpa);
  }

  // Skill bars
  const bars = document.querySelectorAll('.skill-bar-fill');
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.width = e.target.dataset.width + '%';
      barObs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  bars.forEach(b => barObs.observe(b));
}
