<template>
  <div class="home">
    <HomeNav></HomeNav>
    <Messages></Messages>
  </div>
</template>

<script>
import Vue from 'vue'
import HomeNav from '../components/HomeNav'
import Messages from '../components/Messages'



export default {
  name: 'Home',
  components: {
    HomeNav,
    Messages
  }
}
</script>

<style lang="scss">
.home {
  display: grid;
	grid-template-columns: 1fr 3fr;
  overflow: hidden;
}
</style>
