import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyADa-0i7Kns6ohd0XUOROn7HHHnqjIhCFs",
    authDomain: "chat-app-chata.firebaseapp.com",
    projectId: "chat-app-chata",
    storageBucket: "chat-app-chata.appspot.com",
    messagingSenderId: "923062924302",
    appId: "1:923062924302:web:4605e9ed886b8bd57eb85f",
    measurementId: "G-9FX50M3WNN"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

const storage = firebase.storage()

export { db, auth,storage,firebase as default}