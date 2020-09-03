import { call, put, select, all } from "redux-saga/effects";
import _ from "lodash";
import Notifications from "react-notification-system-redux";
import { initialize, change, formValueSelector } from "redux-form";
import { routerActions } from "connected-react-router";
import { productActions } from "../actions/products";
import { productSelectors, routeSelectors } from "../modules/selectors";
import { productRequests, fileRequests } from "../modules/requests";
import { getImageNameFromUrl } from "../modules/helpers";
import { PRODUCT_FORM } from "../forms/Product/Product";

const notificationOpts = {
  position: "tc" as const,
  autoDismiss: 5,
  title: "",
};

export function* getProductDetailSaga(
  action: ReturnType<typeof productActions.getProductDetail>
) {
  try {
    yield put(productActions.startRequest());
    const products: Product[] = yield select(productSelectors.products);
    let activeProduct: Product;
    if (products.length > 0) {
      activeProduct = _.find(products, { _id: action.payload }) as Product;
    } else {
      const response: { data: Product[] } = yield call(
        productRequests.getProductById,
        action.payload
      );
      // eslint-disable-next-line prefer-destructuring
      activeProduct = response.data[0];
    }
    yield put(productActions.setActiveProduct(activeProduct));
  } catch (error) {
    notificationOpts.title = error.response
      ? error.response.data.error
      : error.message;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(productActions.endRequest());
  }
}

export function* fetchProductsSaga(
  action: ReturnType<typeof productActions.fetchProducts>
) {
  try {
    yield put(productActions.startRequest());
    if (action.payload) {
      const response: { data: Product[] } = yield call(
        productRequests.getProductById,
        action.payload
      );
      yield put(productActions.setActiveProduct(response.data[0]));
      yield put(initialize(PRODUCT_FORM, response.data[0]));
    } else {
      const search = yield select(routeSelectors.search);
      const response: { data: Product[] } = yield call(
        productRequests.getProducts,
        search
      );
      yield put(productActions.receiveProducts(response.data));
    }
  } catch (error) {
    notificationOpts.title = error.response
      ? error.response.data.error
      : error.message;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(productActions.endRequest());
  }
}

export function* upsertProductSaga(
  action: ReturnType<typeof productActions.upsertProduct>
) {
  try {
    yield put(productActions.startRequest());
    if (action.payload._id) {
      yield call(productRequests.putProduct, action.payload);
    } else {
      yield call(productRequests.postProduct, action.payload);
    }
    yield put(routerActions.push("/admin"));
  } catch (error) {
    notificationOpts.title = error.response
      ? error.response.data.error
      : error.message;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(productActions.endRequest());
  }
}

export function* deleteProductSaga(
  action: ReturnType<typeof productActions.deleteProduct>
) {
  try {
    yield put(productActions.startRequest());
    yield put(productActions.closeDialog());
    const imageObjectsArray: ProductImage[] = yield select(
      productSelectors.productImages
    );
    const requests = [call(productRequests.deleteProduct, action.payload)];
    if (imageObjectsArray.length > 0) {
      const largeImageNames = _.map(imageObjectsArray, (imageObject) =>
        getImageNameFromUrl(imageObject.large)
      );
      const smallImageNames = _.map(imageObjectsArray, (imageObject) =>
        getImageNameFromUrl(imageObject.small)
      );
      const imagesToDelete = _.concat(largeImageNames, smallImageNames);
      requests.push(call(fileRequests.deleteFiles, imagesToDelete));
    }
    yield all(requests);
    // TODO: could yield put a success notification
    yield put(routerActions.push("/admin"));
  } catch (error) {
    notificationOpts.title = error.response
      ? error.response.data.error
      : error.message;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(productActions.endRequest());
  }
}

export function* deleteImageSaga(
  action: ReturnType<typeof productActions.deleteImage>
) {
  try {
    const imageObject = action.payload;
    const images: ProductImage[] = yield select(
      formValueSelector(PRODUCT_FORM),
      "image"
    );
    const imageIndex = _.findIndex(images, (image) =>
      _.isEqual(image, imageObject)
    );
    const largeImageName = getImageNameFromUrl(imageObject.large);
    const smallImageName = getImageNameFromUrl(imageObject.small);
    (images as any).splice(imageIndex, 1, "uploading");
    yield put(change(PRODUCT_FORM, "image", images));
    yield call(fileRequests.deleteFiles, [largeImageName, smallImageName]);
    images.splice(imageIndex, 1);
    yield put(change(PRODUCT_FORM, "image", null));
    yield put(change(PRODUCT_FORM, "image", images));
  } catch (error) {
    notificationOpts.title = error.response
      ? error.response.data.error
      : error.message;
    yield put(Notifications.error(notificationOpts));
  }
}

export function* showAdminProductSaga(
  action: ReturnType<typeof productActions.showAdminProduct>
) {
  yield put(routerActions.push(`/admin/product/${action.payload}`));
}

export function* handleFileDropSaga(
  action: ReturnType<typeof productActions.handleFileDrop>
) {
  try {
    const images: ProductImage[] = yield select(
      formValueSelector(PRODUCT_FORM),
      "image"
    );
    const imageIndex = images.length;
    (images[imageIndex] as any) = "uploading";
    yield put(change(PRODUCT_FORM, "image", images));
    const formData = new FormData();
    formData.append("file", action.payload[0]);
    const uploadResponse: { data: any[] } = yield call(
      fileRequests.uploadFile,
      formData
    );
    images[imageIndex] = {
      large: uploadResponse.data[0].Location,
      small: uploadResponse.data[1].Location,
    };
    yield put(change(PRODUCT_FORM, "image", null));
    yield put(change(PRODUCT_FORM, "image", images));
    // TODO: could yield put a success notification
  } catch (error) {
    const images: ProductImage[] = yield select(
      formValueSelector(PRODUCT_FORM),
      "image"
    );
    const originalImages = _.slice(images, 0, -1);
    yield put(change(PRODUCT_FORM, "image", originalImages));
    notificationOpts.title = error.response
      ? error.response.data.error
      : error.message;
    yield put(Notifications.error(notificationOpts));
  }
}
