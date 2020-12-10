<template>
  <div id="direct">
    <DirectNav></DirectNav>
  </div>
</template>

<script>
import Vue from 'vue'
import DirectNav from '../components/DirectNav'
import DirectMessages from '../components/DirectMessages'

export default {
  name: 'Direct',
  components: {
    DirectNav,
    DirectMessages
  },

}
</script>
<style scoped lang="scss">
#direct {
  text-align: center;
  display: grid;
  height: 91vh;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1.2fr 1.0fr 0.13fr;
  grid-template-areas:
  "directNav dmList dmList dmList"
  "directNav dmList dmList dmList"
  "directNav chat-form-container chat-form-container chat-form-container";
  grid-area: direct;
}

@media only screen and (max-width:680px){
  #direct{
    grid-template-columns: 1fr;
    grid-template-rows: 0.3fr 2.2fr 0.2fr;
    grid-template-areas:   
    "directNav"
    "dmList"
    "chat-form-container";
  }
}
</style>