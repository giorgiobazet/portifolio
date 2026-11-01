// Faz os elementos com [data-revelar] aparecerem quando entram na tela.
const observador = new IntersectionObserver(
  (entradas) => {
    for (const entrada of entradas) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visivel');
        observador.unobserve(entrada.target);
      }
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
);

document.querySelectorAll('[data-revelar]').forEach((el) => observador.observe(el));
