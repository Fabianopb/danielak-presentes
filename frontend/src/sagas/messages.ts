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

export function * saveMessageSaga(action: ReturnType<typeof messageActions.saveMessage>) {
  try {
    const { id, chatHistory } = action.payload;
    const userText = chatHistory
      .filter(history => history.speaker === 'user')
      .map(history => history.message);
    if (id) {
      yield call(messageRequests.putMessage, id, userText);
    } else {
      const response: { data: { id: string } } = yield call(messageRequests.postMessage, userText);
      yield put(messageActions.reduceMessageId(response.data.id));
    }
  } catch (error) {
    notificationOpts.title = "Houve um erro ao enviar sua mensagem, por favor envie um e-mail para danielakpresentes@yahoo.com.br";
    yield put(Notifications.error(notificationOpts));
  }
}
