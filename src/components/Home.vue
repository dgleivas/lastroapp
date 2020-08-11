<template>
<div>
  <MenuHeader />
  <router-view></router-view>
  <Footer />
</div>
</template>

<script>
import Footer from "./Footer"
import MenuHeader from "./MenuHeader"
export default {
  components: {
    Footer,
    MenuHeader
  },
}
</script>

<style>

</style>
