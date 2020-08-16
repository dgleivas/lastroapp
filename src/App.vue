<template>
  <div id="app">
    <base-spinner></base-spinner>
    <Mensagens></Mensagens>
    <router-view></router-view>
  </div>
</template>

<script>
import BaseSpinner from "./components/global/BaseSpinner";
import Mensagens from "./components/global/mensagens";

export default {
  components: {
    BaseSpinner,
    Mensagens
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
