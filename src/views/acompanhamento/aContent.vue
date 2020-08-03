<template>
  <div>
    <keep-alive>
      <component :is="componente"></component>
    </keep-alive>
  </div>
</template>

<script>
import adashboard from "./aDashboard";
import acarteiras from "./aCarteiras";
import aextrato from "./aExtrato";
import aproventos from "./aProventos";
import arentabilidade from "./aRentabilidade";
import aaportes from "./aProventos";
import aresgates from "./aResgates";
import aconta from "./aConta";
import aajuda from "./aAjuda";
import asair from "./aSair";

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