// Scramble reveal animation for headings inspired by reference site
function scrambleText(element) {
  if (element.classList.contains('scrambled')) return;
  element.classList.add('scrambled');

  const textElements = element.querySelectorAll('.line-text');
  if (!textElements.length) return;

  const glyphs = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%-+=✦';

  textElements.forEach((node, nodeIdx) => {
    function wrapTextNodes(el) {
      const childNodes = [...el.childNodes];
      childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent;
          const fragment = document.createDocumentFragment();
          [...text].forEach(char => {
            const span = document.createElement('span');
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.transition = 'opacity 0.25s ease';
            span.textContent = char === ' ' ? '\u00A0' : char;
            fragment.appendChild(span);
          });
          child.replaceWith(fragment);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          wrapTextNodes(child);
        }
      });
    }

    node.style.opacity = '1';
    wrapTextNodes(node);

    const spans = node.querySelectorAll('span');
    spans.forEach((span, charIdx) => {
      const finalChar = span.textContent;
      if (finalChar === '\u00A0') {
        span.style.opacity = '1';
        return;
      }

      // Slower, more pronounced decrypt animation so it is clearly visible
      setTimeout(() => {
        span.style.opacity = '1';
        let iterations = 0;
        const maxIterations = 14; // Scramble more times
        
        const interval = setInterval(() => {
          if (iterations >= maxIterations) {
            clearInterval(interval);
            span.textContent = finalChar;
          } else {
            span.textContent = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
            iterations++;
          }
        }, 50); // Slower interval
      }, (nodeIdx * 200) + (charIdx * 35)); // Stagger delay
    });
  });
}

