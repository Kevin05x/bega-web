(() => {
  'use strict';
  document.body.classList.add('js');
  const menu=document.querySelector('.menu-button'),nav=document.querySelector('#main-nav'),navBackdrop=document.querySelector('.nav-backdrop');
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);navBackdrop?.classList.toggle('is-open',open);menu.querySelector('span').textContent=open?'−':'+';});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){menu.click();menu.focus();}});
  // Revisión 15: menú lateral en móvil — tocar fuera del panel (la zona
  // oscurecida) lo cierra, igual que un enlace o la tecla Escape.
  navBackdrop?.addEventListener('click',()=>{if(menu.getAttribute('aria-expanded')==='true')menu.click();});
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
    const target=document.querySelector(link.getAttribute('href'));if(!target)return;
    event.preventDefault();
    if(link.dataset.service)document.querySelector('#service').value=link.dataset.service;
    if(link.dataset.equipment){document.querySelector('#equipment').value=link.dataset.equipment;document.querySelector('#service').value='Elevación y acceso';}
    if(menu.getAttribute('aria-expanded')==='true')menu.click();
    // Revisión 09: recorrido suave entre capítulos; el salto instantáneo
    // se conserva solo cuando el usuario pidió reducir el movimiento.
    target.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'});
    if(!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
    history.replaceState(null,'',link.getAttribute('href'));
  }));
  const gallery=document.querySelector('#gallery'),items=[...gallery.querySelectorAll('.project-photo')];
  for(const [category,label] of [['equipos','Equipos y logística'],['personal','Personal y seguridad']]){const button=document.createElement('button');button.type='button';button.dataset.filter=category;button.textContent=label;button.setAttribute('aria-pressed','false');document.querySelector('.gallery-filters').append(button);}
  const filters=[...document.querySelectorAll('[data-filter]')];
  document.querySelector('.gallery-tools').hidden=false;
  const pagination=document.querySelector('.gallery-pagination'),previous=document.querySelector('[data-gallery-prev]'),next=document.querySelector('[data-gallery-next]');
  let selectedCategory='all',series=0;const pageSize=12;
  function filterGallery(category){
    selectedCategory=category;
    const matching=items.filter(item=>category==='all'||item.dataset.category===category),count=matching.length,pages=Math.ceil(count/pageSize);
    series=Math.max(0,Math.min(series,pages-1));
    const visible=new Set(matching.slice(series*pageSize,(series+1)*pageSize));items.forEach(item=>item.hidden=!visible.has(item));
    filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===category)));
    document.querySelector('#gallery-count').textContent=`${String(count).padStart(2,'0')} FOTOGRAFÍA${count===1?'':'S'}`;
    pagination.hidden=pages<=1;previous.disabled=series===0;next.disabled=series===pages-1;
    document.querySelector('#gallery-series').textContent=`Serie ${series+1} de ${pages} · ${series*pageSize+1}–${Math.min((series+1)*pageSize,count)} de ${count}`;
    document.dispatchEvent(new Event('bega:gallery-change'));
  }
  filters.forEach(button=>button.addEventListener('click',()=>{series=0;filterGallery(button.dataset.filter);}));filterGallery('all');
  const changeSeries=delta=>{series+=delta;filterGallery(selectedCategory);document.querySelector('#proyectos').scrollIntoView({block:'start',behavior:'instant'});};
  previous.addEventListener('click',()=>changeSeries(-1));next.addEventListener('click',()=>changeSeries(1));
  const dialog=document.querySelector('#photo-dialog');let photoTrigger=null;
  if(typeof dialog.showModal==='function'){
    gallery.querySelectorAll('[data-photo]').forEach(link=>link.addEventListener('click',event=>{
      event.preventDefault();photoTrigger=link;const original=link.querySelector('img'),image=dialog.querySelector('img');
      image.src=link.href;image.alt=original.alt;document.querySelector('#photo-caption').textContent=original.alt;
      dialog.showModal();document.body.style.overflow='hidden';
    }));
    dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
    dialog.addEventListener('close',()=>{document.body.style.overflow='';photoTrigger?.focus({preventScroll:true});});
  }
  const form=document.querySelector('#project-form'),result=document.querySelector('#query-result'),text=document.querySelector('#query-text');
  document.querySelector('.prepare-button').hidden=false;
  // Revisión 14: Kevin dio el número de WhatsApp y el correo reales de BEGA.
  // El texto sigue componiéndose en el dispositivo (no hay backend), pero
  // ahora los botones "Enviar" pasan ese mismo texto a WhatsApp o al
  // cliente de correo del usuario en vez de solo poder copiarse.
  const WHATSAPP_NUMBER='51957320345',CONTACT_EMAIL='serviciosgeneralesbega@gmail.com';
  const sendWhatsapp=document.querySelector('#send-whatsapp'),sendEmail=document.querySelector('#send-email');
  form.addEventListener('submit',event=>{
    event.preventDefault();if(!form.reportValidity())return;
    const values=new FormData(form);
    text.value=`Hola, BEGA. Quisiera consultar sobre un proyecto.\n\nServicio: ${values.get('servicio')}\nEquipo: ${values.get('equipo')}\nAltura aproximada: ${values.get('altura')||'Por definir'}\nZona: ${values.get('zona')}\n\nDetalles:\n${values.get('detalle')}`;
    if(sendWhatsapp)sendWhatsapp.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text.value)}`;
    if(sendEmail)sendEmail.href=`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Consulta desde el sitio web — BEGA')}&body=${encodeURIComponent(text.value)}`;
    form.hidden=true;result.hidden=false;text.focus();
  });
  document.querySelector('#edit-query').addEventListener('click',()=>{result.hidden=true;form.hidden=false;document.querySelector('#service').focus();});
  document.querySelector('#copy-query').addEventListener('click',async()=>{
    const status=document.querySelector('#copy-status');
    try{await navigator.clipboard.writeText(text.value);status.textContent='Texto copiado. La consulta no se ha enviado.';}
    catch{text.focus();text.select();status.textContent='Seleccionamos el texto. Usa Ctrl+C o la opción Copiar de tu dispositivo.';}
  });
})();
