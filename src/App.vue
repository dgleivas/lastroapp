<template>
  <div id="app">
    <base-spinner></base-spinner>
    <router-view></router-view>
  </div>
</template>

<script>
import BaseSpinner from "./components/BaseSpinner";
export default {
  components: {
    BaseSpinner
  },
  mounted() {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null
      this.$router.push({name: window.uid ? "Home" : "Login"})
      this.$root.$emit("Spinner::hide")
      console.log(window.uid)
    });
  }
};
</script>

<style scoped>
#app {
  height: 80vh;
}
</style>
