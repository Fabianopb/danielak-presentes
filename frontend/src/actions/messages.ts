import { createAction, ActionsUnion } from '../modules/helpers';

export enum MessageActionsEnum {
  START_REQUEST = 'START_REQUEST',
  END_REQUEST = 'END_REQUEST',
  TOGGLE_DIALOG = 'TOGGLE_DIALOG',
  RECEIVE_MESSAGES = 'RECEIVE_MESSAGES',
  REDUCE_MESSAGE_ID = 'REDUCE_MESSAGE_ID',
  FETCH_MESSAGES = 'FETCH_MESSAGES',
  SAVE_MESSAGE = 'SAVE_MESSAGE',
  TOGGLE_ANSWER = 'TOGGLE_ANSWER',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
}

export const messageActions = {
  startRequest: () => createAction(MessageActionsEnum.START_REQUEST),
  endRequest: () => createAction(MessageActionsEnum.END_REQUEST),
  toggleDialog: (state: boolean) => createAction(MessageActionsEnum.TOGGLE_DIALOG, state),
  receiveMessages: (data: Message[]) => createAction(MessageActionsEnum.RECEIVE_MESSAGES, data),
  reduceMessageId: (id: string) => createAction(MessageActionsEnum.REDUCE_MESSAGE_ID, id),
  // saga triggers
  fetchMessages: () => createAction(MessageActionsEnum.FETCH_MESSAGES),
  saveMessage: (chatHistory: ChatHistory[], id?: string) => createAction(MessageActionsEnum.SAVE_MESSAGE, { chatHistory, id }),
  toggleAnswer: (id: string) => createAction(MessageActionsEnum.TOGGLE_ANSWER, id),
  deleteMessage: (id: string) => createAction(MessageActionsEnum.DELETE_MESSAGE, id),
};

export type MessageActions = ActionsUnion<typeof messageActions>;
