import { createAction, ActionsUnion } from '../modules/helpers';

export enum MessageActionsEnum {
  START_REQUEST = 'START_REQUEST',
  END_REQUEST = 'END_REQUEST',
  RECEIVE_MESSAGES = 'RECEIVE_MESSAGES',
  FETCH_MESSAGES = 'FETCH_MESSAGES',
  POST_MESSAGE = 'POST_MESSAGE'
}

export const messageActions = {
  startRequest: () => createAction(MessageActionsEnum.START_REQUEST),
  endRequest: () => createAction(MessageActionsEnum.END_REQUEST),
  receiveMessages: (data: Message[]) => createAction(MessageActionsEnum.RECEIVE_MESSAGES, data),
  // saga triggers
  fetchMessages: () => createAction(MessageActionsEnum.FETCH_MESSAGES),
  postMessage: (message: string) => createAction(MessageActionsEnum.POST_MESSAGE, message)
};

export type MessageActions = ActionsUnion<typeof messageActions>;
