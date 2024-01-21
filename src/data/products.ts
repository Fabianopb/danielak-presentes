import { CategoryId } from './categories';

export type Product = {
  id: string;
  nome: string;
  linkElo7: string | null;
  descricao: string;
  categoria: CategoryId;
  preco: number;
  precoDesconto: number | null;
  diasProducao: number;
  minimoPedido: number;
  larguraEmCm: number;
  alturaEmCm: number;
  profundidadeEmCm: number;
  pesoEmGramas: number;
  imagens: {
    large: string;
    small: string;
  }[];
};
