export const initialfiles = {
  room: "",
  userName: "",
  receiverName: "",
  messages: [],
};

export const FILE = {
  ROOM: "room",
  USERNAME: "userName",
  RECEIVERNAME: "receiverName",
  MESSAGES: "messages",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case FILE.ROOM:
      return {
        ...state,
        room: action.room,
      };
    case FILE.USERNAME:
      return {
        ...state,
        userName: action.userName,
      };
    case FILE.RECEIVERNAME:
      return {
        ...state,
        receiverName: action.receiverName,
      };
    case FILE.MESSAGES:
      console.log(action.messages);
      return {
        ...state,
        messages: [...state.messages, action.messages],
      };
    default:
      return state;
  }
};
