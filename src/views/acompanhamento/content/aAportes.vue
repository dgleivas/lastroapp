<template>
  <div>
    <form @submit.prevent="adicionar()">
      <div class="modal fade show" style="display: block">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Aporte</h5>
              <button type="button" @click="closeModal()" class="close">
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div class="modal-body">
              <div class="row mb-2">
                <div class="col">
                  <div class="form-group">
                    <label>Tipo:</label>
                    <select class="form-select" @change="onchangeTipo()" v-model="form.tipo">
                      <option v-for="(tipo, idx) in tipos" :value="tipo" :key="idx">{{ tipo }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <template v-if="form.tipo">
                <div class="row mb-2">
                  <div class="col-8 form-group">
                    <label>Ativo:</label>
                    <select class="form-select" v-model="form.ativo" @change="onchangeAtivo()">
                      <option
                        v-for="(ativo, idx) in ativos"
                        :value="ativo.codigo"
                        :key="idx"
                      >{{ ativo.codigo }} - {{ ativo.empresa }}</option>
                    </select>
                  </div>
                  <div class="col-4 form-group">
                    <label for>Operação:</label>
                    <select
                      class="form-select"
                      v-model="form.operacao"
                      id="operacao"
                      name="operacao"
                    >
                      <option value="C">Compra</option>
                      <option value="V">Venda</option>
                    </select>
                  </div>
                </div>

                <div class="row mb-2">
                  <div class="form-group col-8">
                    <label for>Segmento:</label>
                    <select class="form-select" v-model="form.segmento">
                      <option
                        v-for="(segmento, idx) in segmentos"
                        :value="segmento"
                        :key="idx"
                      >{{ segmento }}</option>
                    </select>
                  </div>
                  <div class="form-group col-4">
                    <label for>Data da Compra:</label>
                    <input
                      v-model="form.data_compra"
                      type="date"
                      class="form-control"
                      id="inputCodigo"
                    />
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="form-group col-3">
                    <label for>Quantidade:</label>
                    <input
                      type="number"
                      v-model="form.qtde"
                      min="0"
                      step="1"
                      class="form-control"
                      id="inputCodigo"
                      placeholder="Qtde"
                    />
                  </div>

                  <div class="form-group col-3">
                    <label for>Preço médio de Compra:</label>
                    <input
                      min="0"
                      v-model="form.preco"
                      type="number"
                      step="0.01"
                      class="form-control"
                      id="inputCodigo"
                      placeholder="R$"
                    />
                  </div>
                  <div class="form-group col-6"></div>
                </div>
              </template>
            </div>
            <template v-if="form.tipo">
              <div class="modal-footer">
                <button type="button" @click="closeModal()" class="btn btn-secondary">Fechar</button>
                <button class="btn btn-primary" :disabled="adding">
                  <template v-if="adding">
                    <i class="fas fa-circle-notch fa-spin"></i>
                    Adicionando...
                  </template>
                  <template v-else>
                    <i class="fas fa-plus"></i> Adicionar
                  </template>
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </form>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adding: false,
      segmentos: "",
      tipos: "",
      ativos: "",
      showModal: true,
      form: {
        id: "",
        tipo: "",
        segmento: "",
        ativo: "",
        empresa: "",
        operacao: "",
        qtde: 0,
        subtotal: 0,
        preco: 0,
        data_compra: ""
      }
    };
  },
  created() {
    this.getSegmentoTipo();
  },
  methods: {
    onchangeAtivo(){
      const ativo =  this.ativos.filter((ativo) => {
        return ativo.codigo == this.form.ativo
      })
      this.form.empresa = ativo[0].empresa
    },
    async onchangeTipo() {
      let docs  = "";
      switch (this.form.tipo) {
        case "Fundos Imobiliários":
          docs = "fundos"
          break;
        case "Ações Americanas":
          docs = "acoeseua"
          break;
        case "Reits":
          docs = "reits"
          break;
        case "ETFs":
           docs = "etfs"
          break;
        default:
           docs = "acoesbrl"
      }
        const db = this.$firebase.firestore();
        await db
          .collection("cadastroGeral")
          .doc(docs)
          .get()
          .then(doc => {
            if (doc.exists) {
              this.ativos = doc.data().ativos;
            } else {
              // doc.data() will be undefined in this case
              this.$root.$emit("Notification::show", {
                type: "danger",
                mensagem: "Erro na tentativa de atualizar o cadastro."
              });
            }
          })
          .catch(error => {
            this.msgerror = `Erro na tentativa de atualizar o cadastro. Erro: ${error}`;
          });



    },
    async getSegmentoTipo() {
      this.$root.$emit("Spinner::show");
      if (this.tipos === "" || this.segmentos === "") {
        const db = this.$firebase.firestore();
        await db
          .collection("cadastroGeral")
          .doc("segmentotipo")
          .get()
          .then(doc => {
            if (doc.exists) {
              this.tipos = doc.data().tipos;
              this.segmentos = doc.data().segmentos;
            } else {
              // doc.data() will be undefined in this case
              this.$root.$emit("Notification::show", {
                type: "danger",
                mensagem: "Erro na tentativa de atualizar o cadastro."
              });
            }
          })
          .catch(error => {
            this.msgerror = `Erro na tentativa de atualizar o cadastro. Erro: ${error}`;
          });
      }
      this.$root.$emit("Spinner::hide");
    },
    async adicionar() {
      this.adding = true;
      const db = this.$firebase.firestore();
      const id_user = "user_" + window.uid;
      const id_carteira = "carteira_" + window.uid;
      const id_aporte = "aporte_" + window.uid;
      this.form.qtde = Number(this.form.qtde);
      this.form.preco = Number(this.form.preco);
      this.form.subtotal = Number(this.form.preco * this.form.qtde);
      const created = new Date(this.form.data_compra + "T00:00:00");
      this.form.data_compra = created;

      this.form.id = db
        .collection(id_user)
        .doc(id_carteira)
        .collection(id_aporte)
        .doc().id;
      db.collection(id_user)
        .doc(id_carteira)
        .collection(id_aporte)
        .doc(this.form.id)
        .set(this.form)
        .then(() => {
          this.$root.$emit("Notification::show", {
            type: "success",
            mensagem: "Aporte cadastrado com sucesso!"
          });
          this.closeModal();
        })
        .catch(() => {
          this.$root.$emit("Notification::show", {
            type: "danger",
            mensagem: "Ocorreu um erro, por favor tente novamente."
          });
        });

       this.adding = false;
    },
    closeModal() {
      this.$router.go(-1);
    }
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
