import axios from 'axios';
import moment from 'moment';
import history from '../history';

/* -------------------------- */
/*           ACTIONS          */
/* -------------------------- */
export const START_REQUEST = 'START_REQUEST';
export const END_REQUEST = 'END_REQUEST';
export const ERROR_REQUEST = 'ERROR_REQUEST';
export const LOG_IN = 'LOG_IN';

/* -------------------------- */
/*      ACTIONS CREATORS      */
/* -------------------------- */
const startRequest = () => ({type: START_REQUEST});
const endRequest = () => ({type: END_REQUEST});
const handleError = (error) => ({type: ERROR_REQUEST, error});
// const login = () => ({type: LOG_IN});

/* -------------------------- */
/*       PRIVATE METHODS      */
/* -------------------------- */
const _redirectTo = (route) => {
  history.push(route);
};

const _setSession = (token, expiry) => {
  localStorage.setItem('token', token);
  localStorage.setItem('expiry', expiry);
};

const _clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiry');
};

/* -------------------------- */
/*           THUNKS           */
/* -------------------------- */
export const login = (credentials) => {
  return async (dispatch) => {
    try {
      dispatch(startRequest());
      const response = await axios.post(`/api/users/login`, credentials);
      _setSession(response.data.token, response.data.expiry);
      _redirectTo('/admin');
      dispatch(endRequest());
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

export const logout = () => {
  return () => {
    _clearSession();
    _redirectTo('/');
  };
};

export const isSessionValid = () => {
  return () => moment(localStorage.getItem('expiry')).isAfter(moment());
};
