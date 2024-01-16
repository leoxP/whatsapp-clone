import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";

function SidebarChat({ id,addNewChat,name }) {
    const [seed, setSeed] = useState(""); /*Initial state of seed */
           /* variable,function */

    /* Hook to generate random number */
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);
    /* [] dependency array runs only once*/

    const avatarStyle = {
        marginTop: '15px',  // Adjust the value as needed
        marginRight: '15px'
    };

    const createChat=()=>{
        const roomName=prompt("Please enter name for chat")
        if(name){
            //do some stuff
        }
    };
    
    return !addNewChat ?(
        <div className="sidebarChat">
            <Avatar style={avatarStyle} src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`} />
            <div className="sidebarChat__info">
                <h3>{addNewChat ? "Add new Chat" : name}</h3>
                <p>Last message...</p>
            </div>
        </div>
    ): (
        <div onClick={createChat} className="sidebarChat">
            <h3>Add new Chat</h3>
        </div>
    );
}

export default SidebarChat;
