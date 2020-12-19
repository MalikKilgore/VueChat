<template>  
<div id="msgRoot">
  <ChatVideo v-if="displayVid == true" />
   <div id="msgList">
      
    </div>
  <br>   
</div>
      <div id="chat-form-container">
        <form id="chat-form" novalidate @submit.prevent>
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
          <button class="btn" v-on:click="toggleVid">Video Chatroom</button>
        </form>
      </div> 
    
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import firebase, {toDate, toDateString, toLocaleTimeString} from 'firebase/app'
import router from '../router'
import store from '../store'
import ChatVideo from '../components/ChatVideo'
import {db, usersCollection, programChat, networkChat, 
creativeChat, generalChat, bugChat} from '../firebase/firebase.js'

export default {
  name: 'ChatMessages',
  data() {
    return {
      route: {
        id: this.$route.params.chatID,
        path: this.$route.path,
      },
      message: {
        content: '',
        databaseStr: '',
        databasePln: null
      },
      unsubscribe: null,
    }
  },
  components: {
    ChatVideo
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
        case '/chatrooms/general':
          this.message.databaseStr = `generalChat`
          this.message.databasePln = generalChat
          this.$store.dispatch('activeRoute', {
            message: this.message.content,
            dbStr: this.message.databaseStr,
            dbPln: this.message.databasePln
          })
          break
        case '/chatrooms/bugReport':
          this.message.databaseStr = `bugChat`
          this.message.databasePln = bugChat
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
      const database = store.state.currentDatabase
      const user = store.state.currentUser
      const msgList = document.getElementById('msgList')
      
      this.unsubscribe = database.orderBy('createdOn').onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
        //ADDED MESSAGES
        if (change.type === "added") {
          const time = change.doc.data().createdOn
          let sentFrom = document.createElement('div')
          sentFrom.setAttribute('sentBy-id', change.doc.id)
          sentFrom.classList = 'msgLabel'
          sentFrom.innerText = `Sent by ${change.doc.data().sentByEmail} on ${time.toDate().toDateString()} at ${time.toDate().toLocaleTimeString()}`
          sentFrom.style.fontSize = '15px'
          sentFrom.style.color = '#ffffff'
          sentFrom.style.width = 'fit-content'
          sentFrom.style.maxWidth = '50%'
          sentFrom.style.height = 'fit-content'

          //Creates Msg div and sets styling/attributes for reference in DOM and Firebase
          let msg = document.createElement('div')
          msg.setAttribute('data-id', change.doc.id)
          msg.classList = 'message'
          msg.style.backgroundColor = '#4e609a'
          msg.style.color = '#ffffff'
          msg.style.fontWeight = 'bold'
          msg.style.fontSize = '20px'
          msg.style.padding = '7px'
          msg.style.marginBottom = '10px'
          msg.style.borderRadius = '5px'
          msg.style.width = 'fit-content'
          msg.style.maxWidth = '50%'
          msg.style.height = 'fit-content'
          msg.style.wordWrap = 'break-word'
          msg.innerText = change.doc.data().content

          //Changes message position and color if doc was created by the same user set in the currentUser state store 
          if (change.doc.data().sentByEmail == user.email){
            //Deletes Message from Firebase when clicked
            let dlt = document.createElement('button')
            dlt.innerText = 'X'
            dlt.classList = 'dlt'
            dlt.style.color = '#ffffff'
            dlt.style.fontWeight = 'bold'
            dlt.style.fontSize = '16px'
            dlt.style.padding = '4px'
            dlt.style.border = '0'
            dlt.style.borderRadius = '5px'
            dlt.style.float = 'right'
            dlt.style.top = '0'

            dlt.addEventListener('click', function(e){
              let parentNode = this.parentElement
              let thisMsg = parentNode.getAttribute('data-id')
              store.dispatch('dltMsg', thisMsg);
            });

            //Shows Edit form when clicked
            let edit = document.createElement('button')
            edit.innerText = 'Edit'
            edit.classList = 'edit'
            edit.style.color = '#ffffff'
            edit.style.fontWeight = 'bold'
            edit.style.fontSize = '16px'
            edit.style.border = '0'
            edit.style.borderRadius = '5px'
            edit.style.padding = '4px'
            edit.style.float = 'right'
            edit.style.top = '0'

          // Form/Input Creation.
          let thisDoc = change.doc.id
          let form = document.createElement('form')
          let input = document.createElement('input')

          input.style.fontSize = '20px'
          input.style.borderRadius = '5px'
          input.style.backgroundColor = '#33436a'
          input.style.color = '#ffffff'
          input.style.padding = '5px'

          let input2 = document.createElement('input')
          input.setAttribute('type', 'text')
          input.placeholder = 'Edit message...'
          input2.setAttribute('type', 'submit')
          input2.setAttribute('style', 'display: none')
            form.addEventListener('submit', function(e){
              e.preventDefault()
              store.dispatch('editMsg', {
                id: thisDoc,
                content: input.value
              })
            })
          form.appendChild(input2)
          form.appendChild(input)
          form.style.display = "none"
          
          // Shows/Hides the form
          edit.addEventListener('click', function(e){
              if (form.style.display === "none") {
                form.style.display = "block";
              } else {
               form.style.display = "none";
               }
          })

            sentFrom.style.marginLeft = 'auto'
            sentFrom.innerText = `${time.toDate().toDateString()} at ${time.toDate().toLocaleTimeString()}`
            msg.style.marginLeft = 'auto'
            msg.style.backgroundColor = '#33436a'
            edit.style.backgroundColor = '#4e609a'
            dlt.style.backgroundColor = '#4e609a'

          msg.appendChild(dlt)
          msg.appendChild(edit)
          msg.appendChild(form)
          }

          document.getElementById(`msgList`).appendChild(msg)
          msg.insertAdjacentElement('beforebegin', sentFrom)
          msg.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
        }
        //MODIFIED MESSAGES
        if (change.type === "modified") {
          
          let editMsg = msgList.querySelector('[data-id=' + change.doc.id + ']')
          editMsg.innerText = change.doc.data().content
          if (change.doc.data().sentByEmail == user.email){          
            let dlt = document.createElement('button')
          dlt.innerText = 'X'
          dlt.classList = 'dlt'
          dlt.style.backgroundColor = '#4e609a'
          dlt.style.color = '#ffffff'
          dlt.style.fontWeight = 'bold'
          dlt.style.fontSize = '16px'
          dlt.style.padding = '4px'
          dlt.style.border = '0'
          dlt.style.borderRadius = '5px'
          dlt.style.float = 'right'
          dlt.style.top = '0'
          dlt.addEventListener('click', function(e){
            let parentNode = this.parentElement
            let thisMsg = parentNode.getAttribute('data-id')
            store.dispatch('dltMsg', thisMsg);
          });

          //Shows Edit form when clicked
          let edit = document.createElement('button')
          edit.innerText = 'Edit'
          edit.classList = 'edit'
          edit.style.backgroundColor = '#4e609a'
          edit.style.color = '#ffffff'
          edit.style.fontWeight = 'bold'
          edit.style.fontSize = '16px'
          edit.style.border = '0'
          edit.style.borderRadius = '5px'
          edit.style.padding = '4px'
          edit.style.float = 'right'
          edit.style.top = '0'

          // Form/Input Creation.
          let thisDoc = editMsg.getAttribute('data-id')
          let form = document.createElement('form')
          let input = document.createElement('input')
          let input2 = document.createElement('input')
          input.setAttribute('type', 'text')

          input.placeholder = 'Edit message...'
          input.style.fontSize = '20px'
          input.style.borderRadius = '5px'
          input.style.backgroundColor = '#33436a'
          input.style.color = '#ffffff'
          input.style.padding = '5px'

          input2.setAttribute('type', 'submit')
          input2.setAttribute('style', 'display: none')
            form.addEventListener('submit', function(e){
              e.preventDefault()
              store.dispatch('editMsg', {
                id: thisDoc,
                content: input.value,
              })
            })
          form.appendChild(input2)
          form.appendChild(input)
          form.style.display = "none"

          // Shows/Hides the form
          edit.addEventListener('click', function(e){
              if (form.style.display === "none") {
                form.style.display = "block";
              } else {
               form.style.display = "none";
               }
          })
          editMsg.appendChild(dlt)
          editMsg.appendChild(edit)
          editMsg.appendChild(form)
          }
        
        }
        //DELETED MESSAGES
        if (change.type === "removed") {
          let rmFrom = msgList.querySelector('[sentBy-id=' + change.doc.id + ']')
          let rmMsg = msgList.querySelector('[data-id=' + change.doc.id + ']')
          msgList.removeChild(rmFrom)
          msgList.removeChild(rmMsg)
        }

        });
      });

    },
    //Sends message to the firestore the user is currently using
    sendMsg(){
      document.getElementById('chat-form').reset()
      //Dispatches String name and Ref of current Database
      this.$store.dispatch('sendMsg', {
        message: this.message.content,
        dbStr: this.message.databaseStr,
        dbPln: this.message.databasePln
      })     
    },
    toggleVid(){
      this.$store.dispatch('toggleVid')
    },
  },
  computed:{
    displayVid(){
      return store.state.displayVid
    }
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
    const msgList = document.getElementById('msgList')
    msgList.innerHTML = '';
    msgList.textContent = '';
    while (msgList.lastElementChild) {
      msgList.removeChild(msgList.lastElementChild)
    };
    this.unsubscribe()
    if(store.state.displayVid == true){
      this.toggleVid()
    }
  },

}
</script>

<style scoped lang="scss">
#msgRoot {
  grid-area: msgRoot;
}

#msgList {
  background-color: #23272A;
  padding: 30px;
  overflow-y: scroll;
  grid-area: msgList;
  height: 100%;
  width: 100%;
  resize: horizontal vertical; 
}

#chat-form-container {
  grid-area: chat-form-container;
}

#chat-form-container form {
  display: flex;
  height: 100%;
}

#chat-form-container input[type='text'] {
  font-size: 20px;
  border-radius: 5px;
  background-color: #3a3c3f;
  color: #ffffff;
	padding: 5px;
	flex: 1;
}

.btn {
	padding: 5px 15px;
	background: #ffffff;
	color: #2c3e50;
	border: 0;
	border-radius: 5px;
  font-size: 17px;
  &:hover {
    background: #a4a7c3;
  }
}

@media only screen and (max-width:480px){
  #msgList{
    grid-template-columns: 1fr;
    grid-template-rows: 0.3fr 0.6fr 0.1fr;
    grid-template-areas:   
    "chatNav"
    "msgRoot"
    "chat-form-container";
  }
}
</style>