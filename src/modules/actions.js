import axios from 'axios';
import history from './history';
import { initialize } from 'redux-form';

export const START_REQUEST = 'START_REQUEST';
export const END_REQUEST = 'END_REQUEST';
export const ERROR_REQUEST = 'ERROR_REQUEST';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const SPLICE_PRODUCT = 'SPLICE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

function startRequest () {
  return {
    type: START_REQUEST
  };
}

function receiveProducts (data) {
  return {
    type: RECEIVE_PRODUCTS,
    data
  };
}

function endRequest () {
  return {
    type: END_REQUEST
  };
}

function spliceProduct (id) {
  return {
    type: SPLICE_PRODUCT,
    id
  };
}

function handleError (error) {
  return {
    type: ERROR_REQUEST,
    error
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
        .then(response => dispatch(initialize('editProductForm', response.data[0])))
        .then(() => dispatch(endRequest()))
        .catch(error => dispatch(handleError(error)));
    }
    return axios.get(`/api/products`)
      .then(response => dispatch(receiveProducts(response.data)))
      .then(() => dispatch(endRequest()))
      .catch(error => dispatch(handleError(error)));
  };
}

export function postProduct (product) {
  return (dispatch) => {
    dispatch(startRequest());
    return axios.post(`/api/products`, product)
      .then(response => dispatch(redirectTo('/admin')))
      .then(() => dispatch(endRequest()))
      .catch(error => dispatch(handleError(error)));
  };
}

export function putProduct (product) {
  return (dispatch) => {
    dispatch(startRequest());
    return axios.put(`/api/products/${product._id}`, product)
      .then(response => dispatch(redirectTo('/admin')))
      .then(() => dispatch(endRequest()))
      .catch(error => dispatch(handleError(error)));
  };
}

export function deleteProduct (id) {
  return (dispatch) => {
    dispatch(startRequest());
    return axios.delete(`/api/products/${id}`)
      .then(() => dispatch(spliceProduct(id)))
      .then(() => dispatch(endRequest()))
      .catch(error => dispatch(handleError(error)));
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
