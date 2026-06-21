export function initLoader() {
  const loader   = document.getElementById('loader');
  const bar      = document.getElementById('loader-bar');
  const pctEl    = document.getElementById('loader-pct');
  const nameEl   = document.querySelector('.loader-name');
  let pct = 0;

  const originalName = "VISHNU";
  const glyphs = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%-+=✦';

  function updateName(progress) {
    if (!nameEl) return;
    // Map progress (0-100) to locked letters count (0-6)
    const lockedCount = Math.floor((progress / 100) * originalName.length);
    let nameStr = '';
    for (let i = 0; i < originalName.length; i++) {
      if (i < lockedCount) {
        nameStr += originalName.charAt(i);
      } else {
        nameStr += glyphs.charAt(Math.floor(Math.random() * glyphs.length));
      }
    }
    nameEl.textContent = nameStr;
  }

  function hide() {
    loader.style.transition  = 'opacity .6s ease';
    loader.style.opacity     = '0';
    loader.style.visibility  = 'hidden';
    setTimeout(() => { loader.style.display = 'none'; }, 650);
  }

  // Initial scramble
  updateName(0);

  const iv = setInterval(() => {
    try {
      pct += Math.random() * 18 + 4;
      if (pct >= 100) {
        pct = 100;
        clearInterval(iv);
        if (bar)   bar.style.width      = '100%';
        if (pctEl) pctEl.textContent    = '100%';
        updateName(100);
        setTimeout(hide, 350);
        return;
      }
      if (bar)   bar.style.width    = pct + '%';
      if (pctEl) pctEl.textContent  = Math.floor(pct) + '%';
      updateName(pct);
    } catch (_) {}
  }, 80);

  // failsafe
  setTimeout(() => {
    updateName(100);
    hide();
  }, 3000);
}
