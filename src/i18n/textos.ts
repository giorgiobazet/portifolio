// Todos os textos fixos do site, em português e inglês.
// Para editar a bio, as habilidades ou a trajetória, mexa só neste arquivo.

export type Idioma = 'pt' | 'en';

export const contato = {
  email: 'giorgiobazetdev@gmail.com',
  github: 'https://github.com/giorgiobazet',
  linkedin: 'https://www.linkedin.com/in/giorgio-bazet-88044931a/',
};

export const rotas = {
  pt: { home: '/', projeto: (slug: string) => `/projetos/${slug}/` },
  en: { home: '/en/', projeto: (slug: string) => `/en/projects/${slug}/` },
};

// Tecnologias da faixa que corre abaixo do topo.
export const faixaStack = [
  'JavaScript', 'React', 'Angular', 'HTML & CSS', 'Tailwind CSS', 'Python', 'FastAPI',
  'C', 'C++', 'SQL', 'PostgreSQL', 'Firebase', 'Cloudflare Workers', 'Git',
];

// Seção de habilidades. `usa` lista os nomes que aparecem em `tecnologias`
// no projetos.json: o site mostra sozinho em quais projetos cada uma foi usada.
export const stack = [
  {
    grupo: { pt: 'Front-end', en: 'Front end' },
    itens: [
      { nome: 'JavaScript', sigla: 'JS', usa: ['JavaScript', 'TypeScript'], pt: 'Lógica de interface, interações e jogos no navegador.', en: 'Interface logic, interactions and browser games.' },
      { nome: 'HTML & CSS', sigla: '</>', usa: ['HTML', 'CSS'], pt: 'Layouts responsivos e acessíveis, sem depender de framework.', en: 'Responsive, accessible layouts, no framework required.' },
      { nome: 'React', sigla: 'Re', usa: ['React', 'Next.js'], pt: 'Interfaces com componentes, Next.js e animações.', en: 'Component-based interfaces, Next.js and animation.' },
      { nome: 'Angular', sigla: 'Ng', usa: [], pt: 'Desenvolvimento front-end e manutenção de sistemas legados.', en: 'Front-end development and legacy system maintenance.' },
      { nome: 'Tailwind CSS', sigla: 'Tw', usa: ['Tailwind CSS'], pt: 'Estilização rápida e consistente.', en: 'Fast, consistent styling.' },
    ],
  },
  {
    grupo: { pt: 'Back-end e linguagens', en: 'Back end and languages' },
    itens: [
      { nome: 'Python', sigla: 'Py', usa: ['Python'], pt: 'APIs, automação de tarefas e análise de dados.', en: 'APIs, task automation and data analysis.' },
      { nome: 'FastAPI', sigla: 'API', usa: ['FastAPI'], pt: 'APIs REST rápidas, com validação de dados.', en: 'Fast REST APIs with data validation.' },
      { nome: 'C', sigla: 'C', usa: ['C'], pt: 'Lógica, ponteiros, memória e estruturas de dados.', en: 'Logic, pointers, memory and data structures.' },
      { nome: 'C++', sigla: 'C++', usa: [], pt: 'Orientação a objetos e desempenho.', en: 'Object-oriented programming and performance.' },
      { nome: 'SQL', sigla: 'SQL', usa: ['PostgreSQL', 'SQLAlchemy'], pt: 'Modelagem e consultas em bancos relacionais.', en: 'Relational modeling and queries.' },
    ],
  },
  {
    grupo: { pt: 'Infra e segurança', en: 'Infra and security' },
    itens: [
      { nome: 'Firebase', sigla: 'Fb', usa: ['Firebase Auth', 'Firestore'], pt: 'Autenticação, banco de dados e regras de acesso.', en: 'Authentication, database and access rules.' },
      { nome: 'Cloudflare Workers', sigla: 'CF', usa: ['Cloudflare Workers'], pt: 'Back-end na borda, rate limit e integrações seguras.', en: 'Edge back end, rate limiting and secure integrations.' },
      { nome: 'Vercel e Render', sigla: '▲', usa: ['Vercel', 'Render'], pt: 'Deploy de front-ends e APIs.', en: 'Deploying front ends and APIs.' },
      { nome: 'Git e GitHub', sigla: 'Git', usa: ['*'], pt: 'Versionamento de todos os projetos.', en: 'Version control for every project.' },
    ],
  },
];

