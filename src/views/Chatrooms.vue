<template>
  <div class="chatrooms">
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
.chatrooms {
  display: grid;
  align-items: center;
  //grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1;
}
</style>