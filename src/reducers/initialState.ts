import { RouterActionType } from 'connected-react-router';

export const productsState: ProductsState = {
  isFetching: false,
  activeProduct: null,
  isDialogOpen: false,
  data: [],
};

export const initialState: RootState = {
  products: productsState,
  form: {},
  notifications: [],
  router: {
    location: {
      pathname: '',
      search: '',
      hash: '',
      state: null,
    },
    action: 'POP' as RouterActionType,
  },
};
