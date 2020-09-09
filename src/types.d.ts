import { compose } from 'redux';
import { Notification } from 'react-notification-system';
import { FormStateMap } from 'redux-form';
import { RouterState } from 'connected-react-router';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }

  interface RootState {
    categories: CategoriesState;
    products: ProductsState;
    messages: MessagesState;
    form: FormStateMap;
    notifications: Notification[];
    router: RouterState;
  }

  interface CategoriesState {
    isFetching: boolean;
    data: Category[];
    isDialogOpen: boolean;
    activeCategory: Category | null;
  }

  interface MessagesState {
    isFetching: boolean;
    data: Message[];
    activeMessageId?: string;
    isDialogOpen: boolean;
  }

  interface ProductsState {
    isFetching: boolean;
    activeProduct: Product | null;
    isDialogOpen: boolean;
    data: Product[];
  }

  interface UsersState {
    isLogging: boolean;
  }

  interface ProductImage {
    large: string;
    small: string;
    loading?: boolean;
  }

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
    _id: string;
    text: string[];
    new: boolean;
    answered: boolean;
    createdAt: Date;
  }

  interface ChatHistory {
    speaker: 'dani' | 'user';
    message: string;
    step?: number;
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
    };
  }
}
