import axios from 'axios';
import _ from 'lodash';
import { initialize } from 'redux-form';
import Notifications from 'react-notification-system-redux';
import history from '../modules/history';
import { receiveProducts } from './products';
import { getAuthHeaders } from '../modules/helpers';

/* -------------------------- */
/*           ACTIONS          */
/* -------------------------- */
export const START_REQUEST = 'START_REQUEST';
export const END_REQUEST = 'END_REQUEST';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

/* -------------------------- */
/*      ACTIONS CREATORS      */
/* -------------------------- */
const startRequest = () => ({type: START_REQUEST});
const endRequest = () => ({type: END_REQUEST});
const receiveCategories = (data) => ({type: RECEIVE_CATEGORIES, data});
const setActiveCategory = (activeCategory) => ({type: SET_ACTIVE_CATEGORY, activeCategory});
export const openDialog = () => ({type: OPEN_DIALOG});
export const closeDialog = () => ({type: CLOSE_DIALOG});

/* -------------------------- */
/*       PRIVATE METHODS      */
/* -------------------------- */
const redirectTo = (route) => {
  history.push(route);
};

/* -------------------------- */
/*           THUNKS           */
/* -------------------------- */

const notificationOpts = {
  autoDismiss: 5,
  position: 'tc'
};

export const fetchCategories = (categoryId) => {
  return async (dispatch) => {
    try {
      dispatch(startRequest());
      if (categoryId) {
        const response = await axios.get(`/api/categories?_id=${categoryId}`);
        const category = response.data[0];
        dispatch(initialize('CategoryForm', category));
        dispatch(setActiveCategory(category));
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

export const upsertCategory = category => {
  return async dispatch => {
    try {
      dispatch(startRequest());
      const response = category._id
        ? await axios.put(`/api/categories/${category._id}`, category, { headers: getAuthHeaders() })
        : await axios.post(`/api/categories`, category, { headers: getAuthHeaders() });
      console.log(response);
      redirectTo('/admin');
      notificationOpts.title = 'Categorias atualizadas com sucesso!';
      dispatch(Notifications.success(notificationOpts));
    } catch (error) {
      notificationOpts.title = 'Algo deu errado :(';
      dispatch(Notifications.error(notificationOpts));
    } finally {
      dispatch(endRequest());
    }
  };
};

export const showAdminCategory = (categoryId) => {
  return (dispatch, getState) => {
    const categories = _.cloneDeep(getState().categories.data);
    const activeCategory = _.find(categories, cat => cat._id === categoryId);
    console.log('activeCategory', activeCategory);
    dispatch(setActiveCategory(activeCategory));
    redirectTo(`/admin/category/${categoryId}`);
  };
};

export const deleteCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      dispatch(startRequest());
      dispatch(closeDialog());
      const response = await axios.delete(`/api/categories/${categoryId}`, { headers: getAuthHeaders() });
      console.log(response);
      // TODO: could dispatch a success notification
      redirectTo('/admin');
      notificationOpts.title = 'Categoria excluida com sucesso!';
      dispatch(Notifications.success(notificationOpts));
    } catch (error) {
      notificationOpts.title = 'Algo deu errado :(';
      dispatch(Notifications.error(notificationOpts));
    } finally {
      dispatch(endRequest());
    }
  };
};

export const changeCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      dispatch(startRequest());
      const response = await axios.get(`/api/products${categoryId ? `?category=${categoryId}` : ''}`);
      dispatch(receiveProducts(response.data));
      dispatch(setActiveCategory(categoryId));
    } catch (error) {
      notificationOpts.title = 'Algo deu errado :(';
      dispatch(Notifications.error(notificationOpts));
    } finally {
      dispatch(endRequest());
    }
  };
};
