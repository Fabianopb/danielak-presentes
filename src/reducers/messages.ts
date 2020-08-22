import { MessageActionsEnum, MessageActions } from '../actions/messages';
import { messagesState } from './initialState';

const messagesReducer = (state = messagesState, action: MessageActions): MessagesState => {
  switch (action.type) {
    case MessageActionsEnum.START_REQUEST:
      return { ...state, isFetching: true };
    case MessageActionsEnum.END_REQUEST:
      return { ...state, isFetching: false };
    case MessageActionsEnum.TOGGLE_DIALOG:
      return { ...state, isDialogOpen: action.payload };
    case MessageActionsEnum.RECEIVE_MESSAGES:
      return { ...state, data: action.payload };
    case MessageActionsEnum.REDUCE_MESSAGE_ID:
      return { ...state, activeMessageId: action.payload };
    default:
      return state;
  }
};

export default messagesReducer;
