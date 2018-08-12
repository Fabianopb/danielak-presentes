import { userActions } from '../actions/users';

export function * loginSaga(action: ReturnType<typeof userActions.login>) {
  yield console.log(action.type);
}

export function * logoutSaga(action: ReturnType<typeof userActions.logout>) {
  yield console.log(action.type);
}

export function * isSessionValidSaga(action: ReturnType<typeof userActions.isSessionValid>) {
  yield console.log(action.type);
}
