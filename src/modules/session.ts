import * as moment from 'moment';

/**
 * Sets session in the local storage
 * @param {string} token session token
 * @param {string} expiry expiry date
 * @returns {void}
 */
export const setSession = (token: string, expiry: string): void => {
  localStorage.setItem('token', token);
  localStorage.setItem('expiry', expiry);
};

/**
 * Clears session from local storage
 * @returns {void}
 */
export const clearSession = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiry');
};

/**
 * Verifies if session is still valid
 * @returns {boolean} `true` if session is valid
 */
export const isSessionValid = (): boolean => {
  return moment(localStorage.getItem('expiry') as string).isAfter(moment());
};
