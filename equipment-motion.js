/* BEGA — animación de los equipos en #equipos (revisión 13, ajustada tras
   la primera revisión de Kevin).
   Motores de pose portados literalmente de los kits que Kevin generó con
   ChatGPT/Astra (rig-engine.js de "elevador-anaranjado" y "elevador-rojo").
   No se reinterpretan los pivotes ni los ángulos: solo se adapta la carga
   de imágenes, el ajuste al lienzo de cada tarjeta y la interacción.

   Kevin pidió, tras ver la primera versión: (1) equipos más grandes dentro
   de su tarjeta, y (2) que no sea un recorrido en bucle ("como un video
   repetitivo"), sino que el equipo responda a dónde se mueve el mouse —
   el articulado sigue la posición del mouse con el brazo, y la tijera
   sube y baja según el mouse suba o baje. Por eso ya no hay una fórmula
   de tiempo (t) animando solo: la pose depende de la posición del puntero
   dentro de la tarjeta, con una transición suave hacia esa posición y de
   vuelta a un reposo prolijo cuando el mouse sale. En pantallas táctiles,
   sin mouse, se muestra el equipo ensamblado en una pose de reposo fija
   (igual que ya hacen los logos de clientes, cuyo hover también se
   reserva a mouse/trackpad). Capa aditiva: no depende de animation.js. */
