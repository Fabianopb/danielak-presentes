import { call, put } from 'redux-saga/effects';
import * as Notifications from 'react-notification-system-redux';
import { routerActions } from 'connected-react-router';
import { userActions } from '../actions/users';
import { userRequests } from '../modules/requests';
import { setSession, clearSession } from '../modules/session';

const notificationOpts = {
  position: 'tc' as const,
  autoDismiss: 5,
  title: '',
};

export function* loginSaga(action: ReturnType<typeof userActions.login>) {
  try {
    yield put(userActions.startRequest());
    const response: LoginRequestResponse = yield call(userRequests.login, action.payload);
    setSession(response.data.token, response.data.expiry);
    yield put(routerActions.push('/admin'));
  } catch (error) {
    notificationOpts.title = error.response.data.error;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(userActions.endRequest());
  }
}

export function* logoutSaga() {
  clearSession();
  yield put(routerActions.push('/'));
}
