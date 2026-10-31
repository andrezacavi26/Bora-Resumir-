(()=>{
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let lastFocus=null;
function escape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function openDialog(d){lastFocus=document.activeElement;d.showModal();document.body.classList.add('modal-open');}
function closeDialog(d){d.close();if(!$$('dialog[open]').length){document.body.classList.remove('modal-open');lastFocus?.focus();}}
$$('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(d)}});d.addEventListener('close',()=>{if(!$$('dialog[open]').length)document.body.classList.remove('modal-open')});d.addEventListener('click',e=>{if(e.target.closest('[data-close]'))closeDialog(d)});});
const products=window.BORA_PRODUCTS||[];
$('#products').innerHTML=products.map(p=>`<article class="product-card"><div class="product-art ${escape(p.tone)}"><img loading="lazy" src="assets/${escape(p.cover)}" alt="Capa de ${escape(p.title)}"><span class="product-badge">${escape(p.badge)}</span></div><div class="product-info"><p class="eyebrow">COLEÇÃO BORA RESUMIR</p><h3>${escape(p.title)}</h3><p>${escape(p.intro)}</p><button class="product-button" data-product="${escape(p.id)}" aria-label="Explorar a coleção de ${escape(p.title)}">Quero este material <span aria-hidden="true">↗</span></button></div></article>`).join('');
function access(p){if(p.checkoutUrl){try{const u=new URL(p.checkoutUrl);if(u.protocol!=='https:')throw new Error('HTTPS obrigatório');const source=new URLSearchParams(location.search);for(const [key,value] of source)if(/^utm_(source|medium|campaign|content|term)$/.test(key)||['src','sck'].includes(key))u.searchParams.set(key,value);window.location.assign(u.toString());return;}catch{ /* Falha segura: nenhum redirecionamento para URLs inválidas. */ }}$('#access-copy').textContent=p.title+' · '+p.badge;openDialog($('#access-dialog'));}
function productDetail(id){const p=products.find(x=>x.id===id);if(!p)return;$('#product-detail').innerHTML=`<div class="detail-grid"><div class="detail-art"><img src="assets/${escape(p.cover)}" alt="Capa de ${escape(p.title)}"></div><div class="detail-copy"><span class="pill">${escape(p.badge)} · PDF DIGITAL</span><h2 id="product-title">${escape(p.title)}</h2><p>${escape(p.intro)}</p><ul class="checklist">${p.topics.map(t=>'<li>'+escape(t)+'</li>').join('')}</ul><p class="format">${escape(p.format)}</p>${p.priceLabel?'<p class="price">'+escape(p.priceLabel)+'</p>':''}<button class="button" id="go-access">Quero este material <span aria-hidden="true">↗</span></button><p class="caption" style="font-size:10px;margin:14px 0 0">Confira a composição e as condições da oferta antes de finalizar seu acesso.</p></div></div>`;$('#go-access').addEventListener('click',()=>access(p));openDialog($('#product-dialog'));}
$('#products').addEventListener('click',e=>{const b=e.target.closest('[data-product]');if(b)productDetail(b.dataset.product)});

const modules=window.BORA_MODULES||[];let moduleIndex=0,pageIndex=0;
$('#module-tabs').innerHTML=modules.map((m,i)=>`<button class="module-tab" id="module-tab-${i}" role="tab" aria-selected="${i===0}" aria-controls="module-panel" tabindex="${i===0?0:-1}" data-module="${i}"><img src="assets/${escape(m.cover)}" alt="" loading="lazy"><span><small>MÓDULO ${String(i+1).padStart(2,'0')} · PRÉVIA</small><strong>${escape(m.title)}</strong><em>5 páginas do Volume 1</em></span><b aria-hidden="true">↗</b></button>`).join('');
function renderPage(n){const m=modules[moduleIndex];pageIndex=(n+m.pages.length)%m.pages.length;const p=m.pages[pageIndex];$('#module-image').src='assets/'+p.src;$('#module-image').alt=m.title+' — '+p.title+' — página '+p.number+' do Volume 1';$('#module-caption').textContent=(pageIndex+1)+' / 5 · '+p.title+' · p. '+p.number;$('#module-expand').setAttribute('aria-label','Ampliar '+p.title);$('#module-thumbnails').innerHTML=m.pages.map((q,i)=>`<button class="page-thumb" data-page="${i}" aria-label="Mostrar página ${i+1}: ${escape(q.title)}" aria-pressed="${i===pageIndex}"><img src="assets/${escape(q.src)}" alt="" loading="lazy"><span>${i+1}</span></button>`).join('');}
function selectModule(n,focus=false){moduleIndex=(n+modules.length)%modules.length;const m=modules[moduleIndex];$$('[data-module]').forEach((b,i)=>{b.setAttribute('aria-selected',String(i===moduleIndex));b.tabIndex=i===moduleIndex?0:-1;if(focus&&i===moduleIndex)b.focus()});$('#module-panel').setAttribute('aria-labelledby','module-tab-'+moduleIndex);$('#module-title').textContent=m.title;$('#module-volume').textContent=m.volume;renderPage(0);}
$('#module-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-module]');if(b)selectModule(Number(b.dataset.module));});
$('#module-tabs').addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();selectModule(e.key==='Home'?0:e.key==='End'?modules.length-1:moduleIndex+(e.key==='ArrowRight'?1:-1),true);}});
$('#module-thumbnails').addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(b)renderPage(Number(b.dataset.page));});
$('#module-prev').addEventListener('click',()=>renderPage(pageIndex-1));$('#module-next').addEventListener('click',()=>renderPage(pageIndex+1));
function lightbox(n){renderPage(n);const m=modules[moduleIndex],p=m.pages[pageIndex];$('#lightbox-image').src='assets/'+p.src;$('#lightbox-image').alt=m.title+' — '+p.title;$('#lightbox-label').textContent=(pageIndex+1)+' / 5 · '+m.title+' · p. '+p.number;}
$('#module-expand').addEventListener('click',()=>{lightbox(pageIndex);openDialog($('#image-dialog'));});$('#prev-image').addEventListener('click',()=>lightbox(pageIndex-1));$('#next-image').addEventListener('click',()=>lightbox(pageIndex+1));$('#image-dialog').addEventListener('keydown',e=>{if(e.key==='ArrowLeft')lightbox(pageIndex-1);if(e.key==='ArrowRight')lightbox(pageIndex+1);});
$('#module-access').addEventListener('click',()=>productDetail(modules[moduleIndex].id));
const reviewTrack=$('#demo-track');function updateReviewButtons(){$('#reviews-prev').disabled=reviewTrack.scrollLeft<5;$('#reviews-next').disabled=reviewTrack.scrollLeft+reviewTrack.clientWidth>=reviewTrack.scrollWidth-5;}
$('#reviews-prev').addEventListener('click',()=>reviewTrack.scrollBy({left:-reviewTrack.clientWidth*.9,behavior:reduceMotion.matches?'auto':'smooth'}));$('#reviews-next').addEventListener('click',()=>reviewTrack.scrollBy({left:reviewTrack.clientWidth*.9,behavior:reduceMotion.matches?'auto':'smooth'}));reviewTrack.addEventListener('scroll',updateReviewButtons,{passive:true});window.addEventListener('resize',updateReviewButtons);
const sticky=$('.mobile-cta');function updateSticky(){const hero=$('.hero').getBoundingClientRect(),catalog=$('#colecoes').getBoundingClientRect(),footer=$('.footer').getBoundingClientRect();sticky.classList.toggle('visible',hero.bottom<80&&!(catalog.top<innerHeight&&catalog.bottom>80)&&footer.top>innerHeight)}window.addEventListener('scroll',updateSticky,{passive:true});window.addEventListener('resize',updateSticky);updateSticky();
// Revelação progressiva sem esconder o conteúdo se o JavaScript falhar.
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets=$$('.section-heading,.module-layout,.demo-reviews,.product-card,.faq-grid');
if('IntersectionObserver' in window&&!reduceMotion.matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});
  revealTargets.forEach(el=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add('reveal');observer.observe(el)}});
  reduceMotion.addEventListener('change',e=>{if(e.matches){revealTargets.forEach(el=>el.classList.add('is-visible'));observer.disconnect()}});
}
// Uma única retomada por sessão. Não interfere no fechamento da aba ou no botão Voltar.
let hasShownExit=false,hiddenAt=0,maxProgress=0;const enteredAt=Date.now();
try{hasShownExit=sessionStorage.getItem('bora-exit-shown')==='1'}catch{}
const exitDialog=$('#exit-dialog');
function trackProgress(){const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);maxProgress=Math.max(maxProgress,scrollY/max)}
window.addEventListener('scroll',trackProgress,{passive:true});trackProgress();
function showExitOffer(){if(hasShownExit||Date.now()-enteredAt<20000||maxProgress<.15||$$('dialog[open]').length)return;hasShownExit=true;try{sessionStorage.setItem('bora-exit-shown','1')}catch{}openDialog(exitDialog)}
document.addEventListener('mouseleave',e=>{if(e.clientY<=0&&window.matchMedia('(hover: hover) and (pointer: fine)').matches)showExitOffer()});
document.addEventListener('visibilitychange',()=>{if(document.hidden){hiddenAt=Date.now()}else if(hiddenAt&&Date.now()-hiddenAt>=1500){showExitOffer();hiddenAt=0}});
$('#exit-continue').addEventListener('click',()=>{closeDialog(exitDialog);$('#colecoes').scrollIntoView({behavior:reduceMotion.matches?'auto':'smooth',block:'start'});});
selectModule(0);updateReviewButtons();
$('#year').textContent=String(new Date().getFullYear());
})();
