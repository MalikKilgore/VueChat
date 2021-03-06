import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

// Firebase init - project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLZBoD5Pfym98sFixMTlTwxMpjykbnvBY",
    authDomain: "vuechat-80a67.firebaseapp.com",
    databaseURL: "https://vuechat-80a67.firebaseio.com",
    projectId: "vuechat-80a67",
    storageBucket: "vuechat-80a67.appspot.com",
    messagingSenderId: "709030886765",
    appId: "1:709030886765:web:c389fe949560da5c4d6e64"
}

//Initialize Firebase
firebase.initializeApp(firebaseConfig)


// Utils
const db = firebase.firestore()
const auth = firebase.auth()
const analytics = firebase.analytics();

// Collection references
const usersCollection = db.collection('users')

const programChat = db.collection('messages').doc('Chatrooms').collection('programming')
const networkChat = db.collection('messages').doc('Chatrooms').collection('networking')
const creativeChat = db.collection('messages').doc('Chatrooms').collection('creative')
const generalChat = db.collection('messages').doc('Chatrooms').collection('general')
const bugChat = db.collection('messages').doc('Chatrooms').collection('bug-report')

const videoRooms = db.collection('video-rooms')

export {
    db,
    auth,
    analytics,
    usersCollection,
    programChat,
    networkChat,
    creativeChat,
    generalChat,
    bugChat,
    videoRooms
}