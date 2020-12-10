<template>
  <div id="chatrooms">
    <ChatNav></ChatNav>
    
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import store from '../store'
import ChatNav from '../components/ChatNav'
import ChatMessages from '../components/ChatMessages'

export default {
  name: 'Chatrooms',
  components: {
    ChatNav,
    ChatMessages,
  },
  methods: {
    toggleVid(){
      this.$store.dispatch('toggleVid')
    },
  },
}
</script>

<style scoped lang="scss">
#chatrooms {
  text-align: center;
  display: grid;
  height: 92vh;
  grid-template-columns: auto 1fr 1fr 1fr;
  grid-template-rows: 1.2fr 1.0fr 0.13fr;
  grid-template-areas:
  "chatNav msgRoot msgRoot msgRoot"
  "chatNav msgRoot msgRoot msgRoot"
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