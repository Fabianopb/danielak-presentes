import { call, put } from 'redux-saga/effects';
import * as Notifications from 'react-notification-system-redux';
import * as _ from 'lodash';
import { messageActions } from '../actions/messages';
import { messageRequests } from '../modules/requests';

const notificationOpts = {
  autoDismiss: 5,
  position: 'tc' as 'tc',
  title: ''
};

export function * getMessagesSaga() {
  try {
    yield put(messageActions.startRequest());
    const response: { data: Message[] } = yield call(messageRequests.getMessages);
    const messages = response.data;
    yield put(messageActions.receiveMessages(messages));
  } catch (error) {
    notificationOpts.title = error.message;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(messageActions.endRequest());
  }
}

export function * postMessageSaga(action: ReturnType<typeof messageActions.postMessage>) {
  const userText = action.payload
    .filter(history => history.speaker === 'user')
    .map(history => history.message);
  const response = yield call(messageRequests.postMessage, userText);
  console.log(response);
}
