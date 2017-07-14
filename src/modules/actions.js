import axios from 'axios';

export const RECEIVE_PRODUCTS = () => ({type: 'RECEIVE_PRODUCTS'});
export const OPEN_DIALOG = (activeProduct) => ({type: 'OPEN_DIALOG', activeProduct});
export const CLOSE_DIALOG = () => ({type: 'CLOSE_DIALOG'});
export const SPLICE_PRODUCT = () => ({type: 'SPLICE_PRODUCT'});

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
      .then(response => dispatch(receiveProducts(response)))
      .catch(error => console.log(error));
  };
}

function spliceProduct (response) {
  console.log('response to splice', response);
  return {
    type: SPLICE_PRODUCT
  };
}

export function deleteProduct (id) {
  return (dispatch) => {
    return axios.delete(`/api/products/${id}`)
      .then(response => dispatch(spliceProduct(response)))
      .catch(error => console.log(error));
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
