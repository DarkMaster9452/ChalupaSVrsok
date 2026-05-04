/* ===========================
   CHALUPA POD SKLENÝM VŔŠKOM
   Shared JavaScript
   =========================== */
(() => {
  'use strict';

  // SIDEBAR / MOBILE MENU
  const sidebar   = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      sidebar.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) &&
          !hamburger.contains(e.target)) {
        sidebar.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }

  // HERO SLIDER (only on pages that have one)
  const slides = document.querySelectorAll('.slide');
  if (slides.length) {
    const dots = document.querySelectorAll('.dot');
    let current = 0, timer;
    const goTo = i => {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    };
    const startAuto = () => { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 6000); };
    const btnPrev = document.querySelector('.slider-btn.prev');
    const btnNext = document.querySelector('.slider-btn.next');
    if (btnPrev) btnPrev.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    if (btnNext) btnNext.addEventListener('click', () => { goTo(current + 1); startAuto(); });
    dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.i); startAuto(); }));
    startAuto();
  }

  // SCROLL REVEAL + FEATURE CARDS
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
  document.querySelectorAll('.feature-card').forEach((card, i) => {
    card.style.transitionDelay = (i % 6 * 0.09) + 's';
    revealObs.observe(card);
  });

  // PROGRESS BARS
  const progObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.width = e.target.dataset.pct + '%'; progObs.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.progress-fill').forEach(el => progObs.observe(el));

  // COUNTERS
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = +e.target.dataset.target, dur = 1400, step = target / (dur / 16);
      let val = 0;
      const tick = () => { val = Math.min(val + step, target); e.target.textContent = Math.floor(val); if (val < target) requestAnimationFrame(tick); };
      tick();
      cntObs.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.counter').forEach(el => cntObs.observe(el));

  // LIGHTBOX
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg  = document.getElementById('lb-img');
    const lbClose= document.getElementById('lb-close');
    const lbPrev = document.getElementById('lb-prev');
    const lbNext = document.getElementById('lb-next');
    const items  = document.querySelectorAll('.gallery-item');
    const urls   = [...items].map(el => el.dataset.src);
    let cur      = 0;
    const open   = i => { cur = i; lbImg.src = urls[i]; lightbox.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const close  = () => { lightbox.classList.remove('open'); document.body.style.overflow = ''; };
    items.forEach((item, i) => item.addEventListener('click', () => open(i)));
    lbClose.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    lbPrev.addEventListener('click', () => open((cur - 1 + urls.length) % urls.length));
    lbNext.addEventListener('click', () => open((cur + 1) % urls.length));
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowLeft')  open((cur - 1 + urls.length) % urls.length);
      if (e.key === 'ArrowRight') open((cur + 1) % urls.length);
    });
  }

  // BACK TO TOP
  const btt = document.getElementById('btt');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400), { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

})();
