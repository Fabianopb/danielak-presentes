export type ClientImage = {
  large: string;
  small: string;
  loading?: boolean;
};

export type MongoCategory = {
  _id?: string;
  name: string;
  description: string;
  removed: boolean;
};
