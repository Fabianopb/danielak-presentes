import { CategoryActionsEnum, CategoryActions } from "../actions/categories";
import { categoriesState } from "./initialState";

const categoriesReducer = (
  state = categoriesState,
  action: CategoryActions
): CategoriesState => {
  switch (action.type) {
    case CategoryActionsEnum.START_REQUEST:
      return { ...state, isFetching: true };
    case CategoryActionsEnum.END_REQUEST:
      return { ...state, isFetching: false };
    case CategoryActionsEnum.RECEIVE_CATEGORIES:
      return { ...state, data: action.payload };
    case CategoryActionsEnum.SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload };
    case CategoryActionsEnum.OPEN_DIALOG:
      return { ...state, isDialogOpen: true };
    case CategoryActionsEnum.CLOSE_DIALOG:
      return { ...state, isDialogOpen: false };
    default:
      return state;
  }
};

export default categoriesReducer;
