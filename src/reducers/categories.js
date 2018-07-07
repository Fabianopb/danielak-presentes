import {
  START_REQUEST,
  END_REQUEST,
  RECEIVE_CATEGORIES,
  SET_ACTIVE_CATEGORY,
  OPEN_DIALOG,
  CLOSE_DIALOG
} from '../actions/categories';

const categoriesInitialState = {
  isFetching: false,
  data: [],
  isDialogOpen: false,
  activeCategory: null
};

const categoriesReducer = (state = categoriesInitialState, action = {}) => {
  switch (action.type) {
    case START_REQUEST:
      return {...state, isFetching: true};
    case END_REQUEST:
      return {...state, isFetching: false};
    case RECEIVE_CATEGORIES:
      return {...state, data: action.data};
    case SET_ACTIVE_CATEGORY:
      return {...state, activeCategory: action.activeCategory};
    case OPEN_DIALOG:
      return {...state, isDialogOpen: true};
    case CLOSE_DIALOG:
      return {...state, isDialogOpen: false};
    default:
      return state;
  }
};

export default categoriesReducer;
