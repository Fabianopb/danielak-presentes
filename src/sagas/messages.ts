import { call, put, select } from "redux-saga/effects";
import Notifications from "react-notification-system-redux";
import { messageActions } from "../actions/messages";
import { messageRequests } from "../modules/requests";
import { messageSelectors } from "../modules/selectors";

const notificationOpts = {
  autoDismiss: 5,
  position: "tc" as const,
  title: "",
};

export function* getMessagesSaga() {
  try {
    yield put(messageActions.startRequest());
    const response: { data: Message[] } = yield call(
      messageRequests.getMessages
    );
    const messages = response.data;
    yield put(messageActions.receiveMessages(messages));
  } catch (error) {
    notificationOpts.title = error.message;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(messageActions.endRequest());
  }
}

export function* saveMessageSaga(
  action: ReturnType<typeof messageActions.saveMessage>
) {
  try {
    const { id, chatHistory } = action.payload;
    const userText = chatHistory
      .filter((history) => history.speaker === "user")
      .map((history) => history.message);
    if (id) {
      yield call(messageRequests.putMessage, id, userText);
    } else {
      const response: { data: { id: string } } = yield call(
        messageRequests.postMessage,
        userText
      );
      yield put(messageActions.reduceMessageId(response.data.id));
    }
  } catch (error) {
    notificationOpts.title =
      "Houve um erro ao enviar sua mensagem, por favor envie um e-mail para danielakpresentes@yahoo.com.br";
    yield put(Notifications.error(notificationOpts));
  }
}

export function* toggleAnswerSaga(
  action: ReturnType<typeof messageActions.toggleAnswer>
) {
  try {
    const response: { data: { message: Message } } = yield call(
      messageRequests.toggleMessageAnswer,
      action.payload
    );
    const messages: Message[] = yield select(messageSelectors.messages);
    const responseMessage = response.data.message;
    const newData = messages.map((message) =>
      message._id === responseMessage._id ? responseMessage : message
    );
    yield put(messageActions.receiveMessages(newData));
  } catch (error) {
    notificationOpts.title = error.message;
    yield put(Notifications.error(notificationOpts));
  }
}

export function* deleteMessageSaga(
  action: ReturnType<typeof messageActions.deleteMessage>
) {
  try {
    yield call(messageRequests.deleteMessage, action.payload);
    const messages: Message[] = yield select(messageSelectors.messages);
    const newData = messages.filter(
      (message) => message._id !== action.payload
    );
    yield put(messageActions.receiveMessages(newData));
  } catch (error) {
    notificationOpts.title = error.message;
    yield put(Notifications.error(notificationOpts));
  } finally {
    yield put(messageActions.toggleDialog(false));
  }
}
