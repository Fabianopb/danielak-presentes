import { RouterActionType } from 'connected-react-router';

export const initialState: RootState = {
  form: {},
  notifications: [],
  router: {
    location: {
      pathname: '',
      search: '',
      hash: '',
      state: null,
    },
    action: 'POP' as RouterActionType,
  },
};
