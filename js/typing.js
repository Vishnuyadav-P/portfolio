// Cycling typing text in the hero tag
export function initTyping() {
  const el    = document.getElementById('typing-text');
  if (!el) return;
  const words = ['AI & ML Engineer', 'Full Stack Developer', 'Deep Learning Engineer', 'Computer Vision Dev', 'Python Developer'];
  let wIdx = 0, cIdx = 0, deleting = false;

  function tick() {
    const word = words[wIdx];
    if (!deleting) {
      el.textContent = word.slice(0, ++cIdx);
      if (cIdx === word.length) { deleting = true; setTimeout(tick, 1800); return; }
      setTimeout(tick, 85);
    } else {
      el.textContent = word.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; setTimeout(tick, 300); return; }
      setTimeout(tick, 45);
    }
  }
  setTimeout(tick, 1400);
}

// Typewriter → shimmer sweep on hero name
export function initHeroName() {
  function typeLine(el, text, onComplete) {
    let index = 0;

    el.classList.add('is-typing');

    const typing = setInterval(() => {
      index += 1;
      el.textContent = text.slice(0, index);

      if (index >= text.length) {
        clearInterval(typing);
        setTimeout(() => {
          el.classList.remove('is-typing');
          onComplete();
        }, 350);
      }
    }, 140);
  }

  const scramble1 = document.getElementById('scramble-1');
  const scramble2 = document.getElementById('scramble-2');
  if (!scramble1 || !scramble2) return;

  const firstText = scramble1.textContent.trim();
  const secondText = scramble2.textContent.trim();
  const heroName = scramble1.closest('.hero-name');

  scramble1.textContent = '';
  scramble2.textContent = '';

  setTimeout(() => {
    typeLine(scramble1, firstText, () => {
      setTimeout(() => {
        typeLine(scramble2, secondText, () => {
          heroName?.classList.add('is-loaded');
        });
      }, 250);
    });
  }, 1100);
}
