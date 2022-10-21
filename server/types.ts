export type User = {
  id: string;
  email: string;
  salt: string;
  hash: string;
};

export type Product = {
  _id: string;
  name: string;
  featuredImageIndex: number;
  storeLink?: string;
  description: string;
  categoryId: string;
  currentPrice: number;
  discountPrice?: number;
  tags: string;
  productionTime: number;
  minAmount: number;
  width: number;
  height: number;
  depth: number;
  weight: number;
  isVisible: boolean;
  isFeatured: boolean;
  images: {
    large: string;
    small: string;
  }[];
  createdAt: Date;
};

export type ProductPayload = Omit<Product, '_id' | 'createdAt'>;

export type Message = {
  _id: string;
  text: string[];
  isNew: boolean;
  isAnswered: boolean;
  createdAt: Date;
};

export type MessagePayload = Omit<Message, '_id' | 'createdAt'>;

export type Category = {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
};

export type CategoryPayload = Omit<Category, '_id' | 'createdAt' | 'removed'>;
