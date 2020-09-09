import { all, takeLatest } from 'redux-saga/effects';
import { CategoryActionsEnum } from '../actions/categories';
import { ProductActionsEnum } from '../actions/products';
import {
  fetchCategoriesSaga,
  fetchCategorySaga,
  upsertCategorySaga,
  showAdminCategorySaga,
  deleteCategorySaga,
  changeCategorySaga,
} from './categories';
import {
  getProductDetailSaga,
  fetchProductsSaga,
  upsertProductSaga,
  deleteProductSaga,
  deleteImageSaga,
  showAdminProductSaga,
  handleFileDropSaga,
} from './products';

export default function* rootSaga() {
  yield all([
    // categories sagas
    takeLatest(CategoryActionsEnum.FETCH_CATEGORIES, fetchCategoriesSaga),
    takeLatest(CategoryActionsEnum.FETCH_CATEGORY, fetchCategorySaga),
    takeLatest(CategoryActionsEnum.UPSERT_CATEGORY, upsertCategorySaga),
    takeLatest(CategoryActionsEnum.SHOW_ADMIN_CATEGORY, showAdminCategorySaga),
    takeLatest(CategoryActionsEnum.DELETE_CATEGORY, deleteCategorySaga),
    takeLatest(CategoryActionsEnum.CHANGE_CATEGORY, changeCategorySaga),
    // products sagas
    takeLatest(ProductActionsEnum.GET_PRODUCT_DETAIL, getProductDetailSaga),
    takeLatest(ProductActionsEnum.FETCH_PRODUCTS, fetchProductsSaga),
    takeLatest(ProductActionsEnum.UPSERT_PRODUCTS, upsertProductSaga),
    takeLatest(ProductActionsEnum.DELETE_PRODUCT, deleteProductSaga),
    takeLatest(ProductActionsEnum.DELETE_IMAGE, deleteImageSaga),
    takeLatest(ProductActionsEnum.SHOW_ADMIN_PRODUCT, showAdminProductSaga),
    takeLatest(ProductActionsEnum.HANDLE_FILE_DROP, handleFileDropSaga),
  ]);
}
