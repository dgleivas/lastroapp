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
        <button class="btn btn-primary btn-lg btn-block">
          <i class="fas fa-lock"></i> Entrar
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data: () => {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async doLogin() {
      const { email, password }  = this
       await this.$firebase.auth().signInWithEmailAndPassword(email,password).then((res)=>{
         console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
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
