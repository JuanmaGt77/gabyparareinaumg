// Suave animación de entrada y leve parallax del texto
(() => {
  const hero = document.querySelector('.hero');
  const watermark = document.querySelector('.watermark');
  const title = document.querySelector('.title');
  const year = document.querySelector('.year');
  const model = document.querySelector('.model img');

  // Fade-in inicial
  [hero, title, year, model].forEach(el => {
    el.style.opacity = '0';
    el.style.transform += ' translateY(10px)';
  });
  requestAnimationFrame(() => {
    setTimeout(() => {
      [hero, title, year, model].forEach(el => {
        el.style.transition = 'opacity .7s ease, transform .7s ease';
        el.style.opacity = '1';
        el.style.transform = el.style.transform.replace(' translateY(10px)', '');
      });
    }, 60);
  });

  // Parallax sutil del watermark según el mouse
  document.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const dx = (e.clientX / innerWidth - 0.5) * 6;   // rango pequeño
    const dy = (e.clientY / innerHeight - 0.5) * 6;
    watermark.style.transform = `translate(${dx}px, ${dy}px)`;
  });
})();

// ===== Intro slider (táctil + animación de tarjeta activa)
(() => {
  const track = document.getElementById('intro-slides') || document.getElementById('intro-slides') || document.querySelector('#intro-slides');
  // por si el id cambia accidentalmente:
  const backup = document.querySelector('.slides');
  const el = track || backup;
  if (!el) return;

  const setActive = () => {
    const slides = [...el.querySelectorAll('.slide')];
    const cLeft = el.getBoundingClientRect().left;
    const centerX = cLeft + el.clientWidth / 2;
    let best = { el: null, d: Infinity };
    slides.forEach(s => {
      const r = s.getBoundingClientRect();
      const mid = r.left + r.width / 2;
      const d = Math.abs(mid - centerX);
      if (d < best.d) best = { el: s, d };
    });
    slides.forEach(s => s.classList.toggle('is-active', s === best.el));
  };

  // activar al cargar y durante el scroll/resize 
  setActive();
  el.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('resize', setActive);

  // swipe con botones no es necesario; el gesto de dedo funciona
  // pero si quieres “flick” por teclado:
  el.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
    if (e.key === 'ArrowLeft')  el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' });
  });
})();

