import React, { useState, useEffect, useRef } from 'react'
import {
    useParams
} from "react-router-dom";
import { db } from '../firebase'
import ChatList from './ChatList';
import SendMessage from './SendMessage'

function Chat() {
    let { cuid,room } = useParams();
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    useEffect(() => {
        db.collection('chats').doc(room).collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [room])
    return (
        <div className='chatContainer'>
        
            <ChatList uid={cuid}/>
            <div className='chatUI'>
                <div className="msgs">
                    {messages.map(({ id, text, uid,image }) => (
                        <div>
                            {
                                image ? 
                                <div key={id} className={`${uid === cuid ? 'sentimg' : 'receivedimg'}`}>
                                    {image ? <img src={image} alt="image tag" style={{maxWidth:"400px"}}/>:null}
                                </div>
                                :

                                <div key={id} className={`msg ${uid === cuid ? 'sent' : 'received'}`}>
                                {/* <img src={photoURL} alt="" /> */}
                                <p>{text}</p>
                                </div>

                            }
                            
                        </div>
                    ))}
                </div>
                <SendMessage scroll={scroll} uid={cuid} room={room}/>
                <div ref={scroll}></div>
            </div>
        </div>
    )
}

export default Chat
