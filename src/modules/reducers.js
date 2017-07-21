import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { START_REQUEST, RECEIVE_PRODUCTS, RECEIVE_ONE_PRODUCT, SPLICE_PRODUCT, OPEN_DIALOG, CLOSE_DIALOG } from './actions';

const initialState = {
  products: {
    isFetching: false,
    activeProduct: null,
    isDialogOpen: false,
    data: []
  }
};

function productsReducer (products = initialState.products, action = {}) {
  switch (action.type) {
    case START_REQUEST:
      return {...products, isFetching: action.isFetching};
    case RECEIVE_PRODUCTS:
      return {...products, isFetching: false, data: action.data};
    case RECEIVE_ONE_PRODUCT:
      return {...products, isFetching: false, activeProduct: action.activeProduct};
    case SPLICE_PRODUCT:
      const index = products.data.findIndex(product => product._id === action.id);
      products.data.splice(index, 1);
      return {...products, isFetching: false, isDialogOpen: false};
    case OPEN_DIALOG:
      return {...products, activeProduct: action.activeProduct, isDialogOpen: true};
    case CLOSE_DIALOG:
      return {...products, isDialogOpen: false};
    default:
      return products;
  }
}

const rootReducer = combineReducers({
  products: productsReducer,
  form: formReducer
});

export { rootReducer };
