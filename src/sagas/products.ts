import { call, put, select, all } from 'redux-saga/effects';
import * as _ from 'lodash';
import * as Notifications from 'react-notification-system-redux';
import { initialize, change } from 'redux-form';
import history from '../modules/history';
import { productActions } from '../actions/products';
import { productSelectors, formSelectors } from '../modules/selectors';
import { productRequests, fileRequests } from '../modules/requests';
import { getImageNameFromUrl } from '../modules/helpers';
import { PRODUCT_FORM } from '../forms/Product/Product';

const notificationOpts = {
  position: 'tc' as 'tc',
  autoDismiss: 5,
  title: ''
};

export function * getProductDetailSaga(action: ReturnType<typeof productActions.getProductDetail>) {
  try {
    yield put(productActions.startRequest());
    const products: Product[] = yield select(productSelectors.products);
    let activeProduct: Product;
    if (products.length > 0) {
      activeProduct = _.find(products, { _id: action.payload }) as Product;
    } else {
      const response: { data: Product[] } = yield call(productRequests.getProductById, action.payload);
      activeProduct = response.data[0];
    }
    yield put(productActions.setActiveProduct(activeProduct));
  } catch (error) {
    notificationOpts.title = error.response.data.error;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(productActions.endRequest());
  }
}

export function * fetchProductsSaga(action: ReturnType<typeof productActions.fetchProducts>) {
  try {
    yield put(productActions.startRequest());
    if (action.payload) {
      const response: { data: Product[] } = yield call(productRequests.getProductById, action.payload);
      yield put(productActions.setActiveProduct(response.data[0]));
      yield put(initialize(PRODUCT_FORM, response.data[0]));
    } else {
      const response: { data: Product[] } = yield call(productRequests.getAllProducts, action.payload);
      yield put(productActions.receiveProducts(response.data));
    }
  } catch (error) {
    notificationOpts.title = error.response.data.error;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(productActions.endRequest());
  }
}

export function * upsertProductSaga(action: ReturnType<typeof productActions.upsertProduct>) {
  try {
    yield put(productActions.startRequest());
    const upsertResponse = action.payload._id
      ? yield call(productRequests.putProduct, action.payload)
      : yield call(productRequests.postProduct, action.payload);
    console.log(upsertResponse);
    history.push('/admin');
  } catch (error) {
    notificationOpts.title = error.response.data.error;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(productActions.endRequest());
  }
}

export function * deleteProductSaga(action: ReturnType<typeof productActions.deleteProduct>) {
  try {
    yield put(productActions.startRequest());
    yield put(productActions.closeDialog());
    const imageObjectsArray: ProductImage[] = yield select(productSelectors.productImages);
    const largeImageNames = _.map(imageObjectsArray, imageObject => getImageNameFromUrl(imageObject.large));
    const smallImageNames = _.map(imageObjectsArray, imageObject => getImageNameFromUrl(imageObject.small));
    const [deleteFileResponse, deleteProductResponse] = yield all([
      call(fileRequests.deleteFiles, _.concat(largeImageNames, smallImageNames)),
      call(productRequests.deleteProduct, action.payload)
    ]);
    console.log(deleteFileResponse, deleteProductResponse);
    // TODO: could yield put a success notification
    history.push('/admin');
  } catch (error) {
    notificationOpts.title = error.response.data.error;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(productActions.endRequest());
  }
}

export function * deleteImageSaga(action: ReturnType<typeof productActions.deleteImage>) {
  try {
    const imageObject = action.payload
    const { images }: { images: ProductImage[] } = yield select(formSelectors[PRODUCT_FORM]);
    const imageIndex = _.findIndex(images, image => _.isEqual(image, imageObject));
    const largeImageName = getImageNameFromUrl(imageObject.large);
    const smallImageName = getImageNameFromUrl(imageObject.small);
    (images as any).splice(imageIndex, 1, 'uploading');
    yield put(change(PRODUCT_FORM, 'image', images));
    const deleteFileResponse = call(fileRequests.deleteFiles, [largeImageName, smallImageName]);
    console.log(deleteFileResponse);
    images.splice(imageIndex, 1);
    yield put(change(PRODUCT_FORM, 'image', null));
    yield put(change(PRODUCT_FORM, 'image', images));
  } catch (error) {
    notificationOpts.title = error.response.data.error;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(productActions.endRequest());
  }
}

export function * showProductDetailSaga(action: ReturnType<typeof productActions.showProductDetail>) {
  yield history.push(`/product/${action.payload}`);
}

export function * showAdminProductSaga(action: ReturnType<typeof productActions.showAdminProduct>) {
  yield history.push(`/admin/product/${action.payload}`);
}

export function * handleFileDropSaga(action: ReturnType<typeof productActions.handleFileDrop>) {
  try {
    const { images }: { images: ProductImage[] } = yield select(formSelectors[PRODUCT_FORM]);
    const imageIndex = images.length;
    (images[imageIndex] as any) = 'uploading';
    yield put(change(PRODUCT_FORM, 'image', images));
    const formData = new FormData();
    formData.append('file', action.payload[0]);
    const uploadResponse: { data: any[] } = yield call(fileRequests.uploadFile, formData);
    images[imageIndex] = {
      large: uploadResponse.data[0].Location,
      small: uploadResponse.data[1].Location
    };
    yield put(change(PRODUCT_FORM, 'image', null));
    yield put(change(PRODUCT_FORM, 'image', images));
    // TODO: could yield put a success notification
  } catch (error) {
    const { images }: { images: ProductImage[] } = yield select(formSelectors[PRODUCT_FORM]);
    const originalImages = _.slice(images, 0, -1);
    yield put(change(PRODUCT_FORM, 'image', originalImages));
    notificationOpts.title = error.response.data.error;
    yield put(Notifications.error(notificationOpts));
  }
}
