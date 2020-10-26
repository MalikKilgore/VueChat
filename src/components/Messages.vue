<template>  
    <div id="msgList">

    </div>
    <br>
      <div id="chat-form-container">
        <form id="chat-form" @submit.prevent>
          <input
            id="message"
            name="message"
            type="text"
            placeholder="Send a message..."
            v-model="message.content"
            autocomplete="off"
            required
          />
          <button class="btn" v-on:click="sendMsg">Send</button>
        </form>
      </div>    
</template>

<script>
import Vue, { watch, computed } from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import Vuefire from 'vuefire'
import 'firebase/auth'
import router from '../router'
import store from '../store'
import {db, usersCollection, programChat, networkChat, creativeChat} from '../firebase/firebase.js'

export default {
  name: 'Messages',
  data() {
    return {
      route: {
        id: this.$route.params.chatID,
        path: this.$route.path,
      },
      message: {
        //from: TBA,
        content: '',
        databaseStr: '',
        databasePln: null
      },
      unsubscribe: null
    }
  },

  methods: {
    //Fetches the current database and updates it in VueX state
    fetchDatabase(){
      switch(this.route.path){
        case '/chatrooms/programming':
          this.message.databaseStr = `programChat`
          this.message.databasePln = programChat
          this.$store.dispatch('activeRoute', {
            message: this.message.content,
            dbStr: this.message.databaseStr,
            dbPln: this.message.databasePln
          })
          break
        case '/chatrooms/networking':
          this.message.databaseStr = `networkChat`
          this.message.databasePln = networkChat
          this.$store.dispatch('activeRoute', {
            message: this.message.content,
            dbStr: this.message.databaseStr,
            dbPln: this.message.databasePln
          })          
          break
        case '/chatrooms/creative':
          this.message.databaseStr = `creativeChat`
          this.message.databasePln = creativeChat
          this.$store.dispatch('activeRoute', {
            message: this.message.content,
            dbStr: this.message.databaseStr,
            dbPln: this.message.databasePln
          })
          break
        case `/home/:${chatID}`:
          //THIS needs edited
          this.message.databaseStr = `creativeChat`
          this.message.databasePln = creativeChat
          this.$store.dispatch('activeRoute', {
            message: this.message.content,
            dbStr: this.message.databaseStr,
            dbPln: this.message.databasePln
          })
          break
      }      
    },
    //Reads the current Database in VueX state. Adds a firebase listener and displays active Database documents in the DOM
    renderDOM(){
      console.log('starting renderDOM')
      const database = store.state.currentDatabase
      const msgList = document.getElementById('msgList')
      
      this.unsubscribe = database.onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {

        if (change.type === "added") {
          console.log("New message: ", change.doc.data());
          let msg = document.createElement('div')
          msg.setAttribute('data-id', change.doc.id)
          msg.classList = 'message'

          msg.style.backgroundColor = '#4e609a'
          msg.style.color = '#ffffff'
          msg.style.fontWeight = 'bold'
          msg.style.padding = '7px'
          msg.style.marginBottom = '10px'
          msg.style.borderRadius = '5px'

          msg.innerText = change.doc.data().content
          document.getElementById(`msgList`).appendChild(msg)
        }
        if (change.type === "modified") {
          console.log("Modified message: ", change.doc.data());
          let editMsg = msgList.querySelector('[data-id=' + change.doc.id + ']')
          editMsg.innerText = change.doc.data().content
        }
        if (change.type === "removed") {
          console.log("Removed message: ", change.doc.data());
          let rmMsg = msgList.querySelector('[data-id=' + change.doc.id + ']')
          msgList.removeChild(rmMsg)
        }

        });
      });

    },

    //Sends message to the firestore the user is currently using
    sendMsg(){
      document.getElementById('chat-form').reset()
      //Dispatches String and plain text of current Database
      this.$store.dispatch('sendMsg', {
        message: this.message.content,
        dbStr: this.message.databaseStr,
        dbPln: this.message.databasePln
      })     
    },
  },

  //Updates active route and database when current path changes
  mounted(){
    this.$store.dispatch('activeRoute', {
      id: this.route.id,
      path: this.route.path
    }).then(this.fetchDatabase())
   this.renderDOM()
  },

  //Unsubscribes from current firestore listener. Prevents duplicate listeners from being active at once.
  beforeUnmount(){
    console.log('UNSUBBED')
    this.unsubscribe()
  },

}
</script>

<style scoped lang="scss">
#msgList {
  background-color: #23272A;
  height: 900px;
  width: 3fr;
  padding: 30px;
  overflow-y: scroll;
}

#chat-form-container {
  width: 100%;
}

#chat-form-container form {
  display: flex;
}

#chat-form-container input[type='text'] {
	font-size: 16px;
	padding: 5px;
	height: 40px;
	flex: 1;
}

#btn {
	padding: 5px 15px;
	background: #ffffff;
	color: #2c3e50;
	border: 0;
	border-radius: 5px;
	font-size: 17px;
}
</style>