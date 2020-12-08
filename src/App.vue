<template>
  <div id="root">
    <SiteNav></SiteNav>
  </div>
</template>

<script>
import Vue from 'vue'
import SiteNav from './components/SiteNav'

export default {
  name: 'App',
  components: {
    SiteNav,
  },
  //CODE FOR LISTENING FOR CALL GOES HERE
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
