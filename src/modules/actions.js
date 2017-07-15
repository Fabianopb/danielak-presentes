import axios from 'axios';

export const RECEIVE_PRODUCTS = () => ({type: 'RECEIVE_PRODUCTS'});
export const OPEN_DIALOG = (activeProduct) => ({type: 'OPEN_DIALOG', activeProduct});
export const CLOSE_DIALOG = () => ({type: 'CLOSE_DIALOG'});
export const SPLICE_PRODUCT = () => ({type: 'SPLICE_PRODUCT'});

function receiveProducts (data) {
  return {
    type: RECEIVE_PRODUCTS,
    payload: {data}
  };
}

function spliceProduct (id) {
  return {
    type: SPLICE_PRODUCT,
    payload: {id}
  };
}

export function fetchProducts () {
  return (dispatch) => {
    return axios.get(`/api/products`)
      .then(response => dispatch(receiveProducts(response.data)))
      .catch(error => console.log(error));
  };
}

export function deleteProduct (id) {
  return (dispatch) => {
    return axios.delete(`/api/products/${id}`)
      .then(() => dispatch(spliceProduct(id)),
        error => console.log(error));
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
