// Acesso tipado ao projetos.json. Para adicionar um projeto, edite só o JSON.
import dados from './projetos.json';

type Conteudo = {
  titulo: string;
  subtitulo: string;
  resumo: string;
  descricao: string[];
  destaques: string[];
  aviso?: string;
};

export type Projeto = {
  slug: string;
  ordem: number;
  destaque: boolean;
  ano: number;
  status: 'online' | 'codigo' | 'academico';
  categorias: string[];
  url: string;
  repo: string;
  preview: boolean;
  capa: { tipo: 'imagem' | 'codigo' | 'blocos'; src?: string; arquivo?: string; trecho?: string };
  tecnologias: string[];
  pt: Conteudo;
  en: Conteudo;
};

export const projetos = ([...dados] as Projeto[]).sort((a, b) => a.ordem - b.ordem);
export const projetoDestaque = projetos.find((p) => p.destaque) ?? projetos[0];
