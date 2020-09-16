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
