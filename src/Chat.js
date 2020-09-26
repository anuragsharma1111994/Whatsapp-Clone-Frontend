import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import "./Chat.css";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useState } from "react";
import axios from "./axios";

function Chat({ messages }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    axios.post("/message/new", {
      message: input,
      name: "Demo",
      timestamp: "12:33",
      received: true,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png" />

        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last Status at ..</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((messages) => (
          <p
            className={`chat__message ${messages.received && "chat__reciever"}`}
          >
            <span className="chat__name">{messages.name}</span>
            {messages.message}
            <span className="chat__timestamp">{messages.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__fotter">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a Message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}
export default Chat;
