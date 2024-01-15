export type CategoryId = 'papeis-especiais' | 'jogo-de-runas';

export type Category = {
  id: CategoryId;
  name: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: 'papeis-especiais',
    name: 'Papéis especiais',
    description: 'Caixas em tamanhos diversos, confeccionadas em cartonagem, revestidas com papéis especiais',
  },
  {
    id: 'jogo-de-runas',
    name: 'Jogo De Runas',
    description: 'Jogo de Runas confeccnionado em madeira natural',
  },
];
