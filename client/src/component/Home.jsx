import React, { useEffect, useReducer } from "react";
import io from "socket.io-client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../StateProvider";
import "./Home.css";
import { FILE } from "../reducer";
import { socket } from "../App";

const Home = () => {

  const [Room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [{ room, userName }, dispatch] = useRoom();
  const navigate = useNavigate();

  const joinRoom = () => {
    if (Room !== "") {
      socket.emit("join_room", Room);
      navigate("/chat");
      dispatch({ type: FILE.ROOM, room: Room });
      dispatch({ type: FILE.USERNAME, userName: username });
      setRoom("");
      setUsername("");
    }
  };

  return (
    <div className="login_box">
      <div className="login_title">
        <p>Login</p>
      </div>
      <div className="login_body">
        <input
          className="login_boxRoom"
          placeholder="Room id"
          value={Room}
          onChange={(e) => {setRoom(e.target.value)
            
          }}
        />

        <input
          value={username}
          className="login_boxUserName"
          placeholder="User Name"
          onChange={(e) => {setUsername(e.target.value)
          }}
        />

        <button className="login_join" onClick={joinRoom}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
