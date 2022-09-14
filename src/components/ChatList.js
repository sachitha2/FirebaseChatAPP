import React, { useState,useEffect } from "react";
import {
    Link
  } from "react-router-dom";
import { db } from '../firebase'


function ChatList({uid}) {
    const [myChatList,setMyChatList] = useState([]) 
    useEffect(() => {
        db.collection('chatData').where("from","==",uid).onSnapshot(snapshot => {
            setMyChatList(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
  return (
    <div className="chatList">
      {/* My chats */}
      {myChatList.map((data)=>(
        <Link to={`/user/${uid}/${data.room}`}>
            <div className="chatItem">{data.toName}</div>
        </Link>
      ))}
      
    </div>
  );
}

export default ChatList;
