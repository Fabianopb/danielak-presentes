import { combineReducers, Reducer } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as notifications } from 'react-notification-system-redux';
import categories from './categories';
import products from './products';
import users from './users';

const rootReducer: Reducer<Partial<RootState>> = combineReducers({
  categories,
  products,
  users,
  form,
  notifications
});

export default rootReducer;
