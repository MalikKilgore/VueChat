<template>
  <div id="chatrooms">
    <ChatNav></ChatNav>
  </div>
</template>

<script>
import Vue from 'vue'
import ChatNav from '../components/ChatNav'
import ChatMessages from '../components/ChatMessages'

export default {
  name: 'Chatrooms',
  components: {
    ChatNav,
    ChatMessages
  },

}
</script>

<style scoped lang="scss">
#chatrooms {
  text-align: center;
  display: grid;
  height: 91vh;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1.2fr 1.0fr 0.13fr;
  grid-template-areas:
  "chatNav msgList msgList msgList"
  "chatNav msgList msgList msgList"
  "chatNav chat-form-container chat-form-container chat-form-container";
  grid-area: chatrooms;
}

#chatNav {
  grid-area: chatNav;
}

@media only screen and (max-width:680px){
  #chatrooms{
    grid-template-columns: 1fr;
    grid-template-rows: 0.3fr 2.2fr 0.2fr;
    grid-template-areas:   
    "chatNav"
    "msgList"
    "chat-form-container";
  }
}
</style>