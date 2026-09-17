/* BEGA — authored scroll choreography. Sprite pivots are measured coordinates
   from prototipo-scroll/assets/rig.json. Illustrative 2D assembly, not CAD. */
(() => {
  'use strict';
  const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const compactQuery = matchMedia('(max-height: 500px)');
  const chapterNodes = [...document.querySelectorAll('[data-scene]')];
  const machines = [...document.querySelectorAll('[data-machine]')].map(element => ({
    element, name: element.dataset.machine, canvas: element.querySelector('canvas'),
    context: element.querySelector('canvas').getContext('2d'), width: 1, height: 1
  }));
  const sprites = {
    base: { pivot: [233, 27] },
    lower: { pivot: [961, 71], end: [47, 92] },
    outer: { pivot: [594, 29], end: [29, 41] },
    extension: { pivot: [706, 24], end: [29, 24] },
    jib: { pivot: [353, 54], end: [30, 53] },
    basket: { pivot: [312, 136] }
  };
  const clamp = x => Math.max(0, Math.min(1, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (p, a, b) => { const t = clamp((p - a) / (b - a)); return t * t * (3 - 2 * t); };
  const radians = degrees => degrees * Math.PI / 180;
  let loaded = false, frame = 0, manualReduced = false;
  const simple = () => manualReduced || reducedQuery.matches || compactQuery.matches;
  const lastFrames = {};
  // Measured on the existing base sprite. Layers exist only in memory;
  // source PNGs and the earlier prototypes are never modified.
  const wheels = [
    {center:[86,240],radius:[71,73]},
    {center:[579,240],radius:[73,74]}
  ];
  function prepareRollingBase(){
    const source=sprites.base.image,chassis=document.createElement('canvas');
    chassis.width=source.width;chassis.height=source.height;
    const c=chassis.getContext('2d');c.drawImage(source,0,0);
    for(const wheel of wheels){
      const [x,y]=wheel.center,[rx,ry]=wheel.radius,r=76;
      c.save();c.globalCompositeOperation='destination-out';c.beginPath();
      c.ellipse(x,y,rx-.5,ry-.5,0,0,Math.PI*2);c.fill();c.restore();
      const layer=document.createElement('canvas');layer.width=layer.height=156;
      const w=layer.getContext('2d');w.translate(78,78);w.scale(r/rx,r/ry);
      w.beginPath();w.ellipse(0,0,rx,ry,0,0,Math.PI*2);w.clip();w.drawImage(source,-x,-y);
      wheel.image=layer;wheel.normalizedRadius=r;
    }
    sprites.base.chassis=chassis;
  }
  function drawRollingBase(ctx,state){
    const part=sprites.base,travel=state.wheelTravel||0;
    ctx.save();ctx.translate(...state.base);ctx.scale(.7,.7);ctx.translate(-part.pivot[0],-part.pivot[1]);
    ctx.drawImage(part.chassis,0,0);
    for(const wheel of wheels){
      const [rx,ry]=wheel.radius;
      ctx.save();ctx.translate(...wheel.center);ctx.scale(rx/wheel.normalizedRadius,ry/wheel.normalizedRadius);
      ctx.rotate(travel/(ry*.7));ctx.drawImage(wheel.image,-78,-78);ctx.restore();
    }
    ctx.restore();
  }

  function tipOf(name, origin, scale, angle) {
    const s = sprites[name], x = (s.end[0] - s.pivot[0]) * scale, y = (s.end[1] - s.pivot[1]) * scale;
    return [origin[0] + x * Math.cos(angle) - y * Math.sin(angle), origin[1] + x * Math.sin(angle) + y * Math.cos(angle)];
  }

  function choreography(kind, progress, still = false) {
    const p = clamp(progress);
    let baseX = 550, lower = 122, outer = -5, reach = 75, assembly = 1, enter = 1, exit = 0;
    if (!still && kind === 'hero') {
      enter = ease(p, 0, .17); assembly = ease(p, .09, .34);
      const present = ease(p, .30, .61), fold = ease(p, .75, .87);
      exit = ease(p, .85, 1);
      baseX += (1 - enter) * 205 + exit * 1120;
      lower = lerp(126, 120, present) + 27 * fold;
      outer = lerp(-23, -4, present) - 19 * fold;
      reach = lerp(0, 100, present) * (1 - fold);
    } else if (!still && kind === 'services') {
      enter = ease(p, 0, .22);
      baseX += (1 - enter) * 1250; // mirrored below: movement begins off the left edge
      lower = lerp(142, 121, ease(p, .15, .50));
      outer = lerp(-18, -4, ease(p, .22, .56));
      reach = lerp(10, 80, ease(p, .25, .58));
    } else if (!still && kind === 'contact') {
      baseX += (1 - ease(p, 0, .7)) * 350;
      lower = lerp(148, 135, ease(p, .1, .8)); outer = -16; reach = 20;
    }
    const a = radians(lower), b = radians(outer), base = [baseX, 495];
    const elbow = tipOf('lower', base, .45, a);
    const sleeveEnd = tipOf('outer', elbow, .6, b);
    const telescopeEnd = [sleeveEnd[0] - reach * Math.cos(b), sleeveEnd[1] - reach * Math.sin(b)];
    const basketAnchor = tipOf('jib', telescopeEnd, .30, 0);
    const assemblyOffsets = still || kind !== 'hero' ? [0, 0, 0] : [
      (1 - ease(p, .08, .21)) * 95,
      (1 - ease(p, .15, .28)) * 130,
      (1 - ease(p, .21, .34)) * 145
    ];
    return {p, base, elbow, sleeveEnd, telescopeEnd, basketAnchor, a, b, reach, assembly,
      assemblyOffsets, mirror:kind === 'services', enter, exit, wheelTravel:still?0:baseX-550};
  }

  function drawPart(ctx, name, position, scale, angle) {
    const part = sprites[name];
    ctx.save(); ctx.translate(position[0], position[1]); ctx.rotate(angle); ctx.scale(scale, scale);
    ctx.drawImage(part.image, -part.pivot[0], -part.pivot[1]); ctx.restore();
  }

  function paint(machine, state) {
    const ctx = machine.context, {width:w, height:h} = machine;
    const viewHeight=state.viewHeight||760,zoom=machine.name==='hero'?1.12:1;
    const ratio = Math.min(devicePixelRatio || 1, 2), scale = Math.min(w / 1000, h / viewHeight)*zoom;
    const xOffset = (w - scale * 1000) / 2, yOffset = (h - scale * viewHeight) / 2;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0); ctx.clearRect(0, 0, w, h);
    ctx.save(); ctx.translate(xOffset, yOffset); ctx.scale(scale, scale);
    if (state.mirror) { ctx.translate(1000, 0); ctx.scale(-1, 1); }
    const [o1, o2, o3] = state.assemblyOffsets;
    // The telescoping member is clipped at the mouth of the outer sleeve.
    // Its concealed portion never pokes through the rear articulation.
    ctx.save();ctx.translate(state.telescopeEnd[0], state.telescopeEnd[1] - o2);ctx.rotate(state.b);
    ctx.beginPath();ctx.rect(-7, -24, state.reach + 13, 48);ctx.clip();ctx.scale(.6, .6);
    ctx.drawImage(sprites.extension.image, -29, -24);ctx.restore();
    drawPart(ctx, 'outer', [state.elbow[0], state.elbow[1] - o2], .6, state.b);
    drawPart(ctx, 'lower', [state.base[0], state.base[1] - o1], .45, state.a);
    drawRollingBase(ctx,state);
    drawPart(ctx, 'jib', [state.telescopeEnd[0], state.telescopeEnd[1] - o3], .30, 0);
    drawPart(ctx, 'basket', [state.basketAnchor[0], state.basketAnchor[1] - o3], .6, 0);
    ctx.restore();
    const basketEdge = state.basketAnchor[0] - 187;
    const tip = [(state.mirror ? 1000 - basketEdge : basketEdge) * scale + xOffset,
      (state.basketAnchor[1] - o3 - 40) * scale + yOffset];
    lastFrames[machine.name] = {...state, basketTip:tip, size:[w,h],scale,baseScreen:[(state.mirror?1000-state.base[0]:state.base[0])*scale+xOffset,state.base[1]*scale+yOffset]};
    return tip;
  }

  function chapterProgress(section) {
    const top=Number.parseFloat(getComputedStyle(section.querySelector('.scene-stage')).top)||0;
    return clamp((top-section.getBoundingClientRect().top) / Math.max(1, section.offsetHeight - innerHeight + top));
  }

  function traceToHeading(section, machine, basketTip, progress, still) {
    const stage = section.querySelector('.scene-stage'), svg = section.querySelector('.scene-trace');
    if (still) {svg.style.opacity = '0';return;}
    const target = section.querySelector('[data-trace-target]');
    const stageBox = stage.getBoundingClientRect(), machineBox = machine.element.getBoundingClientRect(), targetBox = target.getBoundingClientRect();
    const start = [machineBox.left - stageBox.left + basketTip[0], machineBox.top - stageBox.top + basketTip[1]];
    const reveal = section.dataset.scene === 'hero' ? ease(progress,.30,.61) : ease(progress,.23,.55);
    const end = [targetBox.left-stageBox.left + targetBox.width * reveal, targetBox.top-stageBox.top+1];
    const gutter = section.dataset.scene === 'hero' ? machineBox.left-stageBox.left-8 : machineBox.right-stageBox.left+10;
    // Route through the gap between columns and along the title underline.
    svg.querySelector('path').setAttribute('d',`M ${start[0]} ${start[1]} L ${gutter} ${start[1]} L ${gutter} ${end[1]} L ${end[0]} ${end[1]}`);
    const visibility=section.dataset.scene==='hero'?ease(progress,.29,.34)*(1-ease(progress,.72,.80)):ease(progress,.22,.28)*(1-ease(progress,.70,.85));
    svg.style.opacity=String(visibility);
  }

  function render() {
    frame = 0; if (!loaded) return;
    const still = simple();
    for (const section of chapterNodes) {
      const kind=section.dataset.scene, machine=machines.find(m=>m.name===kind), p=chapterProgress(section);
      const state=choreography(kind,p,still), basketTip=paint(machine,state);
      const reveal=still?1:kind==='hero'?ease(p,.30,.61):ease(p,.23,.55);
      section.style.setProperty('--reveal',reveal);
      section.style.setProperty('--reveal-pct',`${reveal*100}%`);
      section.style.setProperty('--progress',p);
      section.style.setProperty('--label-opacity',still?1:ease(p,.30,.42)*(1-ease(p,.80,.91)));
      section.querySelectorAll('.service-list article').forEach((row,i)=>{
        const t=still?1:ease(p,.38+i*.09,.52+i*.09);
        row.style.setProperty('--row-opacity',lerp(.45,1,t));row.style.setProperty('--row-y',`${18*(1-t)}px`);
      });
      traceToHeading(section,machine,basketTip,p,still);
    }
    const contact=machines.find(m=>m.name==='contact'), rect=document.querySelector('#contacto').getBoundingClientRect();
    let contactState=choreography('contact',clamp((innerHeight-rect.top)/(innerHeight+rect.height*.25)),still);
    if(window.begaContactGuide)contactState=window.begaContactGuide.pose(contactState,still);
    const contactTip=paint(contact,contactState);
    window.begaContactGuide?.position(contact,contactTip,still);
  }

  function schedule(){if(!frame)frame=requestAnimationFrame(render);}
  function resize(){
    if(!loaded)return;
    document.body.classList.toggle('simple-motion',simple());
    document.body.classList.toggle('user-reduced-motion',manualReduced||reducedQuery.matches);
    document.dispatchEvent(new Event('bega:motion-mode'));
    const button=document.querySelector('.motion-toggle');
    button.setAttribute('aria-pressed',String(manualReduced||reducedQuery.matches));
    button.textContent=reducedQuery.matches?'Movimiento reducido':manualReduced?'Activar movimiento':'Reducir movimiento';
    button.disabled=reducedQuery.matches;
    for(const machine of machines){
      const bounds=machine.canvas.getBoundingClientRect(), ratio=Math.min(devicePixelRatio||1,2);
      machine.width=Math.max(1,bounds.width);machine.height=Math.max(1,bounds.height);
      machine.canvas.width=Math.round(machine.width*ratio);machine.canvas.height=Math.round(machine.height*ratio);
    }
    schedule();
  }

  if(machines.some(m=>!m.context))return;
  Promise.all(Object.entries(sprites).map(([name,sprite])=>new Promise((resolve,reject)=>{
    const image=new Image();image.onload=()=>{sprite.image=image;resolve();};image.onerror=reject;image.src=`assets/machine/${name}.png`;
  }))).then(()=>{
    prepareRollingBase();loaded=true;document.body.classList.add('motion-ready');resize();
    // The renderer only requests a frame after an input or a layout change.
    addEventListener('scroll',schedule,{passive:true});addEventListener('resize',resize,{passive:true});
    reducedQuery.addEventListener('change',resize);compactQuery.addEventListener('change',resize);
    document.addEventListener('bega:gallery-change',schedule);
    document.addEventListener('bega:contact-focus',schedule);
    document.querySelector('.motion-toggle').addEventListener('click',()=>{
      const current=chapterNodes.find(s=>{const r=s.getBoundingClientRect();return r.top<=100&&r.bottom>100;})||document.querySelector('#inicio');
      manualReduced=!manualReduced;resize();current.scrollIntoView({behavior:'instant',block:'start'});
    });
    const observer=new ResizeObserver(resize);machines.forEach(m=>observer.observe(m.element));
  }).catch(()=>{document.body.classList.add('asset-fallback');});
  // Non-mutating diagnostics for local QA, not part of the public interface.
  window.begaMotion={get ready(){return loaded;},get frames(){return lastFrames;},pose:choreography};
})();
