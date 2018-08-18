import { PRODUCT_FORM } from '../forms/Product/Product';

export const categorySelectors = {
  categories: (state: RootState) => state.categories.data
};

export const productSelectors = {
  products: (state: RootState) => state.products.data,
  productImages: (state: RootState) => (state.products.activeProduct as Product).image
};

export const formSelectors = {
  [PRODUCT_FORM]: (state: RootState) => state.form[PRODUCT_FORM]
};
