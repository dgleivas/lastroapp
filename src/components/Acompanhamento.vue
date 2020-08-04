<template>
  <div class="conteudo">
    <div class="row">
      <div class="col-auto bg-light border">
        <aSidebar></aSidebar>
      </div>
      <div class="col-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import aSidebar from "../views/acompanhamento/aSidebar";

export default {
  name: "Acompanhamento",
  components: {
    aSidebar
  },
  watch: {
    $route(newValue, oldValue) {
      if (newValue.params.subrota === undefined) {
        this.$router.push({
          name: "ConteudoAcompanhamento",
          params: { subrota: oldValue.params.subrota }
        })
      }
    }
  },
  created() {
    this.$router.push({
      name: "ConteudoAcompanhamento",
      params: { subrota: "adashboard" }
    });
  }
};
</script>

<style scoped>
</style>