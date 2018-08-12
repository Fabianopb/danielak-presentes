import { categoryActions } from '../actions/categories';

export function * fetchCategoriesSaga(action: ReturnType<typeof categoryActions.fetchCategories>) {
  yield console.log(action.type);
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
