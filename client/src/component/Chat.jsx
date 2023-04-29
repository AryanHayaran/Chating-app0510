import React from "react";

import { useEffect, useState } from "react";
import { useRoom } from "../StateProvider";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import "./Chat.css";
import { FILE } from "../reducer";
import { socket } from "../App";
import Box from "./Box";
import ScrollToBottom from "react-scroll-to-bottom";
const Chat = () => {
  const [{ room, userName, receiverName, messages }, dispatch] = useRoom();
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message.length > 0) {
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const messageBody = {
        author: userName,
        room: room,
        message: message,
        time: now,
      };

      await socket.emit("send_message", messageBody);
      dispatch({ type: FILE.MESSAGES, messages: messageBody });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      dispatch({ type: FILE.RECEIVERNAME, receiverName: data.author });
      dispatch({
        type: FILE.MESSAGES,
        messages: data,
      });
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const navigate = useNavigate();
  return (
    <div className="chat">
      <div className="chat_title">
        <p>Chat Messenger</p>
      </div>
      <ScrollToBottom className="chat_body">
        {messages.length > 0 &&
          messages.map(({ author, room, time, message }) => {
            return (
              <Box
                message={message}
                time={time}
                box={userName === author ? "user" : "receiver"}
              />
            );
          })}
      </ScrollToBottom>

      <form className="chat_sender" onSubmit={(e) =>{ e.preventDefault()}}>
        <input
          type="text"
          className="chat_senderInput"
          placeholder="Type a Message..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        />
        <button onClick={sendMessage} className="chat_senderButton" type="submit">
          <SendIcon className="chat_senderButtonIcon" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
