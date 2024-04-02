import React, { useEffect, useState, useRef } from "react";
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
  query,
  orderBy,
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
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (roomId) {
      const roomDocRef = doc(db, "rooms", roomId);

      const unsubscribe = onSnapshot(roomDocRef, (snapshot) => {
        setRoomName(snapshot.data().name);
      });

      const messagesCollection = collection(db, "rooms", roomId, "messages");
      const messagesQuery = query(messagesCollection, orderBy("timestamp"));

      const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
      });

      return () => {
        unsubscribe();
        unsubscribeMessages();
      };
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

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
          <p>Last Seen {" "}{
            new Date(
              messages[messages.length-1]?.timestamp?.toDate()
            ).toLocaleString()
          }
          </p>
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

      <div className="chat__body" ref={chatBodyRef}>
        {messages.map((message, index) => (
          <p key={index} className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toLocaleString()}
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
