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
  function wrapChars(el) {
    const text = el.textContent.trim();

    el.innerHTML = '';
    text.split('').forEach(ch => {
      const wrap = document.createElement('span');
      const char = document.createElement('span');

      wrap.className = 'char-wrap';
      char.className = 'char';
      char.textContent = ch;
      wrap.appendChild(char);
      el.appendChild(wrap);
    });
  }

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

  function flashLetter(el) {
    const chars = el.querySelectorAll('.char');
    if (!chars.length) return;

    const idx = Math.floor(Math.random() * chars.length);
    const c = chars[idx];
    const isOutlineLine = el.classList.contains('line2');
    const flickerColor = isOutlineLine ? 'var(--text)' : 'var(--accent)';
    const flickerGlow = isOutlineLine ? 'rgba(232, 228, 240, 0.75)' : 'var(--accent)';

    c.style.transition = 'color 0.18s ease, text-shadow 0.18s ease';
    c.style.color = flickerColor;
    c.style.textShadow = `0 0 20px ${flickerGlow}`;

    setTimeout(() => {
      c.style.color = '';
      c.style.textShadow = '';
    }, 240 + Math.random() * 180);
  }

  function startFlicker(firstLine, secondLine) {
    setInterval(() => {
      flashLetter(firstLine);
      flashLetter(secondLine);
    }, 3000 + Math.random() * 1400);
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
          wrapChars(scramble1);
          wrapChars(scramble2);
          startFlicker(scramble1, scramble2);
        });
      }, 250);
    });
  }, 1100);
}
