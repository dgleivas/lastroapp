<template>
  <div id="app">
    <div id="FirstCard">
      <MenuHeader></MenuHeader>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MenuHeader from "./views/MenuHeader.vue";
export default {
  components: {
    MenuHeader
  }
};
</script>

<style scoped>

</style>