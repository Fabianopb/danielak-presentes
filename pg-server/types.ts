export type User = {
  id: string;
  email: string;
  salt: string;
  hash: string;
};

export type Product = {
  id: string;
  name: string;
  featuredImageIndex: number;
  storeLink?: string;
  description: string;
  categoryId: string;
  currentPrice: number;
  discountPrice?: number;
  tags: string[];
  productionTime: number;
  minAmount: number;
  width: number;
  height: number;
  depth: number;
  weight: number;
  isVisible: boolean;
  isFeatured: boolean;
  images: string[];
  createdAt: Date;
};

export type ProductPayload = Omit<Product, 'id' | 'createdAt'>;

export type Message = {
  id: string;
  text: string[];
  isNew: boolean;
  isAnswered: boolean;
  createdAt: Date;
};

export type MessagePayload = Omit<Message, 'id' | 'createdAt'>;

export type Category = {
  id: string;
  name: string;
  description: string;
  removed: boolean;
  createdAt: Date;
};

export type CategoryPayload = Omit<Category, 'id' | 'createdAt'>;
