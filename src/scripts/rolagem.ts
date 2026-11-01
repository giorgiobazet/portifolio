// Rolagem suave para links internos (#secao), com desconto do cabeçalho fixo
// e curva de aceleração própria, igual em todos os navegadores.
// Quem pede menos movimento no sistema vai direto, sem animação.

const ALTURA_NAV = 80;
const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let animacao = 0;

const curva = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function rolarPara(alvo: HTMLElement) {
  const destino = Math.max(0, alvo.getBoundingClientRect().top + window.scrollY - ALTURA_NAV);
  cancelAnimationFrame(animacao);

  if (semMovimento) {
    window.scrollTo(0, destino);
  } else {
    const inicio = window.scrollY;
    const distancia = destino - inicio;
    // Trechos longos levam um pouco mais, mas nunca passam de ~1,1 s.
    const duracao = Math.min(1100, Math.max(450, Math.abs(distancia) * 0.35));
    const comeco = performance.now();
    const passo = (agora: number) => {
      const t = Math.min(1, (agora - comeco) / duracao);
      window.scrollTo(0, inicio + distancia * curva(t));
      if (t < 1) animacao = requestAnimationFrame(passo);
    };
    animacao = requestAnimationFrame(passo);
  }

  // Leva o foco junto, para teclado e leitores de tela.
  if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1');
  alvo.focus({ preventScroll: true });
}

// A roda do mouse ou o toque cancelam a animação em andamento.
['wheel', 'touchstart', 'keydown'].forEach((evento) =>
  window.addEventListener(evento, () => cancelAnimationFrame(animacao), { passive: true }),
);

document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
  if (!link) return;
  const url = new URL(link.href, window.location.href);
  if (url.pathname !== window.location.pathname || !url.hash) return;
  const alvo = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!alvo) return;
  e.preventDefault();
  history.pushState(null, '', url.hash);
  rolarPara(alvo);
});
