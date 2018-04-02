import {
  START_REQUEST,
  END_REQUEST,
  ERROR_REQUEST
} from '../actions/users';

const initialState = {
  users: {
    isLogging: false,
    error: null
  }
};

export function usersReducer (users = initialState.users, action = {}) {
  switch (action.type) {
    case START_REQUEST:
      return {...users, isLogging: true};
    case END_REQUEST:
      return {...users, isLogging: false};
    case ERROR_REQUEST:
      return {...users, isLogging: false, error: action.error};
    default:
      return users;
  }
}
