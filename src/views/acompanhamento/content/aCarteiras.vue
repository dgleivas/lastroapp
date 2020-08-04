<template>
  <div class="container">
  <aCarteirasAcoes></aCarteirasAcoes>
  <aCarteirasFiis></aCarteirasFiis>

  </div>
</template>

<script>
import aCarteirasAcoes from "./acarteiras/aCarteirasAcoes";
import aCarteirasFiis from "./acarteiras/aCarteirasFiis";
export default {
    name: "aCarteiras",
  components: {
    aCarteirasAcoes,
    aCarteirasFiis
  }
};
</script>

<style>
table {
  font-size: 12px;
}
</style>