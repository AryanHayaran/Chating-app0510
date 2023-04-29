import React, { useContext, useReducer, useState } from "react";
import { createContext } from "react";
export const MessageContext = createContext();
import { reducer, initialfiles, FILE } from "./reducer"

export const StateProvider = ({ children }) => {
  return (
    <MessageContext.Provider value={useReducer(reducer,initialfiles)}>
      {children}
    </MessageContext.Provider>
  );
};

export const useRoom = () => {
  return useContext(MessageContext);
};


