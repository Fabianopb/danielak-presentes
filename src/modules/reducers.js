import { combineReducers } from 'redux';
import { RECEIVE_PRODUCTS } from './actions';

const initialState = {
  products: {
    isFetching: true,
    data: []
  }
};

function productsReducer (products = initialState.products, action = {}) {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {...products, isFetching: false, data: action.data};
    default:
      return products;
  }
}

const rootReducer = combineReducers({
  products: productsReducer
});

export { rootReducer };
