import axios from 'axios';
import history from './history';
import { initialize } from 'redux-form';

export const START_REQUEST = 'START_REQUEST';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const RECEIVE_ONE_PRODUCT = 'RECEIVE_ONE_PRODUCT';
export const SPLICE_PRODUCT = 'SPLICE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

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

function receiveOneProduct (activeProduct) {
  return {
    type: RECEIVE_ONE_PRODUCT,
    activeProduct
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

export function fetchProducts (productId) {
  return (dispatch) => {
    dispatch(startRequest());
    if (productId) {
      return axios.get(`/api/products?_id=${productId}`)
        .then(response => dispatch(receiveOneProduct(response.data)))
        .then(response => dispatch(initialize('editProductForm', response.activeProduct)))
        .catch(error => console.log(error));
    }
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
