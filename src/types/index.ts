export interface Usuario {
  id: number;
  nome: string;
  email: string;
  profissao: string;
  senha?: string;
}

export interface Dica {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  dataCriacao?: string;
  autor: Usuario;
}
