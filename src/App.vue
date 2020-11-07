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

<style scoped lang="scss">
#app {
  text-align: center;
  height: 100vh;
  width: 100vw;
  align-items: center;
  display: grid;
  
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 2.2fr;
  grid-template-areas: 
  "siteNav siteNav siteNav siteNav"
  "chatrooms chatrooms chatrooms chatrooms";
}

@media only screen and (max-width:680px){
  #app{
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 2.2fr;
    grid-template-areas:   
    "siteNav"
    "chatrooms";
  }
}
</style>
