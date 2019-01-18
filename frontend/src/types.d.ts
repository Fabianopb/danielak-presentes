import { compose } from 'redux';
import { NotificationsState } from 'react-notification-system-redux';
import { FormStateMap } from 'redux-form';
import { RouterState } from 'connected-react-router';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }

  type RootState = {
    categories: CategoriesState;
    products: ProductsState;
    messages: MessagesState;
    users: UsersState;
    form: FormStateMap;
    notifications: NotificationsState;
    router: RouterState;
  }

  type CategoriesState = {
    isFetching: boolean;
    data: Category[];
    isDialogOpen: boolean;
    activeCategory: Category | null;
  };

  type MessagesState = {
    isFetching: boolean;
    data: Message[];
  };

  type ProductsState = {
    isFetching: boolean;
    activeProduct: Product | null;
    isDialogOpen: boolean;
    data: Product[];
  };

  type UsersState = {
    isLogging: boolean;
  };

  type ProductImage = {
    large: string,
    small: string
  };

  interface Product {
    _id: string;
    name: string;
    image: ProductImage[];
    featuredImageIndex: number;
    storeLink: string;
    description: string;
    category: string;
    currentPrice: number;
    discountPrice: number;
    tags: string;
    productionTime: number;
    minAmount: number;
    width: number;
    height: number;
    depth: number;
    weight: number;
    isVisible: boolean;
    isFeatured: boolean;
  }

  interface Category {
    _id?: string;
    name: string;
    description: string;
    removed: boolean;
  }

  interface Message {
    text: string[];
    new: boolean;
    answered: boolean;
  }

  interface QueryParams {
    category: string;
  }

  interface LoginRequestParams {
    email: string;
    password: string;
  }

  interface LoginRequestResponse {
    data: {
      token: string;
      expiry: string;
    }
  }
}
