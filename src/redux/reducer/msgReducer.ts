export type MessageState = {
  lastMessage?: string | null;
};

type MessageAction = {
  type: "SET_MESSAGE" | "DELETE_MESSAGE";
  lastMessage: string;
};
const initialState: MessageState = {
  lastMessage: null,
};
export const msgReducer = (
  state: MessageState = initialState,
  action: MessageAction,
) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return { ...state, lastMessage: action.lastMessage };
    case "DELETE_MESSAGE":
      return { ...state, lastMessage: null };
    default:
      return state;
  }
};
