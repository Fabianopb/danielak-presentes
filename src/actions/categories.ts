import axios from 'axios';
import * as _ from 'lodash';
import { Dispatch } from 'redux';
import * as Notifications from 'react-notification-system-redux';
import history from '../modules/history';
import { productActions } from './products';
import { createAction, ActionsUnion, getAuthHeaders } from '../modules/helpers';

export enum CategoryActionsEnum {
  START_REQUEST = 'START_REQUEST',
  END_REQUEST = 'END_REQUEST',
  RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES',
  SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY',
  OPEN_DIALOG = 'OPEN_DIALOG',
  CLOSE_DIALOG = 'CLOSE_DIALOG',

  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  FETCH_CATEGORY = 'FETCH_CATEGORY',
  UPSERT_CATEGORY = 'UPSERT_CATEGORY',
  SHOW_ADMIN_CATEGORY = 'SHOW_ADMIN_CATEGORY',
  DELETE_CATEGORY = 'DELETE_CATEGORY',
  CHANGE_CATEGORY = 'CHANGE_CATEGORY'
}

export const categoryActions = {
  startRequest: () => createAction(CategoryActionsEnum.START_REQUEST),
  endRequest: () => createAction(CategoryActionsEnum.END_REQUEST),
  receiveCategories: (data: Category[]) => createAction(CategoryActionsEnum.RECEIVE_CATEGORIES, data),
  setActiveCategory: (activeCategory: Category) => createAction(CategoryActionsEnum.SET_ACTIVE_CATEGORY, activeCategory),
  openDialog: () => createAction(CategoryActionsEnum.OPEN_DIALOG),
  closeDialog: () => createAction(CategoryActionsEnum.CLOSE_DIALOG),
  // saga triggers
  fetchCategories: () => createAction(CategoryActionsEnum.FETCH_CATEGORIES),
  fetchCategory: (id: string) => createAction(CategoryActionsEnum.FETCH_CATEGORY, id),
  upsertCategory: () => createAction(CategoryActionsEnum.UPSERT_CATEGORY),
  showAdminCategory: () => createAction(CategoryActionsEnum.SHOW_ADMIN_CATEGORY),
  deleteCategory: () => createAction(CategoryActionsEnum.DELETE_CATEGORY),
  changeCategory: () => createAction(CategoryActionsEnum.CHANGE_CATEGORY)
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

export const upsertCategoryThunk = (category: any) => {
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

export const showAdminCategoryThunk = (categoryId: string) => {
  return (dispatch: Dispatch, getState: any) => {
    const categories = _.cloneDeep(getState().categories.data);
    const activeCategory = _.find(categories, cat => cat._id === categoryId);
    console.log('activeCategory', activeCategory);
    dispatch(categoryActions.setActiveCategory(activeCategory));
    redirectTo(`/admin/category/${categoryId}`);
  };
};

export const deleteCategoryThunk = (categoryId: string) => {
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

export const changeCategoryThunk = (categoryId: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch(categoryActions.startRequest());
      const response = await axios.get(`/api/products${categoryId ? `?category=${categoryId}` : ''}`);
      dispatch(productActions.receiveProducts(response.data));
      const categories = _.cloneDeep(getState().categories.data);
      const activeCategory = _.find(categories, cat => cat._id === categoryId) as Category;
      dispatch(categoryActions.setActiveCategory(activeCategory));
    } catch (error) {
      notificationOpts.title = 'Algo deu errado :(';
      dispatch(Notifications.error(notificationOpts));
    } finally {
      dispatch(categoryActions.endRequest());
    }
  };
};
