import { createAction, ActionsUnion } from '../modules/helpers';

export enum MessageActionsEnum {
  START_REQUEST = 'START_REQUEST',
  END_REQUEST = 'END_REQUEST',
  RECEIVE_MESSAGES = 'RECEIVE_MESSAGES',

  GET_MESSAGES = 'GET_MESSAGES',
}

export const messageActions = {
  startRequest: () => createAction(MessageActionsEnum.START_REQUEST),
  endRequest: () => createAction(MessageActionsEnum.END_REQUEST),
  receiveMessages: (data: Message[]) => createAction(MessageActionsEnum.RECEIVE_MESSAGES, data),
  // saga triggers
  fetchMessages: () => createAction(MessageActionsEnum.GET_MESSAGES)
};

export type MessageActions = ActionsUnion<typeof messageActions>;
