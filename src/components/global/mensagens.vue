<template>
  <div>
    <div :class="`alert-${type}`" class="alert alert-dismissible fade show" v-show="show">
       {{ message }}
      <button
        type="button"
        class="close"
        @onclick="close()"
      >
        <span>&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mensagens",
  data: () => ({
    type: "warning",
    show: false,
    message: ""
  }),
  created() {
    this.$root.$on("Notification::show", payload => {
      this.show = true;
      this.message = payload.mensagem;
      this.type = payload.type;
      setTimeout(() => {
        this.close();
      }, payload.timeout || 2000);
    });
  },
  methods: {
    close() {
      this.mensagem = "";
      this.show = false;

    }
  }
};
</script>

<style scoped>
.alert {
  position: absolute;
  z-index: 1000;
  right: 20px;
  top: 20px;
  max-width: 400px;
}
</style>
