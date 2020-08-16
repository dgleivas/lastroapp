<template>
  <div>
    <!-- <keep-alive> -->
      <component :is="componente"></component>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import adashboard from "./content/aDashboard"
import acarteiras from "./content/aCarteiras"
import aextrato from "./content/aExtrato"
import aproventos from "./content/aProventos"
import arentabilidade from "./content/aRentabilidade"
import aaportes from "./content/aAportes"
import aresgates from "./content/aResgates"
import aconta from "./content/aConta"
import aajuda from "./content/aAjuda"
import asair from "./content/aSair"

export default {
  data() {
    return {
      componente: String
    };
  },
  components: {
    adashboard,
    acarteiras,
    aextrato,
    aproventos,
    arentabilidade,
    aaportes,
    aresgates,
    aconta,
    aajuda,
    asair
  },
  watch: {
    $route(newValue) {
      this.componente = newValue.params.subrota;
    }
  },
  created() {
    this.componente = this.$route.params.subrota;
  }
};
</script>

<style>
</style>
