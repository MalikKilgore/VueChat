<template>
  <div id="home">
    <div>

    </div>
    <div id="homeTxt">
      <h1>Welcome to VueChat</h1>
      <p>VueChat is a chat application that runs entirely in your browser. It lets you send,edit, and delete messages in separate chatrooms. 
        It was built primarily using Vue.js, Firebase, and SCSS. For more information on the technical aspects and challenges, there is a video below.
      </p>
      <h1>Getting Started</h1>
      <ul>
        <li>To use this application, you can register an account using any e-mail/username combination you want. Or you can use the provided Demo credentials below.<br>
        <i>email: "me@home.com" | password: "Password1234"</i></li>
          <br>
        <li><b>You do not need to use a real e-mail on account creation.</b> For now, VueChat does not verify e-mail accounts entered, 
      since this is just to display a working demo of the project.</li>
          <br>
        <li>After login, you can navigate to Chatrooms, join any chatroom you want, and start sending, editing, or deleting your messages.</li>
          <br>
      </ul>
      <router-link to="/join">Login/Register</router-link> <br> <br>
      <embed src="https://www.youtube.com/embed/M-R5B_HT-lQ" width="840" height="473" title="VueChat Demonstration">
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
  li {
    font-size: 20px;
    color: #ffffff;
    text-decoration: none;
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
