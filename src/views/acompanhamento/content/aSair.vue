<template>
  <button class="btn btn-logout p-0" @click="logout()">
    <i class="fas fa-sign-out-alt"></i> Sair
  </button>
</template>

<script>
export default {
  methods: {
    async logout() {
      this.$root.$emit("Spinner::show");
      await this.$firebase.auth().signOut()
      this.$router.push({ name: "Login" });
      this.$root.$emit("Spinner::hide");
    }
  }
};
</script>

<style scoped>
.btn-logout {
  cursor: pointer;
  width: 100%;
  text-align: left;
}
.btn-logout:hover {
  background-color: white;
  font-weight: bold;
}
</style>
