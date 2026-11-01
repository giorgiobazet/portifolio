// Converte as imagens de `originais/` (fora do git) para WebP otimizado em `public/img/`.
// Uso: npm run imagens
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const ORIGEM = 'originais';
const DESTINO = 'public/img';

await mkdir(path.join(DESTINO, 'projetos'), { recursive: true });

// Fotos de perfil disponíveis. Troque FOTO_ATIVA e rode `npm run imagens`.
// `silhueta` é a área nítida (cabeça + ombros) em coordenadas do recorte;
// o resto vira fundo desfocado e escurecido, para destacar o rosto.
const FOTOS = {
  festa: {
    arquivo: 'foto2.jpg',
    recorte: { left: 28, top: 290, width: 664, height: 830 },
    fundo: { blur: 14, brightness: 0.62, saturation: 0.55 },
    silhueta: '<ellipse cx="322" cy="190" rx="175" ry="215"/><path d="M187 360 L462 360 L532 420 L664 430 L664 830 L0 830 L0 470 L122 430 Z"/>',
  },
  casa: {
    arquivo: 'foto3.jpg',
    recorte: { left: 0, top: 290, width: 900, height: 1125 },
    // Sem desfoque: a foto entra só recortada.
    fundo: null,
  },
};
const FOTO_ATIVA = 'casa';

{
  const foto = FOTOS[FOTO_ATIVA];
  const { recorte } = foto;
  const original = sharp(path.join(ORIGEM, foto.arquivo)).extract(recorte);
  const nitida = await original.clone().toBuffer();
  let junta = nitida;
  if (foto.fundo) {
    const fundo = await original.clone().blur(foto.fundo.blur)
      .modulate({ brightness: foto.fundo.brightness, saturation: foto.fundo.saturation }).toBuffer();
    const mascara = Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${recorte.width}" height="${recorte.height}">
        <defs><filter id="f"><feGaussianBlur stdDeviation="22"/></filter></defs>
        <g filter="url(#f)" fill="#fff">${foto.silhueta}</g>
      </svg>`);
    const pessoa = await sharp(nitida)
      .composite([{ input: await sharp(mascara).png().toBuffer(), blend: 'dest-in' }])
      .png()
      .toBuffer();
    // O composite roda no fim do pipeline do sharp, então vai para um buffer antes de redimensionar.
    junta = await sharp(fundo).composite([{ input: pessoa }]).png().toBuffer();
  }
  await sharp(junta)
    .modulate({ saturation: 0.92 })
    .resize(640, 800)
    .webp({ quality: 84 })
    .toFile(path.join(DESTINO, 'giorgio.webp'));
  // Versão quadrada (avatar pequeno).
  await sharp(path.join(DESTINO, 'giorgio.webp')).extract({ left: 110, top: 30, width: 420, height: 420 })
    .resize(240, 240).webp({ quality: 82 }).toFile(path.join(DESTINO, 'giorgio-avatar.webp'));
}

// Recorte usado nos cards, para o conteúdo do site ocupar a capa em vez de
// sobrar espaço vazio (coordenadas no print de 1440x900, proporção 16:10).
const RECORTES_CARD = {
  nology: { left: 208, top: 0, width: 1024, height: 640 },
  ponteiros: { left: 230, top: 10, width: 980, height: 612 },
  'pacman-web': { left: 220, top: 220, width: 1000, height: 625 },
};

// Prints dos projetos: versão grande (página do projeto) e pequena (cards).
for (const arquivo of await readdir(ORIGEM)) {
  if (!arquivo.endsWith('.png')) continue;
  const nome = path.basename(arquivo, '.png');
  const entrada = sharp(path.join(ORIGEM, arquivo));
  await entrada.clone().resize(1440, 900, { fit: 'cover', position: 'top' }).webp({ quality: 80 })
    .toFile(path.join(DESTINO, 'projetos', `${nome}.webp`));
  const base = await entrada.clone().resize(1440, 900, { fit: 'cover', position: 'top' }).png().toBuffer();
  const card = RECORTES_CARD[nome] ? sharp(base).extract(RECORTES_CARD[nome]) : sharp(base);
  await card.resize(800, 500, { fit: 'cover', position: 'top' }).webp({ quality: 80 })
    .toFile(path.join(DESTINO, 'projetos', `${nome}-720.webp`));
}

// Imagem de compartilhamento (Open Graph) gerada a partir de SVG.
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g" cx="80%" cy="10%" r="90%">
      <stop offset="0" stop-color="#10200a"/><stop offset="1" stop-color="#040609"/>
    </radialGradient>
    <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#94b2d6" stroke-opacity=".07"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#p)"/>
  <text x="80" y="150" font-family="Consolas, monospace" font-size="26" fill="#3ee6ff" letter-spacing="4">PORTFÓLIO · CIÊNCIA DA COMPUTAÇÃO</text>
  <text x="80" y="290" font-family="Arial, sans-serif" font-weight="700" font-size="104" fill="#e8eef6">Giorgio Bazet</text>
  <text x="80" y="370" font-family="Arial, sans-serif" font-size="38" fill="#93a3b8">Desenvolvedor · UERJ · Gestão de TI · UVA</text>
  <rect x="80" y="440" width="120" height="6" rx="3" fill="#c6ff3d"/>
  <text x="80" y="520" font-family="Consolas, monospace" font-size="30" fill="#c6ff3d">&gt; código limpo · sistemas seguros</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(path.join(DESTINO, 'og.png'));

console.log('Imagens prontas em', DESTINO);
