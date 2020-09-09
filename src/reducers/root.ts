import { combineReducers, ReducersMapObject } from 'redux';
import { reducer as form } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { AnyAction } from '../modules/helpers';

const rootReducer = (history: History) =>
  combineReducers({
    form,
    router: connectRouter(history),
  } as ReducersMapObject<RootState, AnyAction>);

export default rootReducer;
