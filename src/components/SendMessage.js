import React, { useState } from 'react'
import { db,storage } from '../firebase'
import firebase from 'firebase'
import { Input, Button } from '@material-ui/core'

function SendMessage({ scroll,uid,room }) {
    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)

    console.log(imageAsFile)
    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    const handleFireBaseUpload = e => {
        e.preventDefault()
        console.log('start of upload')
        // async magic goes here...
        if(imageAsFile === '' ) {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        }
        const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed', 
        (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
        }, (err) => {
        //catches the errors
        console.log(err)
        }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(imageAsFile.name).getDownloadURL()
        .then(fireBaseUrl => {
            setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
            db.collection('chats').doc(room).collection('messages').add({
                text: "Image",
                image: fireBaseUrl,
                uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        })
        })
      }

    const [msg, setMsg] = useState('')

    async function sendMessage(e) {
        e.preventDefault()
        setMsg('')
        await db.collection('chats').doc(room).collection('messages').add({
            text: msg,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div className="sendMsg">
            <form onSubmit={handleFireBaseUpload} style={{display:"flex",flexDirection:"column"}}>
                <input 
                    // allows you to reach into your file directory and upload image to the browser
                    onChange={handleImageAsFile}        
                    type="file"
                />
                <button>upload and send</button>
                
            </form>
           
            <form onSubmit={sendMessage} style={{width:"100%"}}>
                <div style={{display:"flex",flexDirection:"row"}}>
                    <Input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</Button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage
