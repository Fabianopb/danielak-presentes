import { call, put } from 'redux-saga/effects';
import { userActions } from '../actions/users';
import { userRequests } from '../modules/requests';
import { setSession, clearSession } from '../modules/session';
import history from '../modules/history';

export function * loginSaga(action: ReturnType<typeof userActions.login>) {
  try {
    yield put(userActions.startRequest());
    const response: LoginRequestResponse = yield call(userRequests.login, action.payload);
    setSession(response.data.token, response.data.expiry);
    history.push('/admin');
  } catch (error) {
    console.log(error);
  } finally {
    yield put(userActions.endRequest());
  }
}

export function * logoutSaga() {
  yield console.log('TODO: implement redux-router');
  clearSession();
  history.push('/');
}
