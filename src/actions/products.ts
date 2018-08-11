import axios from 'axios';
import { Dispatch } from 'redux';
import * as _ from 'lodash';
import history from '../modules/history';
import { initialize, change } from 'redux-form';
import * as Notifications from 'react-notification-system-redux';
import { createAction, ActionsUnion, getAuthHeaders } from '../modules/helpers';

const notificationOpts = {
  position: 'tc' as 'tc',
  autoDismiss: 5,
  title: ''
};

/* -------------------------- */
/*           ACTIONS          */
/* -------------------------- */
export enum ProductActionsEnum {
  START_REQUEST = 'START_REQUEST',
  END_REQUEST = 'END_REQUEST',
  ERROR_REQUEST = 'ERROR_REQUEST',
  RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS',
  ADD_PRODUCT = 'ADD_PRODUCT',
  SET_ACTIVE_PRODUCT = 'SET_ACTIVE_PRODUCT',
  OPEN_DIALOG = 'OPEN_DIALOG',
  CLOSE_DIALOG = 'CLOSE_DIALOG'
}

/* -------------------------- */
/*      ACTIONS CREATORS      */
/* -------------------------- */
export const productActions = {
  startRequest: () => createAction(ProductActionsEnum.START_REQUEST),
  endRequest: () => createAction(ProductActionsEnum.END_REQUEST),
  errorRequest: (error: any) => createAction(ProductActionsEnum.ERROR_REQUEST, error),
  receiveProducts: (data: any) => createAction(ProductActionsEnum.RECEIVE_PRODUCTS, data),
  setActiveProduct: (activeProduct: any) => createAction(ProductActionsEnum.SET_ACTIVE_PRODUCT, activeProduct),
  openDialog: (activeProduct: any) => createAction(ProductActionsEnum.OPEN_DIALOG, activeProduct),
  closeDialog: () => createAction(ProductActionsEnum.CLOSE_DIALOG)
};

export type ProductActions = ActionsUnion<typeof productActions>;

/* -------------------------- */
/*       PRIVATE METHODS      */
/* -------------------------- */
const redirectTo = (route: string): void => {
  history.push(route);
};

const getImageNameFromUrl = (url: string): string => {
  return url.substring(url.substring(url.lastIndexOf('/'), 0).lastIndexOf('/') + 1);
};

/* -------------------------- */
/*           THUNKS           */
/* -------------------------- */
export const getProductDetail = (productId: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch(productActions.startRequest());
      const products = getState().products.data;
      let activeProduct;
      if (products.length > 0) {
        activeProduct = _.find(products, {_id: productId});
      } else {
        const response = await axios.get(`/api/products?_id=${productId}`);
        activeProduct = response.data[0];
      }
      dispatch(productActions.setActiveProduct(activeProduct));
      dispatch(productActions.endRequest());
    } catch (error) {
      dispatch(productActions.errorRequest(error));
    }
  };
};

export const fetchProducts = (productId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(productActions.startRequest());
      if (productId) {
        const response = await axios.get(`/api/products?_id=${productId}`);
        dispatch(productActions.setActiveProduct(response.data[0]));
        dispatch(initialize('editProductForm', response.data[0]));
      } else {
        const response = await axios.get(`/api/products`);
        dispatch(productActions.receiveProducts(response.data));
      }
      dispatch(productActions.endRequest());
    } catch (error) {
      dispatch(productActions.errorRequest(error));
    }
  };
};

export const upsertProduct = (product: any) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(productActions.startRequest());
      const upsertResponse = product._id
        ? await axios.put(`/api/products/${product._id}`, product, { headers: getAuthHeaders() })
        : await axios.post(`/api/products`, product, { headers: getAuthHeaders() });
      console.log(upsertResponse);
      redirectTo('/admin');
    } catch (error) {
      notificationOpts.title = error.response.data.error;
      dispatch(Notifications.error(notificationOpts));
    } finally {
      dispatch(productActions.endRequest());
    }
  };
};

export const deleteProduct = (id: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch(productActions.startRequest());
      dispatch(productActions.closeDialog());
      const imageObjectsArray = getState().products.activeProduct.image;
      const largeImageNames = _.map(imageObjectsArray, imageObject => getImageNameFromUrl(imageObject.large));
      const smallImageNames = _.map(imageObjectsArray, imageObject => getImageNameFromUrl(imageObject.small));
      const [deleteFileResponse, deleteProductResponse] = await axios.all([
        axios.post(
          '/api/files/delete-file',
          { images: _.concat(largeImageNames, smallImageNames) },
          { headers: getAuthHeaders() }
        ),
        axios.delete(`/api/products/${id}`, { headers: getAuthHeaders() })
      ]);
      console.log(deleteFileResponse, deleteProductResponse);
      // TODO: could dispatch a success notification
      redirectTo('/admin');
      dispatch(productActions.endRequest());
    } catch (error) {
      dispatch(productActions.errorRequest(error));
    }
  };
};

export const deleteImage = (imageObject: any) => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const images = _.cloneDeep(getState().form.editProductForm.values.image);
      const imageIndex = _.findIndex(images, image => _.isEqual(image, imageObject));
      const largeImageName = getImageNameFromUrl(imageObject.large);
      const smallImageName = getImageNameFromUrl(imageObject.small);
      images.splice(imageIndex, 1, 'uploading');
      dispatch(change('editProductForm', 'image', images));
      const deleteFileResponse = await axios.post(
        '/api/files/delete-file',
        { images: [largeImageName, smallImageName] },
        { headers: getAuthHeaders() }
      );
      console.log(deleteFileResponse);
      images.splice(imageIndex, 1);
      dispatch(change('editProductForm', 'image', null));
      dispatch(change('editProductForm', 'image', images));
    } catch (error) {
      dispatch(productActions.errorRequest(error));
    }
  };
};

export const showProductDetail = (product: any) => {
  return () => {
    redirectTo(`/product/${product._id}`);
  };
};

export const showAdminProduct = (productId: string) => {
  return () => {
    redirectTo(`/admin/product/${productId}`);
  };
};

export const handleFileDrop = (files: any) => {
  return async (dispatch: Dispatch, getState: any) => {
    try {
      const images = _.cloneDeep(getState().form.editProductForm.values.image);
      const imageIndex = images.length;
      images[imageIndex] = 'uploading';
      dispatch(change('editProductForm', 'image', images));
      const formData = new FormData();
      formData.append('file', files[0]);
      const uploadResponse = await axios.post(
        `/api/files/upload-file`,
        formData,
        { headers: {'Content-Type': 'multipart/form-data', ...getAuthHeaders()} });
      images[imageIndex] = {
        large: uploadResponse.data[0].Location,
        small: uploadResponse.data[1].Location
      };
      dispatch(change('editProductForm', 'image', null));
      dispatch(change('editProductForm', 'image', images));
      // TODO: could dispatch a success notification
    } catch (error) {
      const images = _.cloneDeep(getState().form.editProductForm.values.image);
      const originalImages = _.slice(images, 0, -1);
      dispatch(change('editProductForm', 'image', originalImages));
      dispatch(productActions.errorRequest(error.response.data.error));
      notificationOpts.title = getState().products.error;
      dispatch(Notifications.error(notificationOpts));
    }
  };
};
