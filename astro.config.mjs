import { defineConfig } from 'astro/config';

// Troque `site` pelo domínio definitivo quando ele existir.
export default defineConfig({
  site: 'https://giorgiobazet.pages.dev',
  build: {
    format: 'directory',
    // Nada inline: a Content Security Policy (public/_headers) só aceita scripts do próprio site.
    inlineStylesheets: 'never',
  },
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});