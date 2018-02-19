import axios from 'axios';
import _ from 'lodash';
import history from '../history';
import { initialize } from 'redux-form';

/* -------------------------- */
/*           ACTIONS          */
/* -------------------------- */
export const START_REQUEST = 'START_REQUEST';
export const END_REQUEST = 'END_REQUEST';
export const ERROR_REQUEST = 'ERROR_REQUEST';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const SPLICE_PRODUCT = 'SPLICE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_ACTIVE_PRODUCT = 'SET_ACTIVE_PRODUCT';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const SET_IMAGE_FILE = 'SET_IMAGE_FILE';

/* -------------------------- */
/*      ACTIONS CREATORS      */
/* -------------------------- */
const startRequest = () => ({type: START_REQUEST});
const endRequest = () => ({type: END_REQUEST});
const errorRequest = (error) => ({type: ERROR_REQUEST, error});
const receiveProducts = (data) => ({type: RECEIVE_PRODUCTS, data});
const spliceProduct = (id) => ({type: SPLICE_PRODUCT, id});
// const addProduct = () => ({type: ADD_PRODUCT});
const setActiveProduct = (activeProduct) => ({type: SET_ACTIVE_PRODUCT, activeProduct});
export const openDialog = (activeProduct) => ({type: OPEN_DIALOG, activeProduct});
export const closeDialog = () => ({type: CLOSE_DIALOG});
export const setImageFile = (event) => ({type: SET_IMAGE_FILE, files: event.target.files});

/* -------------------------- */
/*       PRIVATE METHODS      */
/* -------------------------- */
const _redirectTo = (route) => {
  history.push(route);
};

const _getImageUrl = (getState) => {
  const { activeProduct } = getState().products;
  return activeProduct.image[activeProduct.featuredImageIndex];
};

const _getImageNameFromUrl = (url) => {
  return url.substring(url.substring(url.lastIndexOf('/'), 0).lastIndexOf('/') + 1);
};

/* -------------------------- */
/*           THUNKS           */
/* -------------------------- */
export const getProductDetails = (productId) => {
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
      dispatch(errorRequest(error));
    }
  };
};

export const fetchProducts = (productId) => {
  return (dispatch) => {
    dispatch(startRequest());
    if (productId) {
      axios.get(`/api/products?_id=${productId}`)
        .then(response => {
          dispatch(initialize('editProductForm', response.data[0]));
          dispatch(endRequest());
        })
        .catch(error => dispatch(errorRequest(error)));
    } else {
      axios.get(`/api/products`)
        .then(response => {
          dispatch(receiveProducts(response.data));
          dispatch(endRequest());
        })
        .catch(error => dispatch(errorRequest(error)));
    }
  };
};

export const postProduct = (product) => {
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
        _redirectTo('/admin');
        dispatch(endRequest());
      })
      .catch(error => dispatch(errorRequest(error)));
  };
};

export const putProduct = (product) => {
  return (dispatch, getState) => {
    dispatch(startRequest());
    dispatch(setActiveProduct(product));
    const { imageFile } = getState().products;
    const promises = [];
    let imageUrl = '';
    let imageName = '';
    if (imageFile) {
      imageUrl = _getImageUrl(getState);
      imageName = _getImageNameFromUrl(imageUrl);
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
        _redirectTo('/admin');
        dispatch(endRequest());
      })
      .catch(error => dispatch(errorRequest(error)));
  };
};

export const deleteProduct = (id) => {
  return (dispatch, getState) => {
    dispatch(startRequest());
    const imageUrl = _getImageUrl(getState);
    const imageName = _getImageNameFromUrl(imageUrl);
    const promises = [
      axios.post('/api/files/delete-file', { name: imageName }),
      axios.delete(`/api/products/${id}`)
    ];
    axios.all(promises)
      .then(axios.spread(() => {
        dispatch(spliceProduct(id));
        dispatch(endRequest());
      }))
      .catch(error => dispatch(errorRequest(error)));
  };
};

export const showProductDetails = (product) => {
  return (dispatch) => {
    _redirectTo(`/product/${product._id}`);
  };
};
