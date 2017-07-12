import { combineReducers } from 'redux';
import { RECEIVE_PRODUCTS, OPEN_DIALOG, CLOSE_DIALOG } from './actions';

const initialState = {
  products: {
    isFetching: true,
    activeProduct: null,
    isDialogOpen: false,
    data: []
  }
};

function productsReducer (products = initialState.products, action = {}) {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {...products, isFetching: false, data: action.data};
    case OPEN_DIALOG:
      return {...products, activeProduct: action.activeProduct, isDialogOpen: true};
    case CLOSE_DIALOG:
      return {...products, isDialogOpen: false};
    default:
      return products;
  }
}

const rootReducer = combineReducers({
  products: productsReducer
});

export { rootReducer };
