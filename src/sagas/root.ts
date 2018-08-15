import { all, takeLatest } from 'redux-saga/effects';
import { CategoryActionsEnum } from '../actions/categories';
import { ProductActionsEnum } from '../actions/products';
import { UserActionsEnum } from '../actions/users';
import { fetchCategoriesSaga, upsertCategorySaga, showAdminCategorySaga, deleteCategorySaga, changeCategorySaga } from './categories';
import { getProductDetailSaga, fetchProductsSaga, upsertProductSaga, deleteProductSaga, deleteImageSaga, showProductDetailSaga,
  showAdminProductSaga, handleFileDropSaga } from './products';
import { loginSaga, logoutSaga } from './users';

export default function * rootSaga() {
  yield all([
    // categories sagas
    takeLatest(CategoryActionsEnum.FETCH_CATEGORIES, fetchCategoriesSaga),
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
    takeLatest(ProductActionsEnum.SHOW_PRODUCT_DETAIL, showProductDetailSaga),
    takeLatest(ProductActionsEnum.SHOW_ADMIN_PRODUCT, showAdminProductSaga),
    takeLatest(ProductActionsEnum.HANDLE_FILE_DROP, handleFileDropSaga),
    // users sagas
    takeLatest(UserActionsEnum.LOG_IN, loginSaga),
    takeLatest(UserActionsEnum.LOG_OUT, logoutSaga),
  ]);
}
