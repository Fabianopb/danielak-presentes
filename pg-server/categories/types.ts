export type Category = {
  id: string;
  name: string;
  description: string;
  removed: boolean;
  createdAt: Date;
};

export type CategoryPayload = Omit<Category, 'id' | 'createdAt'>;
