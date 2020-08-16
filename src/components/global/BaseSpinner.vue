<template>
  <div class="base-spinner fa-4x" v-if="visible">
      <i class="fas fa-spinner fa-spin"></i>
  </div>
</template>

<script>
export default {
  data(){
    return{
      visible: true
    }
  },
  created(){
    this.$root.$on('Spinner::show',() => {this.visible=true})
    this.$root.$on('Spinner::hide',() => {this.visible=false})
  }
}
</script>

<style scoped>
.base-spinner{
  height: 100vh;
  z-index: 1000000; /* sobre poe todos os itens da tela*/
  color:darkblue;
  top: 50%;
  left: 50%;
  transform: translate(50%,50%);
}

</style>
