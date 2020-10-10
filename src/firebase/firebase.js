import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/messaging'

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

/* TODO: Implementing Cloud messaging after other features are finished

const messaging = firebase.messaging();

// Messaging permissions


// Public messaging key
messaging.getToken("BILCRUUcAOMn5QPUgyDhfhBc6WTHYVzkRT-DeYFhOsBefjKMRLb0GK5pEW2iyQigWLUcKR8pYOumUYaT5VAMyCE");
*/

// Collection references - https://firebase.google.com/docs/firestore/data-model
const usersCollection = db.collection('users')
const roomCollection = db.collection('messages').doc('Chatrooms')
// Used to create a new collection between two users
const dmCollection = db.collection('messages').doc('Private')

export {
    db,
    auth,
    usersCollection,
    roomCollection,
    dmCollection
}