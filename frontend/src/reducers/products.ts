import { ProductActionsEnum, ProductActions } from '../actions/products';
import { productsState } from './initialState';

const productsReducer = (products = productsState, action: ProductActions): ProductsState => {
  switch (action.type) {
    case ProductActionsEnum.START_REQUEST:
      return {...products, isFetching: true};
    case ProductActionsEnum.END_REQUEST:
      return {...products, isFetching: false};
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
};

export default productsReducer;
