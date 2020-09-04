export const categorySelectors = {
  categories: (state: RootState) => state.categories.data,
};

export const productSelectors = {
  products: (state: RootState) => state.products.data,
  productImages: (state: RootState) =>
    (state.products.activeProduct as Product).image,
};

export const routeSelectors = {
  search: (state: RootState) => state.router.location.search,
};

export const messageSelectors = {
  messages: (state: RootState) => state.messages.data,
};
