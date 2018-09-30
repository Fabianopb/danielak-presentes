import { createAction, ActionsUnion } from '../modules/helpers';

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
  upsertCategory: (category: Category) => createAction(CategoryActionsEnum.UPSERT_CATEGORY, category),
  showAdminCategory: (id: string) => createAction(CategoryActionsEnum.SHOW_ADMIN_CATEGORY, id),
  deleteCategory: (id: string) => createAction(CategoryActionsEnum.DELETE_CATEGORY, id),
  changeCategory: (id: string | null) => createAction(CategoryActionsEnum.CHANGE_CATEGORY, id)
};

export type CategoryActions = ActionsUnion<typeof categoryActions>;
