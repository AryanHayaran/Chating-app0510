import React from "react";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Chat from "./component/Chat";
import { FILE } from "./reducer";
import { useRoom } from "./StateProvider";
import Error from "./component/Error";
// export const socket = io.connect("http://localhost:3000");
export const socket = io.connect("https://backend-app05.onrender.com/");
const App = () => {
  const [{ room }, dispatch] = useRoom();
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        {room.length > 0 && <Route path="/chat" element={<Chat />} /> }
      </Routes>
    </div>
  );
};

export default App;