export function initScroll() {
  // Generic reveal on scroll
  const items = document.querySelectorAll('.reveal, .reveal-left, .text-reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        if (e.target.classList.contains('text-reveal')) {
          scrambleText(e.target);
        }
      }
    });
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

  // Image Crop Scroll Reveal matching reference
  (function initImageScrollReveal() {
    const photoWrap = document.querySelector('.about-image-wrap');
    const container = document.querySelector('.photo-container');
    const img = document.querySelector('.about-photo');
    const aboutEl = document.getElementById('about');
    if (!photoWrap || !container || !img || !aboutEl) return;

    let targetProgress = 0;
    let currentProgress = 0;
    let animFrameId = null;
    let isLocked = false;
    let lockedScrollY = 0;

    function applyRevealStyles(progress) {
      const rightPercent = (1 - progress) * 100;
      const bottomPercent = (1 - progress) * 100;
      const scale = 1.2 - progress * 0.2;

      container.style.clipPath = `inset(0% ${rightPercent}% ${bottomPercent}% 0%)`;
      img.style.transform = `scale(${scale})`;
    }

    function lockScroll(scrollY) {
      isLocked = true;
      lockedScrollY = scrollY;
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, lockedScrollY);
    }

    function unlockScroll() {
      isLocked = false;
      document.documentElement.style.scrollBehavior = '';
    }

    // Tick function to smoothly interpolate (lerp) the reveal progress
    function tick() {
      const diff = targetProgress - currentProgress;
      currentProgress += diff * 0.08;

      applyRevealStyles(currentProgress);

      if (Math.abs(diff) > 0.0001) {
        animFrameId = requestAnimationFrame(tick);
      } else {
        currentProgress = targetProgress;
        animFrameId = null;
      }
    }

    function triggerTick() {
      if (!animFrameId) {
        animFrameId = requestAnimationFrame(tick);
      }
    }

    // Scroll listener to enforce locked scroll position and handle mobile scroll
    window.addEventListener('scroll', () => {
      if (isLocked) {
        window.scrollTo(0, lockedScrollY);
        return;
      }

      const isMobile = window.innerWidth <= 900;
      if (isMobile) {
        // On mobile, use standard viewport-relative scroll reveal
        const rect = photoWrap.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.85;
        const end = vh * 0.15;
        const p = (start - rect.top) / (start - end);
        targetProgress = Math.max(0, Math.min(1, p));
        triggerTick();
      }
    }, { passive: false });

    // Intercept wheel event on desktop for scroll locking
    window.addEventListener('wheel', (e) => {
      const isMobile = window.innerWidth <= 900;
      if (isMobile) return;

      const rect = aboutEl.getBoundingClientRect();
      const scrollDown = e.deltaY > 0;

      if (!isLocked) {
        // Lock when scrolling down and top of #about reaches viewport top
        if (scrollDown && rect.top <= 15 && rect.top > -300 && targetProgress < 1) {
          lockScroll(window.pageYOffset + rect.top);
          targetProgress = 0;
          e.preventDefault();
        }
        // Lock when scrolling up and top of #about aligns back to viewport top
        else if (!scrollDown && rect.top >= -15 && rect.top < 300 && targetProgress > 0) {
          lockScroll(window.pageYOffset + rect.top);
          targetProgress = 1;
          e.preventDefault();
        }
        return;
      }

      // If locked, prevent scroll and update progress
      e.preventDefault();
      
      const step = e.deltaY * 0.0018; // Scroll reveal speed step
      targetProgress = Math.max(0, Math.min(1, targetProgress + step));
      triggerTick();

      // Check unlock conditions
      if (targetProgress >= 1 && e.deltaY > 0) {
        unlockScroll();
      } else if (targetProgress <= 0 && e.deltaY < 0) {
        unlockScroll();
      }
    }, { passive: false });

    // Intercept navigation keys when locked
    window.addEventListener('keydown', (e) => {
      if (isLocked) {
        const keys = ['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'End', 'Home'];
        if (keys.includes(e.code) || [32, 33, 34, 35, 36, 38, 40].includes(e.keyCode)) {
          e.preventDefault();
        }
      }
    }, { passive: false });

    // Intercept touch events on desktop for touchpads / touchscreens
    let touchStartY = 0;
    
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      const isMobile = window.innerWidth <= 900;
      if (isMobile || e.touches.length !== 1) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY; // Positive when scrolling down
      const scrollDown = deltaY > 0;
      const rect = aboutEl.getBoundingClientRect();

      if (!isLocked) {
        if (scrollDown && rect.top <= 15 && rect.top > -300 && targetProgress < 1) {
          lockScroll(window.pageYOffset + rect.top);
          targetProgress = 0;
          touchStartY = touchY;
          e.preventDefault();
        }
        else if (!scrollDown && rect.top >= -15 && rect.top < 300 && targetProgress > 0) {
          lockScroll(window.pageYOffset + rect.top);
          targetProgress = 1;
          touchStartY = touchY;
          e.preventDefault();
        }
        return;
      }

      e.preventDefault();
      const step = deltaY * 0.0035; // Touch reveal speed step
      targetProgress = Math.max(0, Math.min(1, targetProgress + step));
      touchStartY = touchY;
      triggerTick();

      if (targetProgress >= 1 && deltaY > 0) {
        unlockScroll();
      } else if (targetProgress <= 0 && deltaY < 0) {
        unlockScroll();
      }
    }, { passive: false });

    // Window resize handler to release locks and reset positions
    window.addEventListener('resize', () => {
      unlockScroll();
      const isMobile = window.innerWidth <= 900;
      if (isMobile) {
        const rect = photoWrap.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.85;
        const end = vh * 0.15;
        const p = (start - rect.top) / (start - end);
        targetProgress = Math.max(0, Math.min(1, p));
      } else {
        const rect = aboutEl.getBoundingClientRect();
        targetProgress = rect.top < 0 ? 1 : 0;
      }
      currentProgress = targetProgress;
      applyRevealStyles(currentProgress);
    }, { passive: true });

    // Initialize once on load
    const isMobile = window.innerWidth <= 900;
    if (isMobile) {
      const rect = photoWrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.15;
      targetProgress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
    } else {
      const rect = aboutEl.getBoundingClientRect();
      targetProgress = rect.top < 0 ? 1 : 0;
    }
    currentProgress = targetProgress;
    applyRevealStyles(currentProgress);
  })();

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
    if (scrolled) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}
