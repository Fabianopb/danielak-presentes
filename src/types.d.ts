import { compose } from "redux";
import { NotificationsState } from "react-notification-system-redux";
import { FormStateMap } from "redux-form";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }

  type RootState = {
    categories: CategoriesState;
    products: ProductsState;
    users: UsersState;
    form: FormStateMap;
    notifications: NotificationsState;
  }

  type CategoriesState = {
    isFetching: boolean;
    data: any[];
    isDialogOpen: boolean;
    activeCategory: any;
  };

  type ProductsState = {
    isFetching: boolean;
    activeProduct: any;
    isDialogOpen: boolean;
    data: any[];
    error: any;
  };

  type UsersState = {
    isLogging: boolean;
    error: any;
  };
}
