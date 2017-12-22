import {
  START_REQUEST,
  END_REQUEST,
  ERROR_REQUEST,
  RECEIVE_PRODUCTS,
  SPLICE_PRODUCT,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  SET_IMAGE_FILE,
  SET_ACTIVE_PRODUCT
} from '../actions/products';

const initialState = {
  products: {
    isFetching: false,
    activeProduct: null,
    isDialogOpen: false,
    data: [],
    imageFile: null,
    error: null
  }
};

export function productsReducer (products = initialState.products, action = {}) {
  switch (action.type) {
    case START_REQUEST:
      return {...products, isFetching: true};
    case END_REQUEST:
      return {...products, isFetching: false, imageFile: null};
    case ERROR_REQUEST:
      return {...products, isFetching: false, error: action.error};
    case RECEIVE_PRODUCTS:
      return {...products, data: action.data};
    case SPLICE_PRODUCT:
      const index = products.data.findIndex(product => product._id === action.id);
      products.data.splice(index, 1);
      return {...products, isDialogOpen: false};
    case SET_ACTIVE_PRODUCT:
      return {...products, activeProduct: action.activeProduct};
    case OPEN_DIALOG:
      return {...products, activeProduct: action.activeProduct, isDialogOpen: true};
    case CLOSE_DIALOG:
      return {...products, isDialogOpen: false};
    case SET_IMAGE_FILE:
      return {...products, imageFile: action.files};
    default:
      return products;
  }
}
