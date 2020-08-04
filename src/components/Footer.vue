<template>
  <div class="card-header text-center">{{ ano }} <i class="far fa-copyright"></i> Denis G Leivas</div>
</template>

<script>
export default {
  data() {
    return {
      ano: String
    };
  },
  created() {
    const data = new Date()
    this.ano = data.getFullYear();
  }
};
</script>

<style>
</style>