import { ProductActionsEnum, ProductActions } from '../actions/products';

const productsState: ProductsState = {
  isFetching: false,
  activeProduct: null,
  isDialogOpen: false,
  data: [],
  error: null
};

export const productsReducer = (products: ProductsState = productsState, action: ProductActions): ProductsState => {
  switch (action.type) {
    case ProductActionsEnum.START_REQUEST:
      return {...products, isFetching: true};
    case ProductActionsEnum.END_REQUEST:
      return {...products, isFetching: false};
    case ProductActionsEnum.ERROR_REQUEST:
      return {...products, isFetching: false, error: action.payload};
    case ProductActionsEnum.RECEIVE_PRODUCTS:
      return {...products, data: action.payload};
    case ProductActionsEnum.SET_ACTIVE_PRODUCT:
      return {...products, activeProduct: action.payload};
    case ProductActionsEnum.OPEN_DIALOG:
      return {...products, activeProduct: action.payload, isDialogOpen: true};
    case ProductActionsEnum.CLOSE_DIALOG:
      return {...products, isDialogOpen: false};
    default:
      return products;
  }
}
