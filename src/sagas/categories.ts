import { call, put } from 'redux-saga/effects';
import * as Notifications from 'react-notification-system-redux';
import { initialize } from 'redux-form';
import { categoryActions } from '../actions/categories';
import { categoryRequests } from '../modules/requests';
import { CATEGORY_FORM } from '../forms/Category/CategoryForm';

const notificationOpts = {
  autoDismiss: 5,
  position: 'tc' as 'tc',
  title: ''
};

export function * fetchCategoriesSaga() {
  try {
    yield put(categoryActions.startRequest());
    const response: { data: Category[] } = yield call(categoryRequests.getCategories);
    yield put(categoryActions.receiveCategories(response.data));
    yield put(categoryActions.setActiveCategory(response.data[0]));
  } catch (error) {
    notificationOpts.title = error.message;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(categoryActions.endRequest());
  }
}

export function * fetchCategorySaga(action: ReturnType<typeof categoryActions.fetchCategory>) {
  try {
    yield put(categoryActions.startRequest());
    const response: { data: Category } = yield call(categoryRequests.getCategoryById, action.payload);
    const category = response.data[0];
    yield put(initialize(CATEGORY_FORM, category));
    yield put(categoryActions.setActiveCategory(category));
  } catch (error) {
    notificationOpts.title = error.message;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(categoryActions.endRequest());
  }
}

export function * upsertCategorySaga(action: ReturnType<typeof categoryActions.upsertCategory>) {
  yield console.log(action.type);
}

export function * showAdminCategorySaga(action: ReturnType<typeof categoryActions.showAdminCategory>) {
  yield console.log(action.type);
}

export function * deleteCategorySaga(action: ReturnType<typeof categoryActions.deleteCategory>) {
  yield console.log(action.type);
}

export function * changeCategorySaga(action: ReturnType<typeof categoryActions.changeCategory>) {
  yield console.log(action.type);
}
