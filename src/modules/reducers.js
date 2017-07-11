import { combineReducers } from 'redux';

const initialState = {
  test: 0
};

const testReducer = (test = initialState.test, action = {}) => {
  if (action.type === 'TEST_ACTION') {
    console.log('woot', test);
    return test + 2;
  }
  return test;
};

const combinedReducers = combineReducers({
  test: testReducer
});

export { combinedReducers };