(() => {
  'use strict';
  const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const fineHoverQuery = matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  const mix = (a, b, t) => a + (b - a) * t;
  const rad = d => d * Math.PI / 180;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const rotateVec = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];

  /* --- Motor "elevador articulado" (naranja), portado de rig-engine.js --- */
  function buildOrangeEngine(defs) {
    function endpoint(node) {
      const d = defs[node.id];
      return add(node.pos, rotateVec([(d.tip[0] - d.pivot[0]) * node.scale, (d.tip[1] - d.pivot[1]) * node.scale], node.angle));
    }
    function node(id, pos, angle = 0) { return { id, pos, angle, scale: defs[id].displayScale }; }
    function axis(id) { const d = defs[id]; return Math.atan2(d.tip[1] - d.pivot[1], d.tip[0] - d.pivot[0]); }
    function pose(options = {}) {
      const e = clamp(options.elevation ?? .65), ext = clamp(options.extension ?? .42);
      const jibDeg = clamp(options.jib ?? 65, 35, 80), wheelDeg = options.wheel ?? 0;
      const origin = [450, 720], c = node('chasis', [300, 931]), hood = node('carcasa', origin);
      const lower = node('brazo_inferior', origin, rad(mix(-10, -32, e)) - axis('brazo_inferior'));
      const elbow1 = endpoint(lower);
      const middle = node('brazo_intermedio', elbow1, rad(mix(5, 28, e)));
      const elbow2 = endpoint(middle);
      const upper = node('camisa_telescopica', elbow2, rad(mix(-2, -12, e)) - axis('camisa_telescopica'));
      const sleeve = endpoint(upper), exposure = mix(50, 250, ext);
      const distal = add(sleeve, rotateVec([exposure, 0], upper.angle));
      const extension = node('extension', distal, upper.angle);
      extension.clipExposure = exposure;
      const jib = node('jib', distal, rad(jibDeg) - axis('jib'));
      const basketPos = endpoint(jib), basket = node('canastilla', basketPos, 0);
      const cylinderBase = add(origin, [-25, 45]);
      const cylinderEnd = [mix(origin[0], elbow1[0], .64), mix(origin[1], elbow1[1], .64)];
      const ca = Math.atan2(cylinderEnd[1] - cylinderBase[1], cylinderEnd[0] - cylinderBase[0]);
      const barrel = node('cilindro', cylinderBase, ca), rod = node('vastago', cylinderEnd, ca);
      const left = node('rueda_izquierda', [145, 1101], rad(wheelDeg));
      const right = node('rueda_derecha', [542, 1101], rad(wheelDeg));
      return { nodes: [c, extension, upper, middle, lower, rod, barrel, jib, hood, left, right, basket], width: 1600, height: 1260 };
    }
    return { pose };
  }

  /* --- Motor "elevador de tijera" (rojo), portado de rig-engine.js --- */
  function buildRedEngine(defs) {
    function node(id, pos, scale, angle = 0, key = id) { return { id, key, pos, scale, angle }; }
    function pose(o = {}) {
      const e = clamp(o.elevation ?? .5), theta = (8 + 50 * e) * Math.PI / 180, L = 220;
      const w = L * Math.cos(theta), h = L * Math.sin(theta), left = 490, bottom = 1340, top = bottom - 6 * h;
      const bars = [];
      for (let i = 0; i < 6; i++) {
        const y = bottom - i * h;
        bars.push(node('barra_b', [left, y - h], L / 653, theta, 'B' + (i + 1)));
        bars.push(node('barra_a', [left, y], L / 654, -theta, 'A' + (i + 1)));
      }
      const ca = [left + 15, bottom + 25], cb = [left + w * .7, bottom - h * .7];
      const angle = Math.atan2(cb[1] - ca[1], cb[0] - ca[0]);
      const nodes = [node('chasis', [455, 1340], .5), ...bars,
        node('vastago', cb, .19, angle), node('cilindro', ca, .17, angle),
        node('escalera', [450, 1325], .37),
        node('rueda_izquierda', [483, 1419], .4, 0),
        node('rueda_derecha', [765, 1419], .4, 0),
        node('plataforma', [455, top], .55), node('control', [760, top - 92], .20)];
      return { nodes, width: 1200, height: 1600 };
    }
    return { pose };
  }

  /* Poses de reposo: se muestran al cargar, en pantallas táctiles y cuando
     el mouse sale de la tarjeta. Elegidas para verse bien detenidas, no
     solo como paso intermedio de una animación. */
  const REST = {
    articulado: { elevation: .55, extension: .38, jib: 62, wheel: 0 },
    tijera: { elevation: .46 }
  };

  function drawNode(ctx, defs, n) {
    const d = defs[n.id];
    if (!d.image) return;
    ctx.save();
    ctx.translate(n.pos[0], n.pos[1]);
    ctx.rotate(n.angle);
    ctx.scale(n.scale, n.scale);
    if (n.id === 'extension' && n.clipExposure != null) {
      ctx.beginPath();
      ctx.rect(-(n.clipExposure + 20) / n.scale, -d.pivot[1] - 10, (n.clipExposure + 20) / n.scale + d.size[0] - d.pivot[0] + 12, d.size[1] + 20);
      ctx.clip();
    }
    ctx.drawImage(d.image, -d.pivot[0], -d.pivot[1]);
    ctx.restore();
  }

  function setupRig(canvas, rigName) {
    const rigDef = rigName === 'articulado' ? window.BEGA_ORANGE_RIG : window.BEGA_RED_RIG;
    if (!rigDef) return;
    const defs = Object.fromEntries(rigDef.parts.map(p => [p.id, { ...p }]));
    const engine = rigName === 'articulado' ? buildOrangeEngine(defs) : buildRedEngine(defs);
    const rest = REST[rigName];
    const figure = canvas.closest('.equipment-photo');
    const ctx = canvas.getContext('2d');
    let ready = false, raf = 0, current = { ...rest }, target = { ...rest }, hovering = false;

    function paint(pose) {
      const state = engine.pose(pose);
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio || 1, 2);
      const w = Math.max(1, rect.width), h = Math.max(1, rect.height);
      canvas.width = Math.round(w * ratio); canvas.height = Math.round(h * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const scale = Math.min(w / state.width, h / state.height) * .99;
      const xOffset = (w - scale * state.width) / 2, yOffset = (h - scale * state.height) / 2;
      ctx.save(); ctx.translate(xOffset, yOffset); ctx.scale(scale, scale);
      for (const n of state.nodes) drawNode(ctx, defs, n);
      ctx.restore();
      if (!ready) { ready = true; figure.classList.add('equipos-ready'); }
    }

    function settled() {
      return Object.keys(rest).every(k => Math.abs(current[k] - target[k]) < .0015);
    }
    function loop() {
      raf = 0;
      const easedOut = reducedQuery.matches;
      for (const k of Object.keys(rest)) current[k] = easedOut ? target[k] : mix(current[k], target[k], .18);
      paint(current);
      if (hovering || !settled()) raf = requestAnimationFrame(loop);
    }
    function schedule() { if (!raf) raf = requestAnimationFrame(loop); }

    function setTargetFromPointer(event) {
      const rect = canvas.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / rect.width);
      const y = clamp((event.clientY - rect.top) / rect.height);
      if (rigName === 'articulado') {
        target = { elevation: 1 - y, extension: x, jib: mix(50, 76, x), wheel: 0 };
      } else {
        target = { elevation: 1 - y };
      }
      schedule();
    }

    if (fineHoverQuery.matches) {
      canvas.style.cursor = 'crosshair';
      canvas.addEventListener('pointerenter', () => { hovering = true; });
      canvas.addEventListener('pointermove', setTargetFromPointer);
      canvas.addEventListener('pointerleave', () => { hovering = false; target = { ...rest }; schedule(); });
    } else {
      // Revisión 15: Kevin pidió que, en el teléfono, el equipo responda al
      // arrastrar el dedo igual que responde al mouse en escritorio. Solo se
      // activa mientras el dedo está presionado sobre el lienzo (no al
      // simplemente tocar o pasar por encima), y solo ahí se evita que ese
      // gesto haga scroll de la página: fuera del lienzo, el scroll normal
      // de la página sigue intacto.
      let dragging = false;
      const endDrag = () => {
        if (!dragging) return;
        dragging = false; hovering = false; target = { ...rest }; schedule();
      };
      canvas.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'touch') return;
        dragging = true; hovering = true;
        canvas.setPointerCapture?.(event.pointerId);
        setTargetFromPointer(event);
      });
      canvas.addEventListener('pointermove', event => {
        if (!dragging || event.pointerType !== 'touch') return;
        event.preventDefault();
        setTargetFromPointer(event);
      }, { passive: false });
      canvas.addEventListener('pointerup', endDrag);
      canvas.addEventListener('pointercancel', endDrag);
    }
    new ResizeObserver(() => { if (ready) paint(current); }).observe(canvas);
    fineHoverQuery.addEventListener?.('change', () => { if (!fineHoverQuery.matches) { hovering = false; target = { ...rest }; schedule(); } });

    Promise.all(rigDef.parts.map(p => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => { defs[p.id].image = image; resolve(); };
      image.onerror = reject;
      image.src = p.file;
    }))).then(() => { paint(current); }).catch(() => { /* la fotografía original queda visible */ });
  }

  document.querySelectorAll('canvas[data-rig]').forEach(canvas => setupRig(canvas, canvas.dataset.rig));
})();
