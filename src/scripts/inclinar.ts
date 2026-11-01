// Inclinação 3D sutil que segue o mouse em elementos com [data-inclinar].
const podeAnimar =
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (podeAnimar) {
  document.querySelectorAll<HTMLElement>('[data-inclinar]').forEach((el) => {
    const forca = Number(el.dataset.inclinar) || 6;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-y * forca).toFixed(2)}deg) rotateY(${(x * forca).toFixed(2)}deg)`;
      el.style.setProperty('--brilho-x', `${(x + 0.5) * 100}%`);
      el.style.setProperty('--brilho-y', `${(y + 0.5) * 100}%`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}
