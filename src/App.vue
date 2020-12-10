<template>
  <div id="root">
    <SiteNav></SiteNav>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import SiteNav from './components/SiteNav'
import {db, usersCollection, programChat, networkChat, 
creativeChat, generalChat, bugChat, videoRooms} from './firebase/firebase'

export default {
  name: 'App',
  components: {
    SiteNav,
  },
  methods: {
    //Edited to listen for rooms with users callerID
    async callListener() {
      const user = store.state.userProfile;
      //const userDoc = await usersCollection.doc(`${user.uid}`).get()
      const currentCallerID = user.callerID
      console.log(currentCallerID)

      this.unsubscribe = videoRooms.onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
            //ADDED
            if (change.type === "added") {
              //If it matches this user's callerID
              if (change.doc.id == currentCallerID){
                if(confirm(`Someone is calling you!`)){
                  console.log('Call Accepted')
                   store.dispatch('joinRoomByCallerID', {
                     callerID: currentCallerID})
                } else {
                  console.log('Call Denied')
                }
              }
            }
            //MODIFIED 
            if (change.type === "modified") {
              console.log('modified room')
            }
            //DELETED
            if (change.type === "removed") {
              console.log('removed room')
            }
          });
        });
    },

  },
  mounted(){
    this.callListener()
  },
}
</script>

<style scoped lang="scss">
#app {
  margin: 0;
  padding: 0;
  text-align: center;
  height: 100vh;
  width: 100vw;
  align-items: center;
  overflow: hidden;
}
</style>
