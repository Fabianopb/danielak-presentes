import axios from 'axios';
import moment from 'moment';

export const START_REQUEST = 'START_REQUEST';
export const END_REQUEST = 'END_REQUEST';
export const ERROR_REQUEST = 'ERROR_REQUEST';

export const LOG_IN = 'LOG_IN';

function startRequest () {
  return {
    type: START_REQUEST
  };
}

function endRequest () {
  return {
    type: END_REQUEST
  };
}

function handleError (error) {
  return {
    type: ERROR_REQUEST,
    error
  };
}

function setSession (token, expiry) {
  localStorage.setItem('token', token);
  localStorage.setItem('expiry', expiry);
}

export function logIn (credentials) {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const { data } = await axios.post(`/api/users/login`, credentials);
      dispatch(setSession(data.token, data.expiry));
    } catch (error) {
      dispatch(handleError(error));
    }
    dispatch(endRequest());
  };
}

export function clearSession () {
  localStorage.removeItem('token');
  localStorage.removeItem('expiry');
}

export function isSessionValid () {
  return moment(localStorage.getItem('expiry')).isAfter(moment());
}
