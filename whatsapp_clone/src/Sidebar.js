import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import { doc, setDoc, collection,onSnapshot} from "firebase/firestore";
import { db } from "./firebase";

function Sidebar() {

  const [rooms,setRooms]=useState([]);

  useEffect(() => {
    onSnapshot(collection(db, 'rooms'), (snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    //return () => unsubscribe();
  }, []);

  /*
  const addNewRoom = async () => {
    // Prompt the user for the new room name (you can use your UI for this)
    const newRoomName = prompt("Enter the name for the new room:");

    if (newRoomName) {
      // Add a new room document to the 'rooms' collection
      await setDoc(doc(collection(db, 'rooms')), { name: newRoomName });
    }
  };
  */
  
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat/>
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
