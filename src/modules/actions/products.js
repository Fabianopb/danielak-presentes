import axios from 'axios';
import _ from 'lodash';
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
export const SET_ACTIVE_PRODUCT = 'SET_ACTIVE_PRODUCT';
export const SHOW_PRODUCT_DETAILS = 'SHOW_PRODUCT_DETAILS';

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

function setActiveProduct (activeProduct) {
  return {
    type: SET_ACTIVE_PRODUCT,
    activeProduct
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

function getImageUrl (getState) {
  const { activeProduct } = getState().products;
  return activeProduct.image[activeProduct.featuredImageIndex];
}

function getImageNameFromUrl (url) {
  return url.substring(url.substring(url.lastIndexOf('/'), 0).lastIndexOf('/') + 1);
}

export function getProductDetails (productId) {
  return async (dispatch, getState) => {
    try {
      dispatch(startRequest());
      const products = getState().products.data;
      let activeProduct;
      if (products.length > 0) {
        activeProduct = _.find(products, {_id: productId});
      } else {
        const response = await axios.get(`/api/products?_id=${productId}`);
        activeProduct = response.data[0];
      }
      dispatch(setActiveProduct(activeProduct));
      dispatch(endRequest());
    } catch (error) {
      dispatch(handleError(error));
    }
  };
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
    axios.post(`/api/files/upload-file`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(response => {
        product.image.push(response.data.location);
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
  return (dispatch, getState) => {
    dispatch(startRequest());
    dispatch(setActiveProduct(product));
    const { imageFile } = getState().products;
    const promises = [];
    let imageUrl = '';
    let imageName = '';
    if (imageFile) {
      imageUrl = getImageUrl(getState);
      imageName = getImageNameFromUrl(imageUrl);
      const formData = new FormData();
      formData.append('file', imageFile[0]);
      promises.push(axios.post('/api/files/delete-file', { name: imageName }));
      promises.push(axios.post(`/api/files/upload-file`, formData, {headers: {'Content-Type': 'multipart/form-data'}}));
    }
    axios.all(promises)
      .then(axios.spread((deleteResponse, uploadResponse) => {
        if (imageFile) {
          _.remove(product.image, url => {
            return url === imageUrl;
          });
          product.image.push(uploadResponse.data.location);
        }
        return axios.put(`/api/products/${product._id}`, product);
      }))
      .then(() => {
        redirectTo('/admin');
        dispatch(endRequest());
      })
      .catch(error => dispatch(handleError(error)));
  };
}

export function deleteProduct (id) {
  return (dispatch, getState) => {
    dispatch(startRequest());
    const imageUrl = getImageUrl(getState);
    const imageName = getImageNameFromUrl(imageUrl);
    const promises = [
      axios.post('/api/files/delete-file', { name: imageName }),
      axios.delete(`/api/products/${id}`)
    ];
    axios.all(promises)
      .then(axios.spread(() => {
        dispatch(spliceProduct(id));
        dispatch(endRequest());
      }))
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

export function showProductDetails (product) {
  return (dispatch) => {
    redirectTo(`/product/${product._id}`);
  };
}
