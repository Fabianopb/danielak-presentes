import axios from 'axios';
import { initialize } from 'redux-form';
import Notifications from 'react-notification-system-redux';
import history from '../modules/history';

/* -------------------------- */
/*           ACTIONS          */
/* -------------------------- */
export const START_REQUEST = 'START_REQUEST';
export const END_REQUEST = 'END_REQUEST';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

/* -------------------------- */
/*      ACTIONS CREATORS      */
/* -------------------------- */
const startRequest = () => ({type: START_REQUEST});
const endRequest = () => ({type: END_REQUEST});
const receiveCategories = (data) => ({type: RECEIVE_CATEGORIES, data});

/* -------------------------- */
/*       PRIVATE METHODS      */
/* -------------------------- */
const _redirectTo = (route) => {
  history.push(route);
};

/* -------------------------- */
/*           THUNKS           */
/* -------------------------- */

const notificationOpts = {
  position: 'tc',
  autoDismiss: 5
};

export const fetchCategories = (categoryId) => {
  return async (dispatch) => {
    try {
      dispatch(startRequest());
      if (categoryId) {
        console.log(categoryId);
        const response = await axios.get(`/api/categories?_id=${categoryId}`);
        // dispatch(setActiveProduct(response.data[0]));
        console.log(response.data[0]);
        dispatch(initialize('CategoryForm', response.data[0]));
      } else {
        const response = await axios.get(`/api/categories`);
        dispatch(receiveCategories(response.data));
      }
      dispatch(endRequest());
    } catch (error) {
      notificationOpts.title = 'Something went wrong :(';
      dispatch(Notifications.error(notificationOpts));
    }
  };
};

export const addCategory = category => {
  return async dispatch => {
    try {
      dispatch(startRequest());
      const response = await axios.post('/api/categories', category);
      console.log(response);
      _redirectTo('/admin');
      notificationOpts.title = 'Categoria inserida com sucesso!';
      dispatch(Notifications.success(notificationOpts));
    } catch (error) {
      notificationOpts.title = 'Something went wrong :(';
      dispatch(Notifications.error(notificationOpts));
    } finally {
      dispatch(endRequest());
    }
  };
};

// export const upsertProduct = (category) => {
//   return async (dispatch) => {
//     try {
//       dispatch(startRequest());
//       const upsertResponse = product._id
//         ? await axios.put(`/api/products/${product._id}`, product)
//         : await axios.post(`/api/products`, product);
//       console.log(upsertResponse);
//       _redirectTo('/admin');
//       dispatch(endRequest());
//     } catch (error) {
//       dispatch(errorRequest(error));
//     }
//   };
// };

// export const deleteProduct = (id) => {
//   return async (dispatch, getState) => {
//     try {
//       dispatch(startRequest());
//       dispatch(closeDialog());
//       const imageObjectsArray = getState().products.activeProduct.image;
//       const largeImageNames = _.map(imageObjectsArray, imageObject => _getImageNameFromUrl(imageObject.large));
//       const smallImageNames = _.map(imageObjectsArray, imageObject => _getImageNameFromUrl(imageObject.small));
//       const [deleteFileResponse, deleteProductResponse] = await axios.all([
//         axios.post('/api/files/delete-file', { images: _.concat(largeImageNames, smallImageNames) }),
//         axios.delete(`/api/products/${id}`)
//       ]);
//       console.log(deleteFileResponse, deleteProductResponse);
//       // TODO: could dispatch a success notification
//       _redirectTo('/admin');
//       dispatch(endRequest());
//     } catch (error) {
//       dispatch(errorRequest(error));
//     }
//   };
// };

// const notificationOpts = {
//   position: 'tc',
//   autoDismiss: 5
// };
