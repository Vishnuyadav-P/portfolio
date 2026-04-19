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
    el.innerHTML = '';

    const typing = setInterval(() => {
      const char = document.createElement('span');
      char.className = 'char';
      char.textContent = text[index];
      el.appendChild(char);
      index += 1;

      if (index >= text.length) {
        clearInterval(typing);
        setTimeout(() => {
          el.classList.remove('is-typing');
          onComplete();
        }, 350);
      }
    }, 140);
  }

  function flashChar(el, color, glow) {
    const chars = el.querySelectorAll('.char');
    if (!chars.length) return;

    const char = chars[Math.floor(Math.random() * chars.length)];
    char.classList.add('is-flashing');
    char.style.color = color;
    char.style.textShadow = `0 0 20px ${glow}`;

    setTimeout(() => {
      char.classList.remove('is-flashing');
      char.style.color = '';
      char.style.textShadow = '';
    }, 420);
  }

  function startLetterFlash(firstLine, secondLine) {
    setInterval(() => {
      flashChar(firstLine, 'var(--accent)', 'var(--accent)');
      flashChar(secondLine, 'var(--text)', 'rgba(232, 228, 240, 0.75)');
    }, 3600);
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
          startLetterFlash(scramble1, scramble2);
        });
      }, 250);
    });
  }, 1100);
}
