import axios from 'axios';
import { Dispatch } from 'redux';
import * as moment from 'moment';
import history from '../modules/history';
import { createAction, ActionsUnion } from '../modules/helpers';

/* -------------------------- */
/*           ACTIONS          */
/* -------------------------- */
export enum UserActionsEnum {
  START_REQUEST = 'START_REQUEST',
  END_REQUEST = 'END_REQUEST',
  ERROR_REQUEST = 'ERROR_REQUEST',
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
  IS_SESSION_VALID = 'IS_SESSION_VALID'
}

/* -------------------------- */
/*      ACTIONS CREATORS      */
/* -------------------------- */
export const userActions = {
  startRequest: () => createAction(UserActionsEnum.START_REQUEST),
  endRequest: () => createAction(UserActionsEnum.END_REQUEST),
  handleError: (error: any) => createAction(UserActionsEnum.ERROR_REQUEST, error),
  // saga triggers
  login: () => createAction(UserActionsEnum.LOG_IN),
  logout: () => createAction(UserActionsEnum.LOG_OUT),
  isSessionValid: () => createAction(UserActionsEnum.IS_SESSION_VALID)
};

export type UserActions = ActionsUnion<typeof userActions>;

/* -------------------------- */
/*       PRIVATE METHODS      */
/* -------------------------- */
const redirectTo = (route: string): void => {
  history.push(route);
};

const setSession = (token: string, expiry: string): void => {
  localStorage.setItem('token', token);
  localStorage.setItem('expiry', expiry);
};

const clearSession = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiry');
};

/* -------------------------- */
/*           THUNKS           */
/* -------------------------- */
export const loginThunk = (credentials: any) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(userActions.startRequest());
      const response = await axios.post(`/api/users/login`, credentials);
      setSession(response.data.token, response.data.expiry);
      redirectTo('/admin');
      dispatch(userActions.endRequest());
    } catch (error) {
      dispatch(userActions.handleError(error));
    }
  };
};

export const logoutThunk = () => {
  return () => {
    clearSession();
    redirectTo('/');
  };
};

export const isSessionValidThunk = () => {
  return () => moment(localStorage.getItem('expiry') as string).isAfter(moment());
};
