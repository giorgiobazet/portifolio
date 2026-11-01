// Rede de pontos no fundo: conecta pontos próximos e reage ao mouse.
// Fica leve de propósito: poucos pontos, pausa com a aba escondida e
// desenha um quadro estático para quem prefere menos movimento.

const canvas = document.getElementById('rede') as HTMLCanvasElement | null;
const ctx = canvas?.getContext('2d');

if (canvas && ctx) {
  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DISTANCIA = 140;
  const mouse = { x: -9999, y: -9999 };
  let pontos: { x: number; y: number; vx: number; vy: number; ouro: boolean }[] = [];
  let largura = 0;
  let altura = 0;
  let rodando = true;

  function redimensionar() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    largura = window.innerWidth;
    altura = window.innerHeight;
    canvas!.width = largura * dpr;
    canvas!.height = altura * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    const quantidade = Math.round(Math.min(70, (largura * altura) / 22000));
    pontos = Array.from({ length: quantidade }, () => ({
      x: Math.random() * largura,
      y: Math.random() * altura,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      ouro: Math.random() < 0.08,
    }));
  }

  function desenhar() {
    ctx!.clearRect(0, 0, largura, altura);
    for (const p of pontos) {
      if (!semMovimento) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > largura) p.vx *= -1;
        if (p.y < 0 || p.y > altura) p.vy *= -1;
        // O mouse empurra os pontos de leve.
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 120 && d > 0) {
          p.x += (dx / d) * 0.8;
          p.y += (dy / d) * 0.8;
        }
      }
    }
    for (let i = 0; i < pontos.length; i++) {
      const a = pontos[i];
      for (let j = i + 1; j < pontos.length; j++) {
        const b = pontos[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < DISTANCIA) {
          ctx!.strokeStyle = `rgba(198, 255, 61, ${0.12 * (1 - d / DISTANCIA)})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }
      const pertoDoMouse = Math.hypot(a.x - mouse.x, a.y - mouse.y) < 160;
      ctx!.fillStyle = a.ouro ? 'rgba(62, 230, 255, 0.8)' : pertoDoMouse ? 'rgba(216, 255, 110, 0.9)' : 'rgba(170, 195, 225, 0.45)';
      ctx!.beginPath();
      ctx!.arc(a.x, a.y, a.ouro ? 1.8 : 1.3, 0, Math.PI * 2);
      ctx!.fill();
    }
  }

  function quadro() {
    if (!rodando) return;
    desenhar();
    requestAnimationFrame(quadro);
  }

  redimensionar();
  if (semMovimento) {
    desenhar();
  } else {
    requestAnimationFrame(quadro);
    window.addEventListener('pointermove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });
    document.addEventListener('visibilitychange', () => {
      rodando = !document.hidden;
      if (rodando) requestAnimationFrame(quadro);
    });
  }

  let espera: number | undefined;
  window.addEventListener('resize', () => {
    clearTimeout(espera);
    espera = window.setTimeout(() => {
      redimensionar();
      if (semMovimento) desenhar();
    }, 200);
  });
}
