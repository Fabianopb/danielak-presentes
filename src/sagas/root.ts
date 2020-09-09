import { all, takeLatest } from 'redux-saga/effects';
import { ProductActionsEnum } from '../actions/products';
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
