# Portfólio · Giorgio Bazet

Site pessoal feito com [Astro](https://astro.build): estático, rápido e sem servidor.
Português em `/` e inglês em `/en/`.

## Rodar no computador

```bash
npm install
npm run dev
```

Abre em http://localhost:4321. Para ver a intro de novo, acesse http://localhost:4321/?intro
(ela aparece uma vez por sessão e é pulada para quem pede menos animação no sistema).

## Adicionar um projeto novo

1. Abra `src/data/projetos.json` e copie um bloco existente.
2. Troque os campos:

| Campo | O que é |
|---|---|
| `slug` | Nome curto, sem espaços. Vira o endereço `/projetos/<slug>/`. |
| `ordem` | Posição na lista (1 = primeiro). |
| `destaque` | `true` em **um** projeto só: ele vai para o topo da página. |
| `status` | `online`, `codigo` ou `academico`. |
| `categorias` | Filtros: `web`, `jogos`, `c`, `python`, `academico`. |
| `url` | Link do site no ar (deixe `""` se não tiver). |
| `repo` | Link do GitHub. |
| `preview` | `true` se o site pode abrir dentro do portfólio (veja abaixo). |
| `capa` | `{ "tipo": "imagem", "src": "/img/projetos/<nome>" }`, `{ "tipo": "codigo", "arquivo": "...", "trecho": "..." }` ou `{ "tipo": "blocos" }`. |
| `pt` / `en` | Título, subtítulo, resumo, descrição, destaques e aviso opcional, em cada idioma. |

3. Para a capa com print: salve o PNG em `originais/<nome>.png` e rode `npm run imagens`.
   A pasta `originais/` não vai para o GitHub; só as versões otimizadas em `public/img/`.

### Preview ao vivo
Para um site abrir dentro do portfólio:
- o site **não** pode bloquear iframes (`X-Frame-Options` ou `frame-ancestors`);
- o domínio precisa estar em `frame-src` no arquivo `public/_headers`.

O FurioZOs bloqueia iframes de propósito (proteção contra clickjacking), por isso ele aparece com print.

## Trocar a foto de perfil

Em `scripts/preparar-imagens.mjs`, mude `FOTO_ATIVA` (`casa` ou `festa`) e rode `npm run imagens`.
Para uma foto nova, acrescente um item em `FOTOS` com o recorte e a área nítida (silhueta).

## Editar textos

Bio, habilidades, trajetória, contato e todos os textos fixos ficam em `src/i18n/textos.ts`.

## Publicar

O site é estático e roda no Cloudflare Pages, projeto `giorgiobazet`:
https://giorgiobazet.pages.dev

```bash
npm run deploy
```

Isso gera o build e publica uma nova versão. Precisa estar logado na Cloudflare (`npx wrangler login`).

Quando tiver domínio próprio, ligue-o no painel da Cloudflare
(**Workers & Pages → giorgiobazet → Custom domains**) e troque `site` em `astro.config.mjs`.

## Segurança

`public/_headers` aplica uma Content Security Policy rígida (só scripts do próprio site),
bloqueia o portfólio de ser embutido em outros sites e ativa HSTS. Nenhum dado pessoal
sensível (telefone, endereço, documentos) é publicado.