export const textos = {
  pt: {
    meta: {
      titulo: 'Giorgio Bazet · Desenvolvedor',
      descricao:
        'Portfólio de Giorgio Bazet, estudante de Ciência da Computação na UERJ e de Gestão de TI na UVA. Projetos web, jogos, C e Python.',
    },
    nav: { projetos: 'Projetos', stack: 'Stack', sobre: 'Sobre', trajetoria: 'Trajetória', contato: 'Contato', terminal: 'Terminal' },
    intro: {
      linhas: [
        'iniciando portfolio.giorgio',
        'carregando projetos ............ 9',
        'carregando stack ............... 14',
        'verificando formação ........... UERJ · UVA',
        'sistema pronto.',
      ],
      papel: 'Desenvolvedor · Ciência da Computação',
      entrar: 'Entrar',
      pular: 'Pular intro',
    },
    hero: {
      selo: 'Disponível para estágio',
      linhas: ['Código limpo.', 'Sistemas seguros.'],
      realce: 'Ideias no ar.',
      texto:
        'Sou Giorgio Bazet, estudante de Ciência da Computação na UERJ e de Gestão de TI na UVA. Transformo ideias em produtos web rápidos, seguros e fáceis de usar, da interface ao pagamento.',
      ctaProjetos: 'Ver projetos',
      ctaTerminal: 'Abrir terminal',
      dica: 'ou aperte',
      cargo: 'Desenvolvedor em formação',
      leituras: [
        ['status', 'online'],
        ['base', 'Rio de Janeiro'],
        ['foco', 'web · segurança · IA'],
      ],
    },
    destaque: { rotulo: 'Projeto em destaque', visitar: 'Visitar site', detalhes: 'Ver detalhes' },
    projetos: {
      numero: '01',
      titulo: 'Projetos',
      frase1: 'Projetos',
      frase2: 'selecionados.',
      subtitulo: 'Do checkout com Pix ao Pac-Man rodando no terminal. Os projetos que estão no ar abrem aqui mesmo, em preview ao vivo.',
      filtros: { todos: 'Todos', web: 'Web', jogos: 'Jogos', c: 'C', python: 'Python', academico: 'Acadêmico' },
      status: { online: 'No ar', codigo: 'Código', academico: 'Em desenvolvimento' },
      preview: 'Preview ao vivo',
      abrir: 'Abrir site',
      codigo: 'Código',
      detalhes: 'Detalhes',
      proximo: { titulo: 'Próximo projeto', texto: 'Em construção. Novidades em breve.' },
    },
    habilidades: {
      numero: '02',
      titulo: 'Habilidades',
      frase1: 'Stack',
      frase2: 'técnica.',
      subtitulo: 'As ferramentas que uso no dia a dia e onde cada uma aparece nos meus projetos.',
      usadoEm: 'Usado em',
      estudo: 'Estudos e disciplinas',
      todos: 'Todos os projetos',
      idiomas: 'Idiomas',
      idiomasLista: [
        ['Português', 'nativo'],
        ['Inglês', 'B2 · Cambridge'],
      ],
    },
    principios: {
      numero: '03',
      titulo: 'Como eu trabalho',
      frase1: 'Como eu',
      frase2: 'trabalho.',
      itens: [
        {
          icone: 'escudo',
          titulo: 'Segurança primeiro',
          texto: 'Chaves fora do navegador, validação no servidor e dados pessoais protegidos. Segurança entra no projeto desde a primeira linha, não no final.',
        },
        {
          icone: 'clareza',
          titulo: 'Clareza no código',
          texto: 'Nomes que se explicam, estrutura previsível e interfaces que dispensam manual. O que é fácil de ler é fácil de manter e de evoluir.',
        },
        {
          icone: 'livro',
          titulo: 'Aprender ensinando',
          texto: 'Dou aulas, organizo oficinas e documento o que construo. Explicar um conceito é a forma mais rápida de dominá-lo.',
        },
      ],
    },
    sobre: {
      numero: '04',
      titulo: 'Sobre mim',
      frase1: 'Quem está',
      frase2: 'por trás do código.',
      bio: [
        'Estudo Ciência da Computação na UERJ e Gestão de TI na UVA. Antes de escrever código, procuro entender o problema por inteiro. Depois, entrego a solução mais simples que resolve de verdade.',
        'No front-end, trabalho com HTML, CSS, JavaScript, React e Angular. No back-end e na base da computação, com Python, C, C++ e SQL. Hoje meu foco é aprofundar Python em automação e dados e seguir evoluindo em segurança da informação e inteligência artificial.',
        'Ensinar sempre fez parte do caminho: concluí o ensino médio em Formação de Professores, presidi o Diretório Acadêmico de Computação da UERJ e, em 2026, dou aulas de inglês no pré-vestibular da UERJ Zona Oeste.',
      ],
      numeros: [
        { valor: '90+', rotulo: 'programas em C' },
        { valor: '2', rotulo: 'graduações em andamento' },
        { valor: '9', rotulo: 'projetos publicados' },
        { valor: '6', rotulo: 'aprovações em concursos e vestibulares' },
      ],
      foto: 'Foto de Giorgio Bazet',
    },
    trajetoria: {
      numero: '05',
      titulo: 'Trajetória',
      frase1: 'Linha do',
      frase2: 'tempo.',
      itens: [
        { quando: '2026', tipo: 'Ensino', titulo: 'Professor de inglês · Pré-vestibular UERJ-ZO', texto: 'Aulas de inglês para estudantes que se preparam para o vestibular, no pré-vestibular da UERJ Zona Oeste.' },
        { quando: '2026', tipo: 'Certificação', titulo: 'Inglês B2 · Cambridge Linguaskill', texto: 'Certificação internacional com média 169 na escala Cambridge e nível B2 em compreensão oral, leitura, fala e escrita.' },
        { quando: '2026 – 2029', tipo: 'Formação', titulo: 'Gestão de TI · UVA', texto: 'Curso superior de tecnologia em Gestão de Projetos de TI na Universidade Veiga de Almeida.' },
        { quando: '2025 – 2026', tipo: 'Liderança', titulo: 'Presidente do Diretório Acadêmico de Computação · UERJ-ZO', texto: 'Representei os estudantes de Computação nos conselhos do Departamento de Computação e da Faculdade de Ciências Exatas e Engenharias, e organizei oficinas e palestras de tecnologia.' },
        { quando: '2025 – 2026', tipo: 'Extensão', titulo: 'Projeto de extensão Vem Pra Cota · UERJ', texto: 'Participação na 1ª edição (2025) e na 2ª edição (2026), com trabalho de campo como representante da Zona Oeste.' },
        { quando: '2025 – 2029', tipo: 'Formação', titulo: 'Ciência da Computação · UERJ', texto: 'Bacharelado na Universidade do Estado do Rio de Janeiro, unidade Zona Oeste.' },
        { quando: '2025', tipo: 'Certificação', titulo: 'Curso de inglês · CNA', texto: 'Curso completo de inglês, concluído em dezembro de 2025.' },
        { quando: '2024', tipo: 'Formação', titulo: 'Ensino Médio · Formação de Professores', texto: 'Instituto de Educação Geraldo de Almeida. Onde aprendi a ensinar e a me comunicar com clareza.' },
      ],
    },
    contato: {
      numero: '06',
      titulo1: 'Vamos construir',
      titulo2: 'algo juntos?',
      texto: 'Vaga de estágio, projeto ou uma boa ideia: me mande uma mensagem. Respondo todas.',
      copiar: 'Copiar e-mail',
      copiado: 'E-mail copiado',
    },
    rodape: {
      feito: 'Feito com Astro e hospedado na Cloudflare.',
      terminal: 'Aperte Ctrl + K para abrir o terminal',
      frase: 'Código limpo. Sistemas seguros. Ideias no ar.',
      navegar: 'Navegar',
      redes: 'Contato',
      topo: 'Voltar ao topo',
    },
    projeto: {
      voltar: 'Voltar aos projetos',
      sobre: 'Sobre o projeto',
      destaques: 'Destaques técnicos',
      stack: 'Tecnologias',
      preview: 'Preview ao vivo',
      carregarPreview: 'Carregar preview ao vivo',
      previewAviso: 'O site abre aqui dentro. Ele é carregado só quando você clicar.',
      bloqueado: 'Por segurança, este site não permite ser exibido dentro de outras páginas. Abra-o em uma nova aba.',
      anterior: 'Anterior',
      proximo: 'Próximo',
    },
    terminal: {
      titulo: 'terminal',
      boasVindas: 'Bem-vindo ao terminal do Giorgio. Digite "ajuda" para ver os comandos.',
      placeholder: 'digite um comando…',
      fechar: 'Fechar',
    },
    idiomaOutro: { rotulo: 'EN', nome: 'English' },
  },
  en: {
    meta: {
      titulo: 'Giorgio Bazet · Developer',
      descricao:
        'Portfolio of Giorgio Bazet, Computer Science student at UERJ and IT Management student at UVA. Web projects, games, C and Python.',
    },
    nav: { projetos: 'Projects', stack: 'Stack', sobre: 'About', trajetoria: 'Journey', contato: 'Contact', terminal: 'Terminal' },
    intro: {
      linhas: [
        'booting portfolio.giorgio',
        'loading projects ............... 9',
        'loading stack .................. 14',
        'checking education ............. UERJ · UVA',
        'system ready.',
      ],
      papel: 'Developer · Computer Science',
      entrar: 'Enter',
      pular: 'Skip intro',
    },
    hero: {
      selo: 'Open to internships',
      linhas: ['Clean code.', 'Secure systems.'],
      realce: 'Ideas shipped.',
      texto:
        "I'm Giorgio Bazet, a Computer Science student at UERJ and an IT Management student at UVA. I turn ideas into fast, secure and easy-to-use web products, from the interface to the checkout.",
      ctaProjetos: 'See projects',
      ctaTerminal: 'Open terminal',
      dica: 'or press',
      cargo: 'Developer in training',
      leituras: [
        ['status', 'online'],
        ['base', 'Rio de Janeiro'],
        ['focus', 'web · security · AI'],
      ],
    },
    destaque: { rotulo: 'Featured project', visitar: 'Visit site', detalhes: 'See details' },
    projetos: {
      numero: '01',
      titulo: 'Projects',
      frase1: 'Selected',
      frase2: 'projects.',
      subtitulo: 'From a Pix checkout to Pac-Man running in the terminal. Live projects open right here, as a live preview.',
      filtros: { todos: 'All', web: 'Web', jogos: 'Games', c: 'C', python: 'Python', academico: 'Academic' },
      status: { online: 'Live', codigo: 'Code', academico: 'In development' },
      preview: 'Live preview',
      abrir: 'Open site',
      codigo: 'Code',
      detalhes: 'Details',
      proximo: { titulo: 'Next project', texto: 'Under construction. More soon.' },
    },
    habilidades: {
      numero: '02',
      titulo: 'Skills',
      frase1: 'Tech',
      frase2: 'stack.',
      subtitulo: 'The tools I use every day, and where each one shows up in my projects.',
      usadoEm: 'Used in',
      estudo: 'Coursework and studies',
      todos: 'Every project',
      idiomas: 'Languages',
      idiomasLista: [
        ['Portuguese', 'native'],
        ['English', 'B2 · Cambridge'],
      ],
    },
    principios: {
      numero: '03',
      titulo: 'How I work',
      frase1: 'How I',
      frase2: 'work.',
      itens: [
        {
          icone: 'escudo',
          titulo: 'Security first',
          texto: 'Keys kept out of the browser, server-side validation and protected personal data. Security goes in from the first line, not at the end.',
        },
        {
          icone: 'clareza',
          titulo: 'Clear code',
          texto: "Self-explanatory names, predictable structure and interfaces that don't need a manual. What is easy to read is easy to maintain and grow.",
        },
        {
          icone: 'livro',
          titulo: 'Learning by teaching',
          texto: 'I teach, run workshops and document what I build. Explaining a concept is the fastest way to master it.',
        },
      ],
    },
    sobre: {
      numero: '04',
      titulo: 'About me',
      frase1: 'The person',
      frase2: 'behind the code.',
      bio: [
        "I study Computer Science at UERJ and IT Management at UVA. Before writing any code, I make sure I understand the whole problem. Then I ship the simplest solution that actually solves it.",
        "On the front end, I work with HTML, CSS, JavaScript, React and Angular. On the back end and computing fundamentals, with Python, C, C++ and SQL. Right now I'm going deeper into Python for automation and data, and growing in information security and artificial intelligence.",
        "Teaching has always been part of the path: I finished a teacher-training high school program, served as president of UERJ's Computer Science Student Council and, in 2026, I teach English at UERJ West Zone's college-prep course.",
      ],
      numeros: [
        { valor: '90+', rotulo: 'programs in C' },
        { valor: '2', rotulo: 'degrees in progress' },
        { valor: '9', rotulo: 'published projects' },
        { valor: '6', rotulo: 'admissions and civil service exams passed' },
      ],
      foto: 'Photo of Giorgio Bazet',
    },
    trajetoria: {
      numero: '05',
      titulo: 'Journey',
      frase1: 'My',
      frase2: 'timeline.',
      itens: [
        { quando: '2026', tipo: 'Teaching', titulo: 'English teacher · UERJ-ZO college-prep course', texto: 'English classes for students preparing for university entrance exams at UERJ West Zone.' },
        { quando: '2026', tipo: 'Certification', titulo: 'English B2 · Cambridge Linguaskill', texto: 'International certification with an average of 169 on the Cambridge English Scale and B2 in listening, reading, speaking and writing.' },
        { quando: '2026 – 2029', tipo: 'Education', titulo: 'IT Management · UVA', texto: 'Associate degree in IT Project Management at Universidade Veiga de Almeida.' },
        { quando: '2025 – 2026', tipo: 'Leadership', titulo: 'President of the Computer Science Student Council · UERJ-ZO', texto: 'Represented Computer Science students on the Computer Science Department and School of Exact Sciences and Engineering councils, and organized tech workshops and talks.' },
        { quando: '2025 – 2026', tipo: 'Outreach', titulo: 'Vem Pra Cota outreach program · UERJ', texto: 'Took part in the 1st edition (2025) and the 2nd edition (2026), doing fieldwork as the West Zone representative.' },
        { quando: '2025 – 2029', tipo: 'Education', titulo: 'Computer Science · UERJ', texto: "Bachelor's degree at Rio de Janeiro State University, West Zone campus." },
        { quando: '2025', tipo: 'Certification', titulo: 'English course · CNA', texto: 'Full English course, completed in December 2025.' },
        { quando: '2024', tipo: 'Education', titulo: 'High school · Teacher training', texto: 'Instituto de Educação Geraldo de Almeida. Where I learned to teach and to communicate clearly.' },
      ],
    },
    contato: {
      numero: '06',
      titulo1: "Let's build",
      titulo2: 'something together?',
      texto: 'An internship, a project or a good idea: send me a message. I reply to every one.',
      copiar: 'Copy email',
      copiado: 'Email copied',
    },
    rodape: {
      feito: 'Built with Astro, hosted on Cloudflare.',
      terminal: 'Press Ctrl + K to open the terminal',
      frase: 'Clean code. Secure systems. Ideas shipped.',
      navegar: 'Navigate',
      redes: 'Contact',
      topo: 'Back to top',
    },
    projeto: {
      voltar: 'Back to projects',
      sobre: 'About the project',
      destaques: 'Technical highlights',
      stack: 'Tech stack',
      preview: 'Live preview',
      carregarPreview: 'Load live preview',
      previewAviso: 'The site opens right here. It only loads when you click.',
      bloqueado: 'For security, this site refuses to be shown inside other pages. Open it in a new tab.',
      anterior: 'Previous',
      proximo: 'Next',
    },
    terminal: {
      titulo: 'terminal',
      boasVindas: 'Welcome to Giorgio\'s terminal. Type "help" to see the commands.',
      placeholder: 'type a command…',
      fechar: 'Close',
    },
    idiomaOutro: { rotulo: 'PT', nome: 'Português' },
  },
} as const;
