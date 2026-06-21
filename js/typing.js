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

// Scramble reveal animation on hero name
export function initHeroName() {
  const scramble1 = document.getElementById('scramble-1');
  const scramble2 = document.getElementById('scramble-2');
  if (!scramble1 || !scramble2) return;

  const firstText = scramble1.textContent.trim() || "VISHNU";
  const secondText = scramble2.textContent.trim() || "VARDHAN";
  const glyphs = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%-+=✦';

  function scrambleLine(el, text, onComplete) {
    el.innerHTML = '';
    
    // Create characters with .char class so the flashing sweep still works
    const charElements = [...text].map(char => {
      const span = document.createElement('span');
      span.className = 'char';
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      span.style.transition = 'opacity 0.25s ease';
      span.textContent = char;
      el.appendChild(span);
      return { el: span, finalChar: char };
    });

    // Stagger character scramble reveals
    charElements.forEach((charObj, charIdx) => {
      setTimeout(() => {
        charObj.el.style.opacity = '1';
        let iterations = 0;
        const maxIterations = 14;
        
        const interval = setInterval(() => {
          if (iterations >= maxIterations) {
            clearInterval(interval);
            charObj.el.textContent = charObj.finalChar;
          } else {
            charObj.el.textContent = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
            iterations++;
          }
        }, 45);
      }, charIdx * 65);
    });

    if (onComplete) {
      setTimeout(onComplete, (text.length * 65) + 600);
    }
  }

  function flashChar(el, color, glow) {
    const chars = el.querySelectorAll('.char');
    if (!chars.length) return;

    const char = chars.item(Math.floor(Math.random() * chars.length));
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

  const heroName = scramble1.closest('.hero-name');
  scramble1.textContent = '';
  scramble2.textContent = '';

  setTimeout(() => {
    scrambleLine(scramble1, firstText, () => {
      setTimeout(() => {
        scrambleLine(scramble2, secondText, () => {
          heroName?.classList.add('is-loaded');
          startLetterFlash(scramble1, scramble2);
        });
      }, 250);
    });
  }, 1100);
}
