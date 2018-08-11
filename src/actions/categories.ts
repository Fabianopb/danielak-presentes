import axios from 'axios';
import * as _ from 'lodash';
import { initialize } from 'redux-form';
import { Dispatch } from 'redux';
import * as Notifications from 'react-notification-system-redux';
import history from '../modules/history';
import { productActions } from './products';
import { createAction, ActionsUnion, getAuthHeaders } from '../modules/helpers';

/* -------------------------- */
/*           ACTIONS          */
/* -------------------------- */
export enum CategoryActionsEnum {
  START_REQUEST = 'START_REQUEST',
  END_REQUEST = 'END_REQUEST',
  RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES',
  SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY',
  OPEN_DIALOG = 'OPEN_DIALOG',
  CLOSE_DIALOG = 'CLOSE_DIALOG'
}

/* -------------------------- */
/*      ACTIONS CREATORS      */
/* -------------------------- */
export const categoryActions = {
  startRequest: () => createAction(CategoryActionsEnum.START_REQUEST),
  endRequest: () => createAction(CategoryActionsEnum.END_REQUEST),
  receiveCategories: (data: any) => createAction(CategoryActionsEnum.RECEIVE_CATEGORIES, data),
  setActiveCategory: (activeCategory: any) => createAction(CategoryActionsEnum.SET_ACTIVE_CATEGORY, activeCategory),
  openDialog: () => createAction(CategoryActionsEnum.OPEN_DIALOG),
  closeDialog: () => createAction(CategoryActionsEnum.CLOSE_DIALOG)
};

export type CategoryActions = ActionsUnion<typeof categoryActions>;

/* -------------------------- */
/*       PRIVATE METHODS      */
/* -------------------------- */
const redirectTo = (route: string) => {
  history.push(route);
};

/* -------------------------- */
/*           THUNKS           */
/* -------------------------- */

const notificationOpts = {
  autoDismiss: 5,
  position: 'tc' as 'tc',
  title: ''
};

export const fetchCategories = (categoryId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(categoryActions.startRequest());
      if (categoryId) {
        const response = await axios.get(`/api/categories?_id=${categoryId}`);
        const category = response.data[0];
        dispatch(initialize('CategoryForm', category));
        dispatch(categoryActions.setActiveCategory(category));
      } else {
        const response = await axios.get(`/api/categories`);
        dispatch(categoryActions.receiveCategories(response.data));
      }
      dispatch(categoryActions.endRequest());
    } catch (error) {
      notificationOpts.title = 'Something went wrong :(';
      dispatch(Notifications.error(notificationOpts));
    }
  };
};

export const upsertCategory = (category: any) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(categoryActions.startRequest());
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
      dispatch(categoryActions.endRequest());
    }
  };
};

export const showAdminCategory = (categoryId: string) => {
  return (dispatch: Dispatch, getState: any) => {
    const categories = _.cloneDeep(getState().categories.data);
    const activeCategory = _.find(categories, cat => cat._id === categoryId);
    console.log('activeCategory', activeCategory);
    dispatch(categoryActions.setActiveCategory(activeCategory));
    redirectTo(`/admin/category/${categoryId}`);
  };
};

export const deleteCategory = (categoryId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(categoryActions.startRequest());
      dispatch(categoryActions.closeDialog());
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
      dispatch(categoryActions.endRequest());
    }
  };
};

export const changeCategory = (categoryId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(categoryActions.startRequest());
      const response = await axios.get(`/api/products${categoryId ? `?category=${categoryId}` : ''}`);
      dispatch(productActions.receiveProducts(response.data));
      dispatch(categoryActions.setActiveCategory(categoryId));
    } catch (error) {
      notificationOpts.title = 'Algo deu errado :(';
      dispatch(Notifications.error(notificationOpts));
    } finally {
      dispatch(categoryActions.endRequest());
    }
  };
};
