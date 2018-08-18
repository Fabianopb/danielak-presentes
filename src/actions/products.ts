import { createAction, ActionsUnion } from '../modules/helpers';

export enum ProductActionsEnum {
  START_REQUEST = 'START_REQUEST',
  END_REQUEST = 'END_REQUEST',
  RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS',
  ADD_PRODUCT = 'ADD_PRODUCT',
  SET_ACTIVE_PRODUCT = 'SET_ACTIVE_PRODUCT',
  OPEN_DIALOG = 'OPEN_DIALOG',
  CLOSE_DIALOG = 'CLOSE_DIALOG',

  GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL',
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
  UPSERT_PRODUCTS = 'UPSERT_PRODUCTS',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  DELETE_IMAGE = 'DELETE_IMAGE',
  SHOW_PRODUCT_DETAIL = 'SHOW_PRODUCT_DETAIL',
  SHOW_ADMIN_PRODUCT = 'SHOW_ADMIN_PRODUCT',
  HANDLE_FILE_DROP = 'HANDLE_FILE_DROP'
}

export const productActions = {
  startRequest: () => createAction(ProductActionsEnum.START_REQUEST),
  endRequest: () => createAction(ProductActionsEnum.END_REQUEST),
  receiveProducts: (data: any) => createAction(ProductActionsEnum.RECEIVE_PRODUCTS, data),
  setActiveProduct: (activeProduct: any) => createAction(ProductActionsEnum.SET_ACTIVE_PRODUCT, activeProduct),
  openDialog: (activeProduct: any) => createAction(ProductActionsEnum.OPEN_DIALOG, activeProduct),
  closeDialog: () => createAction(ProductActionsEnum.CLOSE_DIALOG),
  // saga triggers
  getProductDetail: (id: string) => createAction(ProductActionsEnum.GET_PRODUCT_DETAIL, id),
  fetchProducts: (id?: string) => createAction(ProductActionsEnum.FETCH_PRODUCTS, id),
  upsertProduct: (product: Product) => createAction(ProductActionsEnum.UPSERT_PRODUCTS, product),
  deleteProduct: (id: string) => createAction(ProductActionsEnum.DELETE_PRODUCT, id),
  deleteImage: (image: ProductImage) => createAction(ProductActionsEnum.DELETE_IMAGE, image),
  showProductDetail: (id: string) => createAction(ProductActionsEnum.SHOW_PRODUCT_DETAIL, id),
  showAdminProduct: (id: string) => createAction(ProductActionsEnum.SHOW_ADMIN_PRODUCT, id),
  handleFileDrop: (files: any[]) => createAction(ProductActionsEnum.HANDLE_FILE_DROP, files)
};

export type ProductActions = ActionsUnion<typeof productActions>;
