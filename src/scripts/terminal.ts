// Terminal interativo: navega pelo portfólio com comandos (PT e EN).
import { rolarPara } from './rolagem';

type Projeto = { slug: string; titulo: string; resumo: string; url: string; repo: string; pagina: string };
type Dados = {
  lang: 'pt' | 'en';
  home: string;
  outroIdioma: string;
  contato: { email: string; github: string; linkedin: string };
  bio: string[];
  habilidades: { grupo: string; itens: string[] }[];
  projetos: Projeto[];
};

const textos = {
  pt: {
    boasVindas: 'Bem-vindo ao terminal do Giorgio.\nDigite <span class="t-acento">ajuda</span> para ver os comandos.',
    naoEncontrado: (c: string) => `Comando não encontrado: ${c}. Digite "ajuda".`,
    ajuda: [
      ['ajuda', 'mostra esta lista'],
      ['sobre', 'quem é o Giorgio'],
      ['projetos', 'lista os projetos'],
      ['abrir <n>', 'abre a página do projeto n'],
      ['site <n>', 'abre o site do projeto n numa nova aba'],
      ['habilidades', 'tecnologias que domino'],
      ['contato', 'como falar comigo'],
      ['email', 'copia meu e-mail'],
      ['ir <seção>', 'rola até projetos, sobre, trajetoria ou contato'],
      ['idioma', 'switch to English'],
      ['limpar', 'limpa a tela'],
      ['sair', 'fecha o terminal'],
    ],
    projetoInvalido: 'Projeto não encontrado. Use "projetos" para ver os números.',
    semSite: 'Este projeto ainda não tem site no ar. Abrindo o código no GitHub.',
    abrindo: 'Abrindo',
    copiado: 'E-mail copiado para a área de transferência.',
    secoes: { projetos: 'projetos', sobre: 'sobre', trajetoria: 'trajetoria', contato: 'contato' },
    sudo: 'Permissão negada. Mas a vaga de estágio ainda pode ser sua. 😉',
    dicaAbrir: 'Dica: "abrir 1" abre os detalhes, "site 1" abre o site.',
  },
  en: {
    boasVindas: 'Welcome to Giorgio\'s terminal.\nType <span class="t-acento">help</span> to see the commands.',
    naoEncontrado: (c: string) => `Command not found: ${c}. Type "help".`,
    ajuda: [
      ['help', 'show this list'],
      ['about', 'who Giorgio is'],
      ['projects', 'list the projects'],
      ['open <n>', 'open the page for project n'],
      ['site <n>', "open project n's website in a new tab"],
      ['skills', 'technologies I work with'],
      ['contact', 'how to reach me'],
      ['email', 'copy my email'],
      ['goto <section>', 'scroll to projects, about, journey or contact'],
      ['lang', 'mudar para português'],
      ['clear', 'clear the screen'],
      ['exit', 'close the terminal'],
    ],
    projetoInvalido: 'Project not found. Use "projects" to see the numbers.',
    semSite: 'This project has no live site yet. Opening the code on GitHub.',
    abrindo: 'Opening',
    copiado: 'Email copied to clipboard.',
    secoes: { projetos: 'projects', sobre: 'about', trajetoria: 'journey', contato: 'contact' },
    sudo: 'Permission denied. But the internship can still be yours. 😉',
    dicaAbrir: 'Tip: "open 1" shows the details, "site 1" opens the website.',
  },
};

// Comandos aceitos nos dois idiomas, apontando para a mesma ação.
const ALIASES: Record<string, string> = {
  ajuda: 'ajuda', help: 'ajuda', '?': 'ajuda',
  sobre: 'sobre', about: 'sobre', whoami: 'sobre',
  projetos: 'projetos', projects: 'projetos', ls: 'projetos',
  abrir: 'abrir', open: 'abrir', cd: 'abrir',
  site: 'site',
  habilidades: 'habilidades', skills: 'habilidades', stack: 'habilidades',
  contato: 'contato', contact: 'contato',
  email: 'email',
  ir: 'ir', goto: 'ir',
  idioma: 'idioma', lang: 'idioma', language: 'idioma',
  limpar: 'limpar', clear: 'limpar', cls: 'limpar',
  sair: 'sair', exit: 'sair', quit: 'sair',
  sudo: 'sudo',
  github: 'github', linkedin: 'linkedin',
};

const SECOES: Record<string, string> = {
  projetos: 'projetos', projects: 'projetos',
  sobre: 'sobre', about: 'sobre',
  trajetoria: 'trajetoria', 'trajetória': 'trajetoria', journey: 'trajetoria',
  contato: 'contato', contact: 'contato',
};

