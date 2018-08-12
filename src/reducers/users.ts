import { UserActionsEnum, UserActions } from '../actions/users';
import { usersState } from './initialState';

const usersReducer = (users = usersState, action: UserActions): UsersState => {
  switch (action.type) {
    case UserActionsEnum.START_REQUEST:
      return {...users, isLogging: true};
    case UserActionsEnum.END_REQUEST:
      return {...users, isLogging: false};
    case UserActionsEnum.ERROR_REQUEST:
      return {...users, isLogging: false, error: action.payload};
    default:
      return users;
  }
}

export default usersReducer;
