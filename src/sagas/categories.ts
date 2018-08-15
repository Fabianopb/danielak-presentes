import { call, put, select } from 'redux-saga/effects';
import * as Notifications from 'react-notification-system-redux';
import * as _ from 'lodash';
import { initialize } from 'redux-form';
import { categoryActions } from '../actions/categories';
import { productActions } from '../actions/products';
import { categoryRequests, productRequests } from '../modules/requests';
import { categorySelectors } from '../modules/selectors';
import { CATEGORY_FORM } from '../forms/Category/CategoryForm';
import history from '../modules/history';

const notificationOpts = {
  autoDismiss: 5,
  position: 'tc' as 'tc',
  title: ''
};

export function * fetchCategoriesSaga() {
  try {
    yield put(categoryActions.startRequest());
    const response: { data: Category[] } = yield call(categoryRequests.getCategories);
    const categoryAll: Category = {
      name: 'Home',
      description: 'todos produtos',
      removed: false
    };
    const categories: Category[] = _.concat([categoryAll], response.data);
    yield put(categoryActions.receiveCategories(categories));
    yield put(categoryActions.setActiveCategory(categories[0]));
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
  try {
    yield put(categoryActions.startRequest());
    const response = action.payload
      ? yield call(categoryRequests.putCategory, action.payload)
      : yield call(categoryRequests.postCategory, action.payload);
    console.log(response);
    history.push('/admin');
    notificationOpts.title = 'Categorias atualizadas com sucesso!';
    yield put(Notifications.success(notificationOpts));
  } catch (error) {
    notificationOpts.title = error.message;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(categoryActions.endRequest());
  }
}

export function * showAdminCategorySaga(action: ReturnType<typeof categoryActions.showAdminCategory>) {
  const categories: Category[] = yield select(categorySelectors.categories);
  const activeCategory = _.find(categories, cat => cat._id === action.payload);
  yield put(categoryActions.setActiveCategory(activeCategory as Category));
  history.push(`/admin/category/${action.payload}`);
}

export function * deleteCategorySaga(action: ReturnType<typeof categoryActions.deleteCategory>) {
  try {
    yield put(categoryActions.startRequest());
    yield put(categoryActions.closeDialog());
    const response = yield call(categoryRequests.deleteCategory, action.payload);
    console.log(response);
    history.push('/admin');
    notificationOpts.title = 'Categoria excluida com sucesso!';
    yield put(Notifications.success(notificationOpts));
  } catch (error) {
    notificationOpts.title = error.message;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(categoryActions.endRequest());
  }
}

export function * changeCategorySaga(action: ReturnType<typeof categoryActions.changeCategory>) {
  try {
    yield put(categoryActions.startRequest());
    const response = yield call(productRequests.getProductsByCategory, action.payload)
    yield put(productActions.receiveProducts(response.data));
    const categories: Category[] = yield select(categorySelectors.categories);
    const activeCategory = _.find(categories, cat => cat._id === action.payload) as Category;
    yield put(categoryActions.setActiveCategory(activeCategory));
  } catch (error) {
    notificationOpts.title = error.message;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(categoryActions.endRequest());
  }
}
