<template>
  <div id="chatrooms">
    <ChatNav></ChatNav>
  </div>
</template>

<script>
import Vue from 'vue'
import ChatNav from '../components/ChatNav'
import Messages from '../components/Messages'

export default {
  name: 'Chatrooms',
  components: {
    ChatNav,
    Messages
  },

}
</script>

<style scoped lang="scss">
#chatrooms {
  text-align: center;
  display: grid;
  height: 100vh;
  //align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1.2fr 1.0fr 0.2fr;
  grid-template-areas:
  "chatNav msgList msgList msgList"
  "chatNav msgList msgList msgList"
  "chatNav chat-form-container chat-form-container chat-form-container";
  grid-area: div;
}
#chatNav {
  grid-area: chatNav;
}
</style>