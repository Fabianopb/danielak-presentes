import axios from 'axios';

export const RECEIVE_PRODUCTS = () => ({type: 'RECEIVE_PRODUCTS'});
export const OPEN_DIALOG = (activeProduct) => ({type: 'RECEIVE_PRODUCTS', activeProduct});
export const CLOSE_DIALOG = () => ({type: 'RECEIVE_PRODUCTS'});

function receiveProducts (response) {
  return {
    type: RECEIVE_PRODUCTS,
    data: response.data,
    receivedAt: Date.now()
  };
}

export function fetchProducts () {
  return (dispatch) => {
    return axios.get(`/api/products`)
      .then(response => dispatch(receiveProducts(response)));
  };
}

export function openDialog (activeProduct) {
  return {
    type: OPEN_DIALOG,
    activeProduct
  };
}

export function closeDialog () {
  return {
    type: CLOSE_DIALOG
  };
}
