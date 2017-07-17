import axios from 'axios';
import history from './history';

export const START_REQUEST = () => ({type: 'START_REQUEST'});
export const RECEIVE_PRODUCTS = () => ({type: 'RECEIVE_PRODUCTS'});
export const SPLICE_PRODUCT = () => ({type: 'SPLICE_PRODUCT'});
export const ADD_PRODUCT = () => ({type: 'ADD_PRODUCT'});
export const OPEN_DIALOG = (activeProduct) => ({type: 'OPEN_DIALOG', activeProduct});
export const CLOSE_DIALOG = () => ({type: 'CLOSE_DIALOG'});

function startRequest () {
  return {
    type: START_REQUEST,
    isFetching: true
  };
}

function receiveProducts (data) {
  return {
    type: RECEIVE_PRODUCTS,
    data
  };
}

function spliceProduct (id) {
  return {
    type: SPLICE_PRODUCT,
    id
  };
}

function redirectTo (route) {
  history.push(route);
}

export function fetchProducts () {
  return (dispatch) => {
    dispatch(startRequest());
    return axios.get(`/api/products`)
      .then(response => dispatch(receiveProducts(response.data)))
      .catch(error => console.log(error));
  };
}

export function postProduct (product) {
  return (dispatch) => {
    dispatch(startRequest());
    return axios.post(`/api/products`, product)
      .then(response => dispatch(redirectTo('/admin')))
      .catch(error => console.log(error));
  };
}

export function deleteProduct (id) {
  return (dispatch) => {
    dispatch(startRequest());
    return axios.delete(`/api/products/${id}`)
      .then(() => dispatch(spliceProduct(id)))
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
