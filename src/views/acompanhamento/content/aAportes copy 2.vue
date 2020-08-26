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
                <div class="col-2">
                  <div class="form-group">
                    <label>Ativo:</label>
                    <select class="form-select" v-model="form.ativo" :onchange="preencheForm()">
                      <option
                        v-for="ativo in Ativos"
                        :value="ativo.ativo"
                        :key="ativo.ativo"
                      >{{ ativo.ativo }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-10">
                  <div class="form-group">
                    <label>Empresa:</label>
                    <input
                      disabled
                      type="text"
                      v-model="form.empresa"
                      class="form-control"
                      placeholder="Nome da Empresa"
                    />
                  </div>
                </div>
              </div>

              <div class="row mb-2">
                <div class="form-group col-3">
                  <label for>Operação:</label>
                  <select class="form-select" v-model="form.operacao" id="operacao" name="operacao">
                    <option value="C">Compra</option>
                    <option value="V">Venda</option>
                  </select>
                </div>
                <div class="form-group col-3">
                  <label for>Tipo:</label>
                  <input
                    disabled
                    type="text"
                    v-model="form.tipo"
                    class="form-control"
                    placeholder="Ações ou Fundos"
                  />
                </div>

                <div class="form-group col-6">
                  <label for>Segmento:</label>
                  <input
                    type="text"
                    v-model="form.segmento"
                    class="form-control"
                    id="inputCodigo"
                    placeholder="Financeiros, Lajes..."
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
                  <label for>Preço de Compra:</label>
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
                <div class="form-group col-6">
                  <label for>Data da Compra:</label>
                  <input
                    v-model="form.data_compra"
                    type="date"
                    class="form-control"
                    id="inputCodigo"
                  />
                </div>
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </form>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import { data } from "./respositorio/data_ativos";
// import  json  from "./respositorio/acoes_brl.json";
 //import  json  from "./respositorio/acoes_usa.json";
// import  json  from "./respositorio/etfs.json";
// import  json  from "./respositorio/fundos_imobiliarios.json";
// import  json  from "./respositorio/reits.json";
//import  json  from "./respositorio/segmentos.json";
import  json  from "./respositorio/TudoData.json";

export default {
  data() {
    return {
      adding: false,
      Ativos: data,
      //jsonData: json,
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
  methods: {
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

      // await db
      //   .collection("geralCadatro")
      //   .doc()
      //   .set(this.jsonData)
      //   .then(() => {
      //     this.$root.$emit("Notification::show", {
      //       type: "success",
      //       mensagem: "Cadastro atualizado com sucesso!"
      //     });
      //   })
      //   .catch(() => {
      //     this.$root.$emit("Notification::show", {
      //       type: "danger",
      //       mensagem:
      //         "Erro na tentativa de atualizar o cadastro. Tente novamente."
      //     });
      //   });





      this.adding = false;
    },
    preencheForm() {
      const obj = data.find(data => data.ativo === this.form.ativo);
      if (typeof obj !== "undefined") {
        this.form.empresa = obj.empresa;
        this.form.tipo = obj.tipo;
      }
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
