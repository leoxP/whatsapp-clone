import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore"; 
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [user,] = useStateValue();

  useEffect(() => {
    if (roomId) {
      const roomDocRef = doc(db, "rooms", roomId);

      const unsubscribe = onSnapshot(roomDocRef, (snapshot) => {
        setRoomName(snapshot.data().name);
      });

      const messagesCollection = collection(db, "rooms", roomId, "messages");

      onSnapshot(messagesCollection, (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => doc.data());
        const sortedMessages = messagesData.sort(
          (a, b) => a.timestamp - b.timestamp
        );
        setMessages(sortedMessages);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [roomId]);

  useEffect(() => {
    const chatBody = document.querySelector(".chat__body");
    chatBody.scrollTop = chatBody.scrollHeight;
  }, [messages]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const addMessageToCollection = async () => {
    const newMessage = {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "rooms", roomId, "messages"), newMessage);
  };
  
  const sendMessage = (e) => {
    e.preventDefault();
    addMessageToCollection();
    setInput("");
  }; 

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`}
        />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p className={`chat__message ${true && "chat__receiver"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder=" Type a message"
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