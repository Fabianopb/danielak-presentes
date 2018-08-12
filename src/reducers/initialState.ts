export const categoriesState: CategoriesState = {
  isFetching: false,
  data: [],
  isDialogOpen: false,
  activeCategory: null
};

export const productsState: ProductsState = {
  isFetching: false,
  activeProduct: null,
  isDialogOpen: false,
  data: [],
  error: null
};

export const usersState: UsersState = {
  isLogging: false,
  error: null
};

export const initialState: RootState = {
  categories: categoriesState,
  products: productsState,
  users: usersState,
  form: {},
  notifications: []
};
