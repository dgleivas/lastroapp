<template>
  <div>
    <div class="modal fade show" style="display: block">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Alterar Ordem</h5>
            <button type="button" @click="closeModal()" class="close">
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="row mb-2">
              <div class="col">
                <div class="form-group">
                  <label>Tipo:</label>
                  <input
                    :value="form.tipo"
                    type="text"
                    class="form-control"
                    id="tipo"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-8 form-group">
                <label>Ativo:</label>
                <input
                  :value="`${form.ativo} - ${form.empresa}`"
                  type="text"
                  class="form-control"
                  id="ativo"
                  disabled
                />
              </div>
              <div class="col-4 form-group"></div>
            </div>

            <div class="row mb-2">
              <div class="form-group col-8">
                <label for>Segmento:</label>
                <input
                  :value="form.segmento"
                  type="text"
                  class="form-control"
                  id="segmento"
                  disabled
                />
              </div>
              <div class="form-group col-4">
                <label for>Data da Operação:</label>
                <input
                  v-model="form.data_compra"
                  type="date"
                  class="form-control"
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
                  id="quantidade"
                  @change="calcSubtotal()"
                  placeholder="Qtde"
                />
              </div>

              <div class="form-group col-3">
                <label for>Preço médio:</label>
                <input
                  min="0"
                  v-model="form.preco"
                  type="number"
                  step="0.01"
                  class="form-control"
                  id="precomedio"
                  @change="calcSubtotal()"
                  placeholder="R$"
                />
              </div>
              <div class="form-group col-3">
                <label for>Subtotal:</label>
                <input
                  min="0"
                  v-model="form.subtotal"
                  type="number"
                  step="0.01"
                  class="form-control"
                  id="subtotal"
                  disabled
                />
              </div>
              <div class="form-group col-3"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              @click="closeModal()"
              class="btn btn-secondary"
            >
              Fechar
            </button>
            <button
              class="btn btn-danger"
              @click="deletar()"
              :disabled="adding"
            >
              <template v-if="adding">
                <i class="fas fa-circle-notch fa-spin"></i>
                Enviando...
              </template>
              <template v-else> <i class="fas fa-minus"></i> Deletar </template>
            </button>
            <button
              class="btn btn-primary"
              @click="alterar()"
              :disabled="adding"
            >
              <template v-if="adding">
                <i class="fas fa-circle-notch fa-spin"></i>
                Enviando...
              </template>
              <template v-else> <i class="fas fa-minus"></i> Alterar </template>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import dataformat from "../../../mixins/dataformat.js";
import datavariable from "../../../mixins/datavariable.js";
export default {
  name: "AlterarOrdem",
  mixins: [dataformat, datavariable],
  data() {
    return {
      ...mapState(["stateIDExtrato"]),
      adding: false,
      showModal: true
    };
  },
  created() {
    this.getAtivoAlterar().then(dados => {
      setTimeout(() => {
        this.form.id = dados.id;
        this.form.tipo = dados.tipo;
        this.form.segmento = dados.segmento;
        this.form.ativo = dados.ativo;
        this.form.empresa = dados.empresa;
        this.form.operacao = dados.operacao;
        this.form.qtde = dados.qtde;
        this.form.subtotal = dados.subtotal;
        this.form.preco = dados.preco;
        this.form.data_compra = dados.data_compra;
      }, 600);
    });
  },
  computed: {},
  methods: {
    calcSubtotal() {
      this.form.subtotal = this.form.preco * this.form.qtde;
    },
    closeModal() {
      this.$router.go(-1);
    },
    alterar() {
      this.adding = true;
      const id_user = "user_" + window.uid;
      const id_carteira = "carteira_" + window.uid;
      const id_aporte = "aporte_" + window.uid;
      this.form.qtde = Number(this.form.qtde);
      this.form.preco = Number(this.form.preco);
      this.form.subtotal = Number(this.form.preco * this.form.qtde);
      const created = new Date(this.form.data_compra + "T00:00:00");
      this.form.data_compra = created;

      const db = this.$firebase.firestore();
      db.collection(id_user)
        .doc(id_carteira)
        .collection(id_aporte)
        .doc(this.$store.state.stateIDExtrato)
        .update(this.form)
        .then(() => {
          this.$root.$emit("Notification::show", {
            type: "success",
            mensagem: "Cadastro atualizado com sucesso!"
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
    deletar() {
      this.adding = true;
      const id_user = "user_" + window.uid;
      const id_carteira = "carteira_" + window.uid;
      const id_aporte = "aporte_" + window.uid;
      const db = this.$firebase.firestore();
      db.collection(id_user)
        .doc(id_carteira)
        .collection(id_aporte)
        .doc(this.$store.state.stateIDExtrato)
        .delete()
        .then(() => {
          this.$root.$emit("Notification::show", {
            type: "success",
            mensagem: "Cadastro atualizado com sucesso!"
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
    async getAtivoAlterar() {
      let temp = "";
      const id_user = "user_" + window.uid;
      const id_carteira = "carteira_" + window.uid;
      const id_aporte = "aporte_" + window.uid;
      const db = this.$firebase
        .firestore()
        .collection(id_user)
        .doc(id_carteira)
        .collection(id_aporte)
        .doc(this.$store.state.stateIDExtrato);

      await db.get().then(querySnapshot => {
        temp = querySnapshot.data();
      });
      temp.data_compra = this.inputconvertData(temp.data_compra.seconds);
      return temp;
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
