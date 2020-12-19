<template>
  <div id="home">
    <div>

    </div>
    <div id="homeTxt">
      <h1>Getting Started with VueChat</h1>
      <button v-on:click="guestLogin">Login as Guest</button>
      <p>VueChat is a video/text messaging web app that runs in the browser. It features direct messaging, direct video calls, public chatrooms, and public group calls.
        It was built primarily using Vue.js, VueX, Vue Router, WebRTC, JavaScript, HTML, SCSS, and Firebase.
      </p>
      <img src="../assets/images/VueChatFull.gif"/>
      <br> 
      <router-link to="/join">Login/Create Account</router-link> 
      <br>
      <h1>How To Use</h1>
      <ul id="howToUse">
        <li>After login, you can navigate to "Chatrooms" or "Direct", click on any chatroom or username
           you want, and start sending, editing, or deleting your messages.</li>
          <br>
        <li>To start a call with someone directly, you can click the video chat button in their private
           messaging window. Then click "Start Call" and you're on your way. The user receiving the call will receive a prompt to Accept or Deny the call.</li>
           <br>
        <li>You can Send, edit, and delete all of your own messages. To edit or delete a message, it's as simple as hitting the respective button
          Edited and deleted messages will automatically update for everyone.
        </li>
        <br>
        <img src="../assets/images/VueChatMsg2.gif"/>
      </ul>
    </div>
    <div>

    </div>

  </div>
  <router-view :key="$route.fullPath"/>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Home',
  methods: {
    login() {
      //Sends information to VueX store.
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    },
    guestLogin(){
      //Sends information to VueX store.
      this.$store.dispatch('login', {
        email: 'me@home.com',
        password: 'Password1234'
      })
    },
  }
}
</script>

<style scoped lang="scss">
#home {
  text-align: center;
  display: grid;
  height: 91vh;
  grid-area: home;
  grid-template-columns: 0.5fr 2fr 0.5fr;
  grid-template-rows: 1fr;
  grid-template-areas:
  "filler homeTxt filler";
  
    a {
    font-weight: bold;
    font-size: 40px;
    background-color: #18243a;
    color: #ffffff;
    text-decoration: none;
    vertical-align: middle;
    padding: 7px;
    border-radius: 5px;

    &.router-link-exact-active {
      color: #e8edff;
    }
    &:hover {
      color: #c9ccf0;
    }
  }
  button {
    font-weight: bold;
    font-size: 40px;
    background-color: #18243a;
    color: #ffffff;
    text-decoration: none;
    vertical-align: middle;
    padding: 7px;
    border-radius: 5px;
    &:hover {
      color: #c9ccf0;
    }
  }
}

#homeTxt {
  background-color: #33436a;
  //grid-area: homeTxt;

  h1 {
    color: #ffffff;
    background-color: #0f1a2a;;
  }
  
  p {
    font-size: 20px;
    color: #ffffff;
  }
  a img{
    background-color: none;
    width: auto;
    height: auto;
    max-width: 800px;
    max-height: 800px;
    text-decoration: none;
  }
  #howToUse{
    list-style: none;

    li {
      font-size: 20px;
      color: #ffffff;
      text-decoration: none;
    }
  }

}

#filler {
  background-color: #23272A;
  //grid-area: filler;
}

@media only screen and (max-width:680px){
  #home{
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:   
    "homeTxt"
  }
  #filler {
    display: none;
  }
}
</style>