function escapar(texto: string) {
  return texto.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export function iniciarTerminal() {
  const dialogo = document.getElementById('terminal') as HTMLDialogElement | null;
  const elDados = document.getElementById('dados-terminal');
  if (!dialogo || !elDados) return;

  const dados = JSON.parse(elDados.textContent || '{}') as Dados;
  const t = textos[dados.lang];
  const saida = dialogo.querySelector<HTMLElement>('[data-saida]')!;
  const form = dialogo.querySelector<HTMLFormElement>('[data-form]')!;
  const entrada = dialogo.querySelector<HTMLInputElement>('[data-entrada]')!;
  const historico: string[] = [];
  let posicao = 0;
  let iniciado = false;

  function escrever(html: string, classe = '') {
    const linha = document.createElement('div');
    if (classe) linha.className = classe;
    linha.innerHTML = html;
    saida.appendChild(linha);
    saida.scrollTop = saida.scrollHeight;
  }

  function acharProjeto(arg: string) {
    const n = Number(arg);
    if (Number.isInteger(n) && n >= 1 && n <= dados.projetos.length) return dados.projetos[n - 1];
    return dados.projetos.find((p) => p.slug === arg.toLowerCase());
  }

  function abrirTerminal() {
    if (dialogo!.open) return;
    dialogo!.showModal();
    if (!iniciado) {
      escrever(t.boasVindas, 't-suave');
      iniciado = true;
    }
    entrada.focus();
  }

  function executar(bruto: string) {
    const linha = bruto.trim();
    escrever(escapar(linha), 't-cmd');
    if (!linha) return;
    historico.push(linha);
    posicao = historico.length;

    const [nome, ...resto] = linha.split(/\s+/);
    const arg = resto.join(' ');
    const comando = ALIASES[nome.toLowerCase()];

    switch (comando) {
      case 'ajuda': {
        const largura = Math.max(...t.ajuda.map(([c]) => c.length)) + 3;
        escrever(t.ajuda.map(([c, d]) => `<span class="t-acento">${escapar(c.padEnd(largura))}</span>${escapar(d)}`).join('\n'));
        break;
      }
      case 'sobre':
        escrever(dados.bio.map(escapar).join('\n\n'));
        break;
      case 'projetos':
        escrever(
          dados.projetos
            .map((p, i) => `<span class="t-ciano">[${i + 1}]</span> <span class="t-acento">${escapar(p.titulo)}</span>\n    <span class="t-suave">${escapar(p.resumo)}</span>`)
            .join('\n') + `\n\n<span class="t-suave">${t.dicaAbrir}</span>`,
        );
        break;
      case 'abrir': {
        const p = acharProjeto(arg);
        if (!p) return escrever(t.projetoInvalido, 't-erro');
        escrever(`${t.abrindo} ${escapar(p.titulo)}…`, 't-suave');
        window.location.href = p.pagina;
        break;
      }
      case 'site': {
        const p = acharProjeto(arg);
        if (!p) return escrever(t.projetoInvalido, 't-erro');
        if (!p.url) escrever(t.semSite, 't-suave');
        window.open(p.url || p.repo, '_blank', 'noopener');
        break;
      }
      case 'habilidades':
        escrever(dados.habilidades.map((h) => `<span class="t-ciano">${escapar(h.grupo)}</span>\n  ${h.itens.map(escapar).join(' · ')}`).join('\n'));
        break;
      case 'contato':
        escrever(
          [
            `e-mail    <a href="mailto:${dados.contato.email}">${dados.contato.email}</a>`,
            `github    <a href="${dados.contato.github}" target="_blank" rel="noopener noreferrer">${dados.contato.github.replace('https://', '')}</a>`,
            `linkedin  <a href="${dados.contato.linkedin}" target="_blank" rel="noopener noreferrer">${dados.contato.linkedin.replace('https://www.', '')}</a>`,
          ].join('\n'),
        );
        break;
      case 'email':
        navigator.clipboard?.writeText(dados.contato.email).then(
          () => escrever(t.copiado, 't-acento'),
          () => escrever(dados.contato.email),
        );
        break;
      case 'github':
      case 'linkedin':
        window.open(dados.contato[comando], '_blank', 'noopener');
        break;
      case 'ir': {
        const secao = SECOES[arg.toLowerCase()];
        if (!secao) return escrever(Object.values(t.secoes).join(' · '), 't-suave');
        dialogo!.close();
        const alvo = document.getElementById(secao);
        if (alvo) rolarPara(alvo);
        else window.location.href = `${dados.home}#${secao}`;
        break;
      }
      case 'idioma':
        window.location.href = dados.outroIdioma;
        break;
      case 'limpar':
        saida.innerHTML = '';
        break;
      case 'sair':
        dialogo!.close();
        break;
      case 'sudo':
        escrever(t.sudo, 't-ciano');
        break;
      default:
        escrever(escapar(t.naoEncontrado(nome)), 't-erro');
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    executar(entrada.value);
    entrada.value = '';
  });

  entrada.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && posicao > 0) {
      posicao--;
      entrada.value = historico[posicao];
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      posicao = Math.min(historico.length, posicao + 1);
      entrada.value = historico[posicao] ?? '';
      e.preventDefault();
    } else if (e.key === 'Tab') {
      // Autocompleta o nome do comando.
      const parcial = entrada.value.toLowerCase();
      const opcoes = t.ajuda.map(([c]) => c.split(' ')[0]).filter((c) => c.startsWith(parcial));
      if (parcial && opcoes.length === 1) entrada.value = opcoes[0] + ' ';
      e.preventDefault();
    }
  });

  document.querySelectorAll('[data-abrir-terminal]').forEach((b) => b.addEventListener('click', abrirTerminal));
  dialogo.querySelector('[data-fechar-terminal]')!.addEventListener('click', () => dialogo.close());
  dialogo.addEventListener('click', (e) => e.target === dialogo && dialogo.close());

  // Atalhos: Ctrl+K (ou Cmd+K) em qualquer lugar; ` fora de campos de texto.
  document.addEventListener('keydown', (e) => {
    const alvo = e.target as HTMLElement;
    const digitando = alvo.closest('input, textarea, [contenteditable]');
    const ctrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
    const crase = e.key === '`' && !digitando;
    if ((ctrlK || crase) && !document.documentElement.hasAttribute('data-intro')) {
      e.preventDefault();
      abrirTerminal();
    }
  });
}
