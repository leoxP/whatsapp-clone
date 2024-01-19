import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import { addDoc, collection, orderBy, query, limit, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, addNewChat, name }) {
  const [seed, setSeed] = useState(""); /*Initial state of seed */
  /* variable,function */

  const [lastMessage,setLastMessage]=useState("");

  useEffect(() => {
    const fetchLastMessage = async () => {
      if (id) {
        const messagesCollection = collection(db, "rooms", id, "messages");
        const messagesQuery = query(messagesCollection, orderBy("timestamp", "desc"), limit(1));

        try {
          const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const lastMessageDoc = snapshot.docs[0];
  
            if (lastMessageDoc) {
              setLastMessage(lastMessageDoc.data().message);
            }
          });

          return () => {
            unsubscribe(); // detaches real-time listener after usage
          };
        } catch (error) {
          console.error("Error fetching last message: ", error);
        }
      }
    };

    fetchLastMessage();
  }, [id]);

  /* Hook to generate random number */
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  /* [] dependency array runs only once*/

  const avatarStyle = {
    marginTop: "15px", // Adjust the value as needed
    marginRight: "15px",
  };

  const createChat = async () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      try {
        return await addDoc(collection(db, "rooms"), { name: roomName });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`} >
    <div className="sidebarChat">
      <Avatar
        style={avatarStyle}
        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`}
      />
      <div className="sidebarChat__info">
        <h3>{addNewChat ? "Add new Chat" : name}</h3>
        <p>{lastMessage}</p>
      </div>
    </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h3>Add new Chat</h3>
    </div>
  );
}

export default SidebarChat;
