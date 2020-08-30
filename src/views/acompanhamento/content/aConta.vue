<template>
  <div class="mt-4">
    <form @submit.prevent="atualizar()">
      <div class="mx-auto" style="max-width: 50rem;">
        <p class="font-weight-bold">Cadastro</p>
        <div class="row mb-3">
          <div class="form-group col-4">
            <label>Nome:</label>
            <input type="text" v-model="form.nome" class="form-control" />
          </div>
          <div class="form-group col-4">
            <label>Sobrenome:</label>
            <input type="text" v-model="form.sobrenome" class="form-control" />
          </div>
          <div class="form-group col-4">
            <label>Data de Nasc.:</label>
            <input
              type="text"
              v-model="form.data_nasc"
              class="form-control"
              placeholder="dd/mm/aaaa"
            />
          </div>
        </div>
        <div class="row mb-3">
          <div class="form-group col-6">
            <label>Endereço:</label>
            <input
              type="text"
              v-model="form.endereco"
              class="form-control"
              placeholder="Rua, Av..."
            />
          </div>
          <div class="form-group col-2">
            <label>Nro:</label>
            <input type="text" v-model="form.nro" class="form-control" />
          </div>
          <div class="form-group col-4">
            <label>Complemento:</label>
            <input type="text" v-model="form.complemento" class="form-control" />
          </div>
        </div>
        <div class="row mb-3">
          <div class="form-group col-5">
            <label>Email:</label>
            <input type="text" v-model="form.email" class="form-control" />
          </div>
          <div class="form-group col-2">
            <label>Bairro:</label>
            <input type="text" v-model="form.bairro" class="form-control" />
          </div>
          <div class="form-group col-3">
            <label>Cidade:</label>
            <input type="text" v-model="form.cidade" class="form-control" />
          </div>
          <div class="form-group col-2">
            <label>Estado:</label>
            <select class="form-select" v-model="form.estado" id="estado" name="estado">
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP" selected>SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
          </div>
          <div class="row mt-3 p-0">
            <div class="form-group col m-0 text-right p-0">
              <button class="btn btn-primary" :disabled="updating">
                <template v-if="updating">
                  <i class="fas fa-circle-notch fa-spin"></i>
                  Atualizar...
                </template>
                <template v-else>
                  <i class="fas fa-user-edit"></i> Atualizar
                </template>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updating: false,
      form: {
        nome: "",
        sobrenome: "",
        data_nasc: "",
        endereco: "",
        nro: "",
        complemento: "",
        email: "",
        bairro: "",
        cidade: "",
        estado: "SP",
        createdAt: "",
        updatedAt: ""
      }
    };
  },
  methods: {
    async atualizar() {
      this.updating = true;

      var today = new Date();
      var date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + " " + time;
      if (
        typeof this.form.createdAt === "undefined" ||
        this.form.createdAt === "" ||
        this.form.createdAt === null
      ) {
        this.form.createdAt = dateTime;
      } else {
        this.form.updatedAt = dateTime;
      }
      const db = this.$firebase.firestore();
      const id_user = "user_" + window.uid;
      const id_cadastro = "cadastro_" + window.uid;

      await db
        .collection(id_user)
        .doc(id_cadastro)
        .set(this.form)
        .then(() => {
          this.$root.$emit("Notification::show", {
            type: "success",
            mensagem: "Cadastro atualizado com sucesso!"
          });
        })
        .catch(() => {
          this.$root.$emit("Notification::show", {
            type: "danger",
            mensagem:
              "Erro na tentativa de atualizar o cadastro. Tente novamente."
          });
        });
      this.updating = false;
    },
    async getCadastro() {
      this.$root.$emit("Spinner::show");
      const db = this.$firebase.firestore();
      const id_user = "user_" + window.uid;
      const id_cadastro = "cadastro_" + window.uid;
      await db
        .collection(id_user)
        .doc(id_cadastro)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.form = doc.data();
          } else {
            // doc.data() will be undefined in this case
            this.$root.$emit("Notification::show", {
              type: "danger",
              mensagem: "Por favor, atualize seu cadastro!"
            });
          }
        })
        .catch(error => {
          this.msgerror = `Erro na tentativa de atualizar o cadastro. Erro: ${error}`;
        });
      this.$root.$emit("Spinner::hide");
    }
  },
  created() {
    this.getCadastro();
  }
};
</script>

<style scoped>
label,
input,
select {
  font-size: 14px;
}
</style>
