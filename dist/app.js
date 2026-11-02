(()=>{
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function escape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
const products=window.BORA_PRODUCTS||[];
$('#products').innerHTML=products.map(p=>`<article class="product-card"><div class="product-art ${escape(p.tone)}"><img loading="lazy" src="assets/${escape(p.cover)}" alt="Capa de ${escape(p.title)}"><span class="product-badge">${escape(p.badge)}</span></div><div class="product-info"><p class="eyebrow">COLEÇÃO BORA RESUMIR</p><h3>${escape(p.title)}</h3><p>${escape(p.intro)}</p>${p.priceLabel?'<div class="kit-price"><span>Valor atual por kit</span><strong>'+escape(p.priceLabel)+'</strong></div>':''}<button class="product-button" data-product="${escape(p.id)}" aria-label="${p.checkoutUrl?'Acessar '+escape(p.title)+' na Hotmart':escape(p.title)+' — em breve'}" ${p.checkoutUrl?'':'disabled style="opacity:.55;cursor:not-allowed"'}>${p.checkoutUrl?'Quero este material <span aria-hidden="true">↗</span>':'Em breve'}</button></div></article>`).join('');
function access(p){if(!p?.checkoutUrl)return;try{const u=new URL(p.checkoutUrl);if(u.protocol!=='https:')return;const source=new URLSearchParams(location.search);for(const [key,value] of source)if(/^utm_(source|medium|campaign|content|term)$/.test(key)||['src','sck'].includes(key))u.searchParams.set(key,value);window.location.assign(u.toString());}catch{}}
$('#products').addEventListener('click',e=>{const b=e.target.closest('[data-product]');if(b)access(products.find(p=>p.id===b.dataset.product));});

const modules=window.BORA_MODULES||[];let moduleIndex=0,pageIndex=0;
$('#module-tabs').innerHTML=modules.map((m,i)=>`<button class="module-tab" id="module-tab-${i}" role="tab" aria-selected="${i===0}" aria-controls="module-panel" tabindex="${i===0?0:-1}" data-module="${i}"><img src="assets/${escape(m.cover)}" alt="" loading="lazy"><span><small>MÓDULO ${String(i+1).padStart(2,'0')} · PRÉVIA</small><strong>${escape(m.title)}</strong><em>5 páginas do Volume 1</em></span><b aria-hidden="true">↗</b></button>`).join('');
function renderPage(n){const m=modules[moduleIndex];pageIndex=(n+m.pages.length)%m.pages.length;const p=m.pages[pageIndex];$('#module-image').src='assets/'+p.src;$('#module-image').alt=m.title+' — '+p.title+' — página '+p.number+' do Volume 1';$('#module-caption').textContent=(pageIndex+1)+' / 5 · '+p.title+' · p. '+p.number;$('#module-thumbnails').innerHTML=m.pages.map((q,i)=>`<button class="page-thumb" data-page="${i}" aria-label="Mostrar página ${i+1}: ${escape(q.title)}" aria-pressed="${i===pageIndex}"><img src="assets/${escape(q.src)}" alt="" loading="lazy"><span>${i+1}</span></button>`).join('');}
function selectModule(n,focus=false){moduleIndex=(n+modules.length)%modules.length;const m=modules[moduleIndex];$$('[data-module]').forEach((b,i)=>{b.setAttribute('aria-selected',String(i===moduleIndex));b.tabIndex=i===moduleIndex?0:-1;if(focus&&i===moduleIndex)b.focus()});$('#module-panel').setAttribute('aria-labelledby','module-tab-'+moduleIndex);$('#module-title').textContent=m.title;$('#module-volume').textContent=m.volume;const product=products.find(p=>p.id===m.id);const cta=$('#module-access');cta.disabled=!product?.checkoutUrl;cta.innerHTML=product?.checkoutUrl?'Quero este material <span aria-hidden="true">↗</span>':'Em breve';cta.style.opacity=product?.checkoutUrl?'':'0.55';cta.style.cursor=product?.checkoutUrl?'':'not-allowed';renderPage(0);}
$('#module-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-module]');if(b)selectModule(Number(b.dataset.module));});
$('#module-tabs').addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();selectModule(e.key==='Home'?0:e.key==='End'?modules.length-1:moduleIndex+(e.key==='ArrowRight'?1:-1),true);}});
$('#module-thumbnails').addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(b)renderPage(Number(b.dataset.page));});
$('#module-prev').addEventListener('click',()=>renderPage(pageIndex-1));$('#module-next').addEventListener('click',()=>renderPage(pageIndex+1));
$('#module-access').addEventListener('click',()=>access(products.find(p=>p.id===modules[moduleIndex].id)));
const sticky=$('.mobile-cta');function updateSticky(){const hero=$('.hero').getBoundingClientRect(),catalog=$('#colecoes').getBoundingClientRect(),footer=$('.footer').getBoundingClientRect();sticky.classList.toggle('visible',hero.bottom<80&&!(catalog.top<innerHeight&&catalog.bottom>80)&&footer.top>innerHeight)}window.addEventListener('scroll',updateSticky,{passive:true});window.addEventListener('resize',updateSticky);updateSticky();
// Revelação progressiva sem esconder o conteúdo se o JavaScript falhar.
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets=$$('.section-heading,.module-layout,.product-card,.faq-grid');
if('IntersectionObserver' in window&&!reduceMotion.matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});
  revealTargets.forEach(el=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add('reveal');observer.observe(el)}});
  reduceMotion.addEventListener('change',e=>{if(e.matches){revealTargets.forEach(el=>el.classList.add('is-visible'));observer.disconnect()}});
}
selectModule(0);
$('#year').textContent=String(new Date().getFullYear());
})();
