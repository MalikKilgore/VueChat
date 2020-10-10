<template>
    <div id="siteNav">
        <router-link to="/">Home</router-link> |
        <router-link to="/chatrooms">Chatrooms</router-link>
        <button class="btn" v-on:click="logout">Logout</button>
    </div>
  <router-view/>
</template>

<script>

export default {
    methods: {
        //Log user out of application
        logout() {
            this.$store.dispatch('logout')
        }
    }
}
</script>

<style scoped lang="scss">
#siteNav {
  padding: 30px;
  background-color: #7289DA;
  border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #e8edff;
    }
  }
}

.btn {
	padding: 5px 15px;
	background: #ffffff;
	color: #2c3e50;
	border: 0;
	border-radius: 5px;
	font-size: 17px;
  float: right;
}
</style>