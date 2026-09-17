/* Revisión 09 — micro-interacciones aditivas: inclinación por cursor en
   tarjetas y conteo de cifras al entrar en vista. No toca el rig ni las
   coreografías de scroll existentes. Respeta prefers-reduced-motion y se
   desactiva por completo en pantallas táctiles. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fineHover = matchMedia('(hover: hover) and (pointer: fine)');

  // --- Inclinación suave sobre tarjetas (solo mouse/trackpad) ---
  function attachTilt(selector, maxDeg) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('pointermove', event => {
        if (!fineHover.matches || reduced.matches) return;
        const r = card.getBoundingClientRect();
        const px = (event.clientX - r.left) / r.width - .5;
        const py = (event.clientY - r.top) / r.height - .5;
        card.style.setProperty('--tilt-y', `${(px * maxDeg * 2).toFixed(2)}deg`);
        card.style.setProperty('--tilt-x', `${(py * -maxDeg * 2).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }
  attachTilt('.equipment-item', 2.2);
  attachTilt('.principles article', 1.4);

  // --- Conteo de cifras (alturas de equipos) al entrar en vista, una vez ---
  function countUp(strong) {
    if (reduced.matches) return;
    const nodes = [...strong.childNodes].filter(n => n.nodeType === 3 && /\d/.test(n.textContent));
    if (!nodes.length) return;
    const targets = nodes.map(n => ({ node: n, value: parseInt(n.textContent, 10), text: n.textContent }));
    if (targets.some(t => Number.isNaN(t.value))) return;
    const duration = 900, start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      targets.forEach(target => {
        target.node.textContent = target.text.replace(/\d+/, String(Math.round(target.value * eased)));
      });
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const counters = [...document.querySelectorAll('.measurement strong')];
  if (counters.length && 'IntersectionObserver' in window) {
    const seen = new WeakSet();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !seen.has(entry.target)) {
          seen.add(entry.target);
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .6 });
    counters.forEach(node => observer.observe(node));
  }
})();
