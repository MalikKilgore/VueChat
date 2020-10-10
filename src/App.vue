<template>
  <div id="root">
    <SiteNav></SiteNav>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import SiteNav from './components/SiteNav'

export default {
  name: 'App',
  components: {
    SiteNav
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
