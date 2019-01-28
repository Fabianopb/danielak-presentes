import { RouterActionType } from 'connected-react-router';

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
  data: []
};

export const messagesState: MessagesState = {
  isFetching: false,
  data: [],
  activeMessageId: undefined
};

export const usersState: UsersState = {
  isLogging: false
};

export const initialState: RootState = {
  categories: categoriesState,
  products: productsState,
  messages: messagesState,
  users: usersState,
  form: {},
  notifications: [],
  router: {
    location: {
      pathname: '',
      search: '',
      hash: '',
      state: null
    },
    action: "POP" as RouterActionType.POP
  }
};
