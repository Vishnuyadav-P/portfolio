export function initLoader() {
  const loader   = document.getElementById('loader');
  const bar      = document.getElementById('loader-bar');
  const pctEl    = document.getElementById('loader-pct');
  let pct = 0;

  function hide() {
    loader.style.transition  = 'opacity .6s ease';
    loader.style.opacity     = '0';
    loader.style.visibility  = 'hidden';
    setTimeout(() => { loader.style.display = 'none'; }, 650);
  }

  const iv = setInterval(() => {
    try {
      pct += Math.random() * 18 + 4;
      if (pct >= 100) {
        pct = 100;
        clearInterval(iv);
        if (bar)   bar.style.width      = '100%';
        if (pctEl) pctEl.textContent    = '100%';
        setTimeout(hide, 350);
        return;
      }
      if (bar)   bar.style.width    = pct + '%';
      if (pctEl) pctEl.textContent  = Math.floor(pct) + '%';
    } catch (_) {}
  }, 80);

  // failsafe
  setTimeout(hide, 3000);
}
