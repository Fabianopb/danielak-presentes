import { RouterActionType } from 'connected-react-router';

export const initialState: RootState = {
  form: {},
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
