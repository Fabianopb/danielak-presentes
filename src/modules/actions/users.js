import axios from 'axios';
import moment from 'moment';
import history from '../history';

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

function redirectTo (route) {
  history.push(route);
}

function setSession (token, expiry) {
  localStorage.setItem('token', token);
  localStorage.setItem('expiry', expiry);
}

export function login (credentials) {
  return (dispatch) => {
    dispatch(startRequest());
    axios.post(`/api/users/login`, credentials)
      .then(response => {
        setSession(response.data.token, response.data.expiry);
        redirectTo('/admin');
        dispatch(endRequest());
      })
      .catch(error => dispatch(handleError(error)));
  };
}

export function clearSession () {
  localStorage.removeItem('token');
  localStorage.removeItem('expiry');
}

export function isSessionValid () {
  return moment(localStorage.getItem('expiry')).isAfter(moment());
}
