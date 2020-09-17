export type ClientImage = {
  large: string;
  small: string;
  loading?: boolean;
};

export type MongoProduct = {
  _id: string;
  name: string;
  image: ClientImage[];
  featuredImageIndex: number;
  storeLink: string;
  description: string;
  category: string;
  currentPrice: number;
  discountPrice: number;
  tags: string;
  productionTime: number;
  minAmount: number;
  width: number;
  height: number;
  depth: number;
  weight: number;
  isVisible: boolean;
  isFeatured: boolean;
};

export type MongoCategory = {
  _id?: string;
  name: string;
  description: string;
  removed: boolean;
};
