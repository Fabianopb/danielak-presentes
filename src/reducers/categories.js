import {
  START_REQUEST,
  END_REQUEST,
  RECEIVE_CATEGORIES
} from '../actions/categories';

const categoriesInitialState = {
  isFetching: false,
  data: []
};

const categoriesReducer = (state = categoriesInitialState, action = {}) => {
  switch (action.type) {
    case START_REQUEST:
      return {...state, isFetching: true};
    case END_REQUEST:
      return {...state, isFetching: false};
    case RECEIVE_CATEGORIES:
      return {...state, data: action.data};
    default:
      return state;
  }
};

export default categoriesReducer;
