/* Two-link inverse kinematics; base stays fixed. Field values are never read. */
(() => {
  const section=document.querySelector('#contacto'),layout=section.querySelector('.contact-layout'),form=section.querySelector('.contact-form-wrap'),machine=section.querySelector('.contact-machine');
  const fields=[...form.querySelectorAll('input,select,textarea')];
  const media=matchMedia('(min-width:1100px) and (min-height:701px)');
  const phone=matchMedia('(max-width:680px)');
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('contact-focus-trace');svg.setAttribute('aria-hidden','true');
  svg.innerHTML='<path/><circle r="4"/>';layout.append(svg);
  const hint=document.createElement('p');hint.className='contact-guide-hint';hint.textContent='BASE FIJA · EL BRAZO SIGUE EL CAMPO O EL MOUSE';layout.append(hint);
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),base=[730,880],viewHeight=1100;
  let active=null,pointer=null,current={x:870,y:360},from={...current},started=0,settled=true;
  const enabled=()=>(media.matches||phone.matches)&&!document.body.classList.contains('simple-motion');
  const notify=()=>document.dispatchEvent(new Event('bega:contact-focus'));
  const begin=()=>{from={...current};started=performance.now();settled=false;svg.dataset.settled='false';notify();};
  const geometry=()=>{const r=machine.querySelector('canvas').getBoundingClientRect(),scale=Math.min(r.width/1000,r.height/viewHeight);return {r,scale,xOffset:(r.width-scale*1000)/2,yOffset:(r.height-scale*viewHeight)/2};};
  function destination(){
    if(!active&&!pointer)return {x:870,y:360};
    if(phone.matches){const index=Math.max(0,fields.indexOf(active));return {x:820+index*20,y:220+index*135};}
    const panel=form.getBoundingClientRect(),target=active?.getBoundingClientRect(),g=geometry();
    const clientY=pointer?panel.top+pointer.y:target.top+target.height/2;
    const fraction=pointer?pointer.x/panel.width:(target.left-panel.left+target.width/2)/panel.width;
    return {x:820+clamp(fraction,0,1)*110,y:clamp((clientY-g.r.top-g.yOffset)/g.scale,110,viewHeight-155)};
  }
  function solve(point,state){
    // Visible right basket edge converted to the unmirrored telescopic wrist.
    const wrist=[1000-point.x+187+96.9,point.y+40.3];
    const dx=wrist[0]-base[0],dy=wrist[1]-base[1],distance=Math.hypot(dx,dy);
    const reach=clamp(distance-580,20,300),l1=Math.hypot(411.3,9.45),l2=Math.hypot(339+reach,7.2);
    const theta=Math.atan2(dy,dx)+Math.acos(clamp((distance*distance+l1*l1-l2*l2)/(2*distance*l1),-1,1));
    const elbow=[base[0]+l1*Math.cos(theta),base[1]+l1*Math.sin(theta)];
    const a=theta-Math.atan2(9.45,-411.3),b=Math.atan2(wrist[1]-elbow[1],wrist[0]-elbow[0])-Math.atan2(7.2,-339-reach);
    const sleeveEnd=[elbow[0]-339*Math.cos(b)-7.2*Math.sin(b),elbow[1]-339*Math.sin(b)+7.2*Math.cos(b)];
    const telescopeEnd=[sleeveEnd[0]-reach*Math.cos(b),sleeveEnd[1]-reach*Math.sin(b)];
    const basketAnchor=[telescopeEnd[0]-96.9,telescopeEnd[1]-.3];
    return {...state,base:[...base],a,b,elbow,sleeveEnd,telescopeEnd,basketAnchor,reach,mirror:true,viewHeight,wheelTravel:0,assemblyOffsets:[0,0,0]};
  }
  window.begaContactGuide={
    pose(state,still){
      if(!media.matches&&!phone.matches)return state;
      const goal=still?{x:870,y:360}:destination(),t=still?1:clamp((performance.now()-started)/300,0,1),e=t*t*(3-2*t);
      current={x:from.x+(goal.x-from.x)*e,y:from.y+(goal.y-from.y)*e};settled=t===1;
      return solve(current,state);
    },
    position(rendered,basketTip,still){
      const visible=enabled()&&!still&&(pointer||(active&&active.getClientRects().length));
      svg.style.display=visible?'block':'none';section.classList.toggle('contact-guiding',Boolean(visible));
      svg.dataset.settled=String(settled);
      if(phone.matches){svg.style.display='none';hint.textContent=active?'ACOMPAÑANDO: '+(form.querySelector(`label[for="${active.id}"]`)?.textContent||'TU CONSULTA'):'TOCA UN CAMPO · EL BRAZO TE ACOMPAÑA';if(enabled()&&!settled)notify();return;}
      if(!visible){if(enabled()&&!settled)notify();return;}
      const area=layout.getBoundingClientRect(),panel=form.getBoundingClientRect(),box=machine.getBoundingClientRect(),target=active?.getBoundingClientRect();
      const x=box.left-area.left+basketTip[0],y=box.top-area.top+basketTip[1],gutter=panel.left-area.left-10;
      const endX=pointer?panel.left-area.left+12:target.left-area.left+12;
      const endY=pointer?panel.top-area.top+pointer.y:target.top-area.top-6;
      svg.querySelector('path').setAttribute('d','M '+x+' '+y+' L '+gutter+' '+y+' L '+gutter+' '+endY+' L '+endX+' '+endY);
      svg.querySelector('circle').setAttribute('cx',endX);svg.querySelector('circle').setAttribute('cy',endY);
      svg.dataset.field=pointer?'pointer':active.id;svg.dataset.basketY=String(y);
      svg.dataset.targetY=String(pointer?panel.top-area.top+pointer.y:target.top-area.top+target.height/2);
      if(!settled)notify();
    }
  };
  form.addEventListener('focusin',event=>{if(!fields.includes(event.target))return;fields.forEach(field=>field.classList.toggle('guided-field',field===event.target));active=event.target;pointer=null;begin();});
  form.addEventListener('focusout',event=>{if(fields.includes(event.relatedTarget))return;fields.forEach(field=>field.classList.remove('guided-field'));active=null;pointer=null;begin();});
  form.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse'||!enabled())return;const r=form.getBoundingClientRect();pointer={x:event.clientX-r.left,y:event.clientY-r.top};begin();});
  form.addEventListener('pointerleave',()=>{pointer=null;begin();});
  form.addEventListener('input',()=>{pointer=null;begin();});
  const home=machine.parentNode;
  function place(){if(phone.matches){form.prepend(machine);machine.after(hint);}else{home.append(machine);layout.append(hint);hint.textContent='BASE FIJA · EL BRAZO SIGUE EL CAMPO O EL MOUSE';}notify();}
  new ResizeObserver(notify).observe(form);media.addEventListener('change',notify);phone.addEventListener('change',place);place();
})();
