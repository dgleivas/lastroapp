<template>
  <div>
    <p>
      <i class="fas fa-angle-double-right"></i>Dashboard
      <i class="fas fa-angle-double-left"></i>
      <br />
      {{ uid }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uid: ""
    };
  },
  created() {
    this.uid = window.uid;
  }
};
</script>

<style>
</style>
