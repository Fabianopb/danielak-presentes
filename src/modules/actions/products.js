import axios from 'axios';
import history from '../history';
import { initialize } from 'redux-form';

export const START_REQUEST = 'START_REQUEST';
export const END_REQUEST = 'END_REQUEST';
export const ERROR_REQUEST = 'ERROR_REQUEST';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const SPLICE_PRODUCT = 'SPLICE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const SET_IMAGE_FILE = 'SET_IMAGE_FILE';

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
      axios.get(`/api/products?_id=${productId}`)
        .then(response => {
          dispatch(initialize('editProductForm', response.data[0]));
          dispatch(endRequest());
        })
        .catch(error => dispatch(handleError(error)));
    } else {
      axios.get(`/api/products`)
        .then(response => {
          dispatch(receiveProducts(response.data));
          dispatch(endRequest());
        })
        .catch(error => dispatch(handleError(error)));
    }
  };
}

export function postProduct (product) {
  return (dispatch, getState) => {
    dispatch(startRequest());
    const { imageFile } = getState().products;
    const formData = new FormData();
    formData.append('file', imageFile[0]);
    axios.post(`/api/products/upload-file`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(response => {
        product.image = response.data.location;
        return axios.post(`/api/products`, product);
      })
      .then(() => {
        redirectTo('/admin');
        dispatch(endRequest());
      })
      .catch(error => dispatch(handleError(error)));
  };
}

export function putProduct (product) {
  return (dispatch) => {
    dispatch(startRequest());
    axios.put(`/api/products/${product._id}`, product)
      .then(response => {
        redirectTo('/admin');
        dispatch(endRequest());
      })
      .catch(error => dispatch(handleError(error)));
  };
}

export function deleteProduct (id) {
  return (dispatch) => {
    dispatch(startRequest());
    axios.delete(`/api/products/${id}`)
      .then(() => {
        dispatch(spliceProduct(id));
        dispatch(endRequest());
      })
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

export function setImageFile (event) {
  return {
    type: SET_IMAGE_FILE,
    files: event.target.files
  };
}
