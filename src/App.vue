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
}
</script>

<style lang="scss">
#app {
  font-family: Helvetica, 'Roboto Slab', Arial, sans-serif; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  align-items: center;
  display: grid;
  /*align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 2.2fr;
  grid-template-areas: 
  "siteNav siteNav siteNav siteNav"
  "chatrooms chatrooms chatrooms chatrooms";*/
}

</style>
