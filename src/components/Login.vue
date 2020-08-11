<template>
  <form @submit.prevent="doLogin()" class="form-login">
    <div class="formulario">
      <div class="text-center font-weight-bold text-light">
        <h3>Login</h3>
      </div>
      <div class="card-body">
        <div class="form-group">
          <input
            required
            class="form-control mb-2 mt-2"
            type="email"
            v-model="email"
            placeholder="email@email.com"
          />
        </div>
        <div class="form-group">
          <input
            required
            class="form-control mb-2"
            type="password"
            v-model="password"
            placeholder="password"
          />
        </div>
      </div>

      <div class="mx-3">
        <button class="btn btn-primary btn-lg btn-block" :disabled="loading">
          <template v-if="loading">
            <i class="fas fa-circle-notch fa-spin"></i>
            Entrando...
          </template>
          <template v-else>
            <i class="fas fa-lock"></i>
            Entrar
          </template>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data: () => {
    return {
      loading: false,
      email: "",
      password: ""
    };
  },
  methods: {
    async doLogin() {
      this.loading = true
      const { email, password } = this;
      await this.$firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          window.uid = res.user.uid;
          this.$router.push({ name: "Home" });
        })
        .catch(err => {
          console.log(err);
        });
        this.loading = false
    }
  },
  beforeRouteEnter(to, from, next){
    next(vm =>{
      if(window.uid){
        vm.$router.push({name: "Home"})
      }
    })
  }
};
</script>

<style scoped>
.form-login {
  height: 100vh;
  background-color: darkblue;
  position: relative;
}
.formulario {
  position: absolute;
  width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
