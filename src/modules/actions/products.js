import axios from 'axios';
import _ from 'lodash';
import history from '../history';
import { initialize, change } from 'redux-form';

/* -------------------------- */
/*           ACTIONS          */
/* -------------------------- */
export const START_REQUEST = 'START_REQUEST';
export const END_REQUEST = 'END_REQUEST';
export const ERROR_REQUEST = 'ERROR_REQUEST';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_ACTIVE_PRODUCT = 'SET_ACTIVE_PRODUCT';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

/* -------------------------- */
/*      ACTIONS CREATORS      */
/* -------------------------- */
const startRequest = () => ({type: START_REQUEST});
const endRequest = () => ({type: END_REQUEST});
const errorRequest = (error) => ({type: ERROR_REQUEST, error});
const receiveProducts = (data) => ({type: RECEIVE_PRODUCTS, data});
const setActiveProduct = (activeProduct) => ({type: SET_ACTIVE_PRODUCT, activeProduct});
export const openDialog = (activeProduct) => ({type: OPEN_DIALOG, activeProduct});
export const closeDialog = () => ({type: CLOSE_DIALOG});

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
  return async (dispatch) => {
    try {
      dispatch(startRequest());
      if (productId) {
        const response = await axios.get(`/api/products?_id=${productId}`);
        dispatch(setActiveProduct(response.data[0]));
        dispatch(initialize('editProductForm', response.data[0]));
      } else {
        const response = await axios.get(`/api/products`);
        dispatch(receiveProducts(response.data));
      }
      dispatch(endRequest());
    } catch (error) {
      dispatch(errorRequest(error));
    }
  };
};

export const postProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startRequest());
      const formData = new FormData();
      formData.append('file', product.image[0]);
      const uploadResponse = await axios.post(`/api/files/upload-file`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
      product.image = [uploadResponse.data.location];
      const postResponse = await axios.post(`/api/products`, product);
      console.log('product created!', postResponse);
      // TODO: could dispatch a success notification
      _redirectTo('/admin');
      dispatch(endRequest());
    } catch (error) {
      dispatch(errorRequest(error));
    }
  };
};

export const putProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startRequest());
      if (typeof product.image[0] === 'object') {
        const imageUrl = _getImageUrl(getState);
        const imageName = _getImageNameFromUrl(imageUrl);
        const formData = new FormData();
        formData.append('file', product.image[0]);
        const [, uploadResponse] = await axios.all([
          axios.post('/api/files/delete-file', { name: imageName }),
          axios.post(`/api/files/upload-file`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        ]);
        // _.remove(product.image, url => (url === imageUrl));
        product.image = [uploadResponse.data.location];
      }
      const putResponse = await axios.put(`/api/products/${product._id}`, product);
      console.log(putResponse);
      // TODO: could dispatch a success notification
      _redirectTo('/admin');
      dispatch(endRequest());
    } catch (error) {
      dispatch(errorRequest(error));
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startRequest());
      dispatch(closeDialog());
      const imageUrl = _getImageUrl(getState);
      const imageName = _getImageNameFromUrl(imageUrl);
      const [deleteFileResponse, deleteProductResponse] = await axios.all([
        axios.post('/api/files/delete-file', { name: imageName }),
        axios.delete(`/api/products/${id}`)
      ]);
      console.log(deleteFileResponse, deleteProductResponse);
      // TODO: could dispatch a success notification
      _redirectTo('/admin');
      dispatch(endRequest());
    } catch (error) {
      dispatch(errorRequest(error));
    }
  };
};

export const showProductDetails = (product) => {
  return (dispatch) => {
    _redirectTo(`/product/${product._id}`);
  };
};

export const showProductEditor = (productId) => {
  return (dispatch) => {
    _redirectTo(`/admin/product/${productId}`);
  };
};

export const handleFileDrop = (files) => {
  return (dispatch, getState) => {
    const images = _.cloneDeep(getState().form.editProductForm.values.image);
    images.push(files[0]);
    dispatch(change('editProductForm', 'image', images));
  };
};
