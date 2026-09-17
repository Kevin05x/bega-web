/* Original DOM-based perspective wall. References inform the visual behavior;
   no component source, framework, animation library or timed autoplay is used. */
(() => {
  'use strict';
  const section=document.querySelector('#proyectos');
  const stage=section.querySelector('.projects-stage');
  const viewport=section.querySelector('.wall-viewport');
  const wall=document.querySelector('#gallery');
  const photographs=[...wall.querySelectorAll('.project-photo')];
  const modeButton=section.querySelector('.gallery-mode');
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const narrow=matchMedia('(max-height: 500px)');
  const phone=matchMedia('(max-width: 680px)');
  let frame=0,gridMode=false,pointerX=0,pointerY=0,lastProgress=0,nearby=false;
  const loadSeries=()=>{if(nearby)photographs.filter(photo=>!photo.hidden).forEach(photo=>{photo.querySelector('img').loading='eager';});};
  const stash=document.createElement('div');stash.hidden=true;
  const columns=Array.from({length:3},()=>{const column=document.createElement('div');column.className='drift-column';return column;});
  wall.append(...columns,stash);
  const clamp=x=>Math.min(1,Math.max(0,x));
  const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
  const reduced=()=>media.matches||document.body.classList.contains('user-reduced-motion');
  const active=()=>!gridMode&&!reduced()&&!narrow.matches;

  function arrange(){
    let i=0;
    photographs.forEach(photo=>{
      photo.style.removeProperty('--drift');
      if(photo.hidden)stash.append(photo);
      else columns[i++%(phone.matches?2:3)].append(photo);
    });
    section.classList.toggle('three-photos',i<=3);
    loadSeries();
    schedule();
  }

  function setMode(grid,keepPosition=true){
    const wasInView=section.getBoundingClientRect().top<innerHeight&&section.getBoundingClientRect().bottom>0;
    gridMode=grid;refresh();
    if(keepPosition&&wasInView)section.scrollIntoView({block:'start',behavior:'instant'});
  }

  function refresh(){
    const on=active();section.classList.toggle('wall-active',on);
    section.classList.toggle('wall-grid',!on);
    document.body.classList.toggle('visual-motion',!reduced());
    modeButton.hidden=narrow.matches||reduced();
    modeButton.setAttribute('aria-pressed',String(gridMode));
    modeButton.innerHTML=gridMode?'Volver al muro <span aria-hidden="true">↗</span>':'Ver cuadrícula <span aria-hidden="true">↗</span>';
    section.querySelector('.wall-hint').textContent=on?(phone.matches?'DESLIZA PARA RECORRER · TOCA PARA AMPLIAR':'DESPLÁZATE PARA RECORRER · ACERCA EL CURSOR PARA EXPLORAR'):'FOTOGRAFÍAS DE NUESTROS TRABAJOS';
    schedule();
  }

  function render(){
    frame=0;
    if(active()){
      const box=section.getBoundingClientRect();
      const offset=parseFloat(getComputedStyle(stage).top)||0;
      const p=clamp((offset-box.top)/(section.offsetHeight-innerHeight+offset));lastProgress=p;
      const depth=smooth(p/.22);
      wall.style.setProperty('--pitch',`${10-depth*5+pointerY*2}deg`);
      wall.style.setProperty('--yaw',`${-12+p*18+pointerX*4}deg`);
      wall.style.setProperty('--roll',`${-3+p*5}deg`);
      wall.style.setProperty('--wall-scale',String(.91+depth*.05));
      wall.style.setProperty('--pan-x',`${pointerX*15}px`);
      columns.forEach((column,i)=>{
        const overflow=Math.max(0,column.scrollHeight-viewport.clientHeight+55);
        const travel=overflow||110;
        const y=overflow?(i===1?-(1-p)*travel:-p*travel):(i===1?(p-.5)*110:(.5-p)*110);
        column.style.transform=`translate3d(0,${y}px,${i===1?20:0}px)`;
      });
      stage.style.setProperty('--wall-progress',p);
    }else{
      wall.style.removeProperty('--pitch');wall.style.removeProperty('--yaw');wall.style.removeProperty('--roll');wall.style.removeProperty('--wall-scale');wall.style.removeProperty('--pan-x');
      columns.forEach(column=>column.style.transform='none');
    }
    // Section introductions and panel entrances also respond to scroll.
    const still=reduced();
    document.querySelectorAll('.equipment-item,.principles article,.field-stack').forEach((node,i)=>{
      let documentTop=0;
      for(let parent=node;parent;parent=parent.offsetParent)documentTop+=parent.offsetTop;
      const p=still?1:smooth((innerHeight-(documentTop-scrollY))/(innerHeight*.65));
      node.style.setProperty('--entrance',p);
      node.style.setProperty('--entrance-x',`${still?0:(1-p)*(i%2?-45:45)}px`);
      node.style.setProperty('--entrance-y',`${still?0:(1-p)*55}px`);
    });
  }

  function schedule(){if(!frame)frame=requestAnimationFrame(render);}
  modeButton.addEventListener('click',()=>setMode(!gridMode));
  viewport.addEventListener('pointermove',event=>{
    if(event.pointerType!=='mouse'||!active())return;
    const r=viewport.getBoundingClientRect();pointerX=(event.clientX-r.left)/r.width-.5;pointerY=(event.clientY-r.top)/r.height-.5;schedule();
  });
  viewport.addEventListener('pointerleave',()=>{pointerX=pointerY=0;schedule();});
  wall.addEventListener('focusin',event=>{if(event.target.closest('[data-photo]')&&active()&&event.target.matches(':focus-visible'))setMode(true,false);});
  document.addEventListener('bega:gallery-change',arrange);
  document.addEventListener('bega:motion-mode',refresh);
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',refresh,{passive:true});
  media.addEventListener('change',refresh);narrow.addEventListener('change',refresh);
  phone.addEventListener('change',()=>{arrange();refresh();});
  photographs.forEach(photo=>photo.querySelector('img').addEventListener('load',schedule));
  new IntersectionObserver(entries=>{nearby=entries[0].isIntersecting;loadSeries();},{rootMargin:'900px'}).observe(section);
  arrange();refresh();
  window.begaVisuals={get progress(){return lastProgress;},get active(){return active();}};
})();
