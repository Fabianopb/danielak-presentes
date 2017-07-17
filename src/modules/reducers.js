import { combineReducers } from 'redux';
import { START_REQUEST, RECEIVE_PRODUCTS, SPLICE_PRODUCT, OPEN_DIALOG, CLOSE_DIALOG } from './actions';

const initialState = {
  products: {
    isFetching: false,
    activeProduct: null,
    isDialogOpen: false,
    data: [],
    formProduct: {
      name: '',
      image: '',
      storeLink: '',
      description: '',
      currentPrice: '',
      discountPrice: '',
      tags: '',
      productionTime: '',
      minAmount: '',
      width: '',
      height: '',
      depth: '',
      weight: '',
      isVisible: false,
      isFeatured: false
    }
  }
};

function productsReducer (products = initialState.products, action = {}) {
  switch (action.type) {
    case START_REQUEST:
      return {...products, isFetching: action.isFetching};
    case RECEIVE_PRODUCTS:
      return {...products, isFetching: false, data: action.data};
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
  products: productsReducer
});

export { rootReducer };
