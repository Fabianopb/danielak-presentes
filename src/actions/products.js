import axios from 'axios';
import _ from 'lodash';
import history from '../modules/history';
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

const _getImageNameFromUrl = (url) => {
  return url.substring(url.substring(url.lastIndexOf('/'), 0).lastIndexOf('/') + 1);
};

/* -------------------------- */
/*           THUNKS           */
/* -------------------------- */
export const getProductDetail = (productId) => {
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

export const upsertProduct = (product) => {
  return async (dispatch) => {
    try {
      dispatch(startRequest());
      const upsertResponse = product._id
        ? await axios.put(`/api/products/${product._id}`, product)
        : await axios.post(`/api/products`, product);
      console.log(upsertResponse);
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
      const imageObjectsArray = getState().products.activeProduct.image;
      const largeImageNames = _.map(imageObjectsArray, imageObject => _getImageNameFromUrl(imageObject.large));
      const smallImageNames = _.map(imageObjectsArray, imageObject => _getImageNameFromUrl(imageObject.small));
      const [deleteFileResponse, deleteProductResponse] = await axios.all([
        axios.post('/api/files/delete-file', { images: _.concat(largeImageNames, smallImageNames) }),
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

export const deleteImage = (imageObject) => {
  return async (dispatch, getState) => {
    try {
      const images = _.cloneDeep(getState().form.editProductForm.values.image);
      const imageIndex = _.findIndex(images, image => _.isEqual(image, imageObject));
      const largeImageName = _getImageNameFromUrl(imageObject.large);
      const smallImageName = _getImageNameFromUrl(imageObject.small);
      images.splice(imageIndex, 1, 'uploading');
      dispatch(change('editProductForm', 'image', images));
      const deleteFileResponse = await axios.post('/api/files/delete-file', { images: [largeImageName, smallImageName] });
      console.log(deleteFileResponse);
      images.splice(imageIndex, 1);
      dispatch(change('editProductForm', 'image', null));
      dispatch(change('editProductForm', 'image', images));
    } catch (error) {
      dispatch(errorRequest(error));
    }
  };
};

export const showProductDetail = (product) => {
  return (dispatch) => {
    _redirectTo(`/product/${product._id}`);
  };
};

export const showAdminProduct = (productId) => {
  return (dispatch) => {
    _redirectTo(`/admin/product/${productId}`);
  };
};

export const handleFileDrop = (files) => {
  return async (dispatch, getState) => {
    try {
      const images = _.cloneDeep(getState().form.editProductForm.values.image);
      const imageIndex = images.length;
      images[imageIndex] = 'uploading';
      dispatch(change('editProductForm', 'image', images));
      const formData = new FormData();
      formData.append('file', files[0]);
      const uploadResponse = await axios.post(`/api/files/upload-file`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
      images[imageIndex] = {
        large: uploadResponse.data[0].Location,
        small: uploadResponse.data[1].Location
      };
      dispatch(change('editProductForm', 'image', null));
      dispatch(change('editProductForm', 'image', images));
      // TODO: could dispatch a success notification
    } catch (error) {
      console.log(error.response);
      // TODO: could dispatch an error notification
      const images = _.cloneDeep(getState().form.editProductForm.values.image);
      const originalImages = _.slice(images, 0, -1);
      dispatch(change('editProductForm', 'image', originalImages));
      dispatch(errorRequest(error));
    }
  };
};
