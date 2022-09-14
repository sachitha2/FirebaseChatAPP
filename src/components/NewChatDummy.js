import React from 'react'
import firebase from 'firebase'
import {useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase'

function NewChatDummy({from,to,fromName,toName}) {
    const navigate = useNavigate();
    let room = uuidv4()
    
    // const check2 = db.collection('chatData').where("to","==",from).where("from","==",to);

    
    const createNewChat = async () => {

        const chat1 = await db.collection('chatData').where("from","==",from).where("to","==",to).get();
        const chat2 = await db.collection('chatData').where("from","==",to).where("to","==",from).get();
        
        if(chat1.size == 0 && chat2.size == 0){
            await db.collection('chatData').add({
                from,
                to,
                fromName,
                toName,
                room,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })

            await db.collection('chatData').add({
                from:to,
                to:from,
                fromName:toName,
                toName:fromName,
                room,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            navigate(`/user/${from}/${room}`, {replace: true});
        }else{
            navigate(`/user/${from}/room1`, {replace: true});
        }
        

        
    }
    return (
        <div className="chatItem" onClick={createNewChat}>New Chat dummy</div>
    )
}

export default NewChatDummy