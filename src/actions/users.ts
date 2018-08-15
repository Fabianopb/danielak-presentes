import { createAction, ActionsUnion } from '../modules/helpers';

export enum UserActionsEnum {
  START_REQUEST = 'START_REQUEST',
  END_REQUEST = 'END_REQUEST',
  ERROR_REQUEST = 'ERROR_REQUEST',
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT'
}

export const userActions = {
  startRequest: () => createAction(UserActionsEnum.START_REQUEST),
  endRequest: () => createAction(UserActionsEnum.END_REQUEST),
  handleError: (error: any) => createAction(UserActionsEnum.ERROR_REQUEST, error),
  // saga triggers
  login: (credentials: LoginRequestParams) => createAction(UserActionsEnum.LOG_IN, credentials),
  logout: () => createAction(UserActionsEnum.LOG_OUT)
};

export type UserActions = ActionsUnion<typeof userActions>;
