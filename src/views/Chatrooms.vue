<template>
  <div class="chatrooms">
    <ChatNav></ChatNav>
    <Messages></Messages>
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
  }
}
</script>

<style scoped lang="scss">
.chatrooms {
  display: grid;
	grid-template-columns: 1fr 3fr;
  overflow: hidden;
}
</style>