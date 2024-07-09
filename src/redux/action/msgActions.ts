export const setLastMessage = (lastMessage: string) => {
  return {
    type: "SET_MESSAGE",
    lastMessage,
  };
};
export const deleteLastMessage = () => {
  return {
    type: "DELETE_MESSAGE",
  };
};
