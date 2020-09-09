import { combineReducers, ReducersMapObject } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as notifications } from 'react-notification-system-redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import categories from './categories';
import products from './products';
import messages from './messages';
import { AnyAction } from '../modules/helpers';

const rootReducer = (history: History) =>
  combineReducers({
    categories,
    products,
    messages,
    form,
    notifications,
    router: connectRouter(history),
  } as ReducersMapObject<RootState, AnyAction>);

export default rootReducer;
