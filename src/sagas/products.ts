import { productActions } from '../actions/products';

export function * getProductDetailSaga(action: ReturnType<typeof productActions.getProductDetail>) {
  yield console.log(action.type);
}

export function * fetchProductsSaga(action: ReturnType<typeof productActions.fetchProducts>) {
  yield console.log(action.type);
}

export function * upsertProductSaga(action: ReturnType<typeof productActions.upsertProduct>) {
  yield console.log(action.type);
}

export function * deleteProductSaga(action: ReturnType<typeof productActions.deleteProduct>) {
  yield console.log(action.type);
}

export function * deleteImageSaga(action: ReturnType<typeof productActions.deleteImage>) {
  yield console.log(action.type);
}

export function * showProductDetailSaga(action: ReturnType<typeof productActions.showProductDetail>) {
  yield console.log(action.type);
}

export function * showAdminProductSaga(action: ReturnType<typeof productActions.showAdminProduct>) {
  yield console.log(action.type);
}

export function * handleFileDropSaga(action: ReturnType<typeof productActions.handleFileDrop>) {
  yield console.log(action.type);
}
