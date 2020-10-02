import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(firestorePlugin)

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