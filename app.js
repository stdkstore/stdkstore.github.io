/* =========================
 *   Smooth scroll for same-page anchors
 * ========================= */
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if(a){
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
  }
});

/* =========================
 *   Play on itch.io -> always show dev modal
 * ========================= */
const playBtn = document.getElementById('playItch');
const devModal = document.getElementById('devModal');
const modalDemo = document.getElementById('modalDemo');

if(playBtn && devModal){
  playBtn.addEventListener('click', (ev) => {
    ev.preventDefault(); // prevent direct link
    const demo = playBtn.dataset.demo || playBtn.getAttribute('href');
    modalDemo.href = demo; // set demo link
    modalDemo.target = "_blank"; // open in new tab
    // show modal
    devModal.setAttribute('aria-hidden','false');
    devModal.classList.add('show');
  });

  // close modal on backdrop click
  devModal.addEventListener('click', (ev) => {
    if(ev.target.dataset.close !== undefined || ev.target.matches('button[data-close]')){
      devModal.setAttribute('aria-hidden','true');
      devModal.classList.remove('show');
    }
  });
}

/* =========================
 *   Fullscreen image modal
 * ========================= */
const imgModal = document.getElementById('imgModal');
const imgModalImg = document.getElementById('imgModalImg');

function openImageFull(src, alt=''){
  if(!imgModal || !imgModalImg) return;
  imgModalImg.src = src;
  imgModalImg.alt = alt;
  imgModal.setAttribute('aria-hidden','false');
  imgModal.classList.add('show');
  // prevent background scroll
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function closeImageFull(){
  if(!imgModal) return;
  imgModal.setAttribute('aria-hidden','true');
  imgModal.classList.remove('show');
  imgModalImg.src = '';
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

// attach click handlers to gallery and mock images (delegation)
document.addEventListener('click', (ev) => {
  const img = ev.target.closest('img');
  if(!img) return;
  const inGallery = img.closest('.gallery-grid') || img.closest('.mockup') || img.closest('.shelf') || img.classList.contains('mock-screenshot');
  if(inGallery){
    openImageFull(img.src, img.alt || '');
    ev.preventDefault();
  }
});

// close image modal when clicking backdrop
if(imgModal){
  imgModal.addEventListener('click', (ev)=>{
    if(ev.target.dataset.close !== undefined || ev.target.matches('.img-backdrop')){
      closeImageFull();
    }
    if(ev.target === imgModal) closeImageFull();
  });
}

/* =========================
 *   Modal button actions (Bluesky / Demo)
 * ========================= */
const blueskyBtn = devModal.querySelector('a.secondary');
if(blueskyBtn){
  blueskyBtn.setAttribute('target','_blank'); // always open Bluesky in new tab
}

/* =========================
 *   Simple fade-in for main sections
 * ========================= */
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('main > section').forEach((s,i)=>{
    s.style.opacity = 0;
    s.style.transform = 'translateY(8px)';
    setTimeout(()=>{
      s.style.transition='all 420ms cubic-bezier(.2,.9,.2,1)';
      s.style.opacity=1;
      s.style.transform='none';
    }, 120 + i*90);
  });
});
