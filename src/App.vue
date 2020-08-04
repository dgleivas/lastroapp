<template>
  <div id="app height: 100%">
      <MenuHeader></MenuHeader>
      <router-view></router-view>
      <Footer></Footer>
  </div>
</template>

<script>
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer.vue";
export default {
  components: {
    MenuHeader,
    Footer
  }
};
</script>

<style scoped>

</style>