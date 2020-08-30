<template>
  <div>
    <form @submit.prevent="adicionar()">
      <div class="modal fade show" style="display: block">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Resgate</h5>
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
                      v-model="ativo[0].tipo"
                      type="text"
                      class="form-control"
                      id="inputCodigo"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-8 form-group">
                  <label>Ativo:</label>
                  <input
                    v-model="ativo[0].ativo"
                    type="text"
                    class="form-control"
                    id="inputCodigo"
                    disabled
                  />
                </div>
                <div class="col-4 form-group">
                  <label for>Operação:</label>
                  <input
                    value="Venda"
                    type="text"
                    class="form-control"
                    id="inputCodigo"
                    disabled
                  />
                </div>
              </div>

              <div class="row mb-2">
                <div class="form-group col-8">
                  <label for>Segmento:</label>
                  <input
                    v-model="ativo[0].segmento"
                    type="text"
                    class="form-control"
                    id="inputCodigo"
                    disabled
                  />
                </div>
                <div class="form-group col-4">
                  <label for>Data do Resgate:</label>
                  <input
                    v-model="ativo[0].data_compra"
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
                    v-model="ativo[0].qtde"
                    min="0"
                    step="1"
                    class="form-control"
                    id="inputCodigo"
                    placeholder="Qtde"
                  />
                </div>

                <div class="form-group col-3">
                  <label for>Preço médio de Venda:</label>
                  <input
                    min="0"
                    v-model="ativo[0].preco"
                    type="number"
                    step="0.01"
                    class="form-control"
                    id="inputCodigo"
                    placeholder="R$"
                  />
                </div>
                <div class="form-group col-6"></div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="closeModal()" class="btn btn-secondary">Fechar</button>
              <button class="btn btn-danger" :disabled="adding">
                <template v-if="adding">
                  <i class="fas fa-circle-notch fa-spin"></i>
                  Enviando...
                </template>
                <template v-else>
                  <i class="fas fa-minus"></i> Resgatar
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      ...mapState(["stateAtivo"]),
      adding: false,
      showModal: true,
      ativo: []
    };
  },
  created() {
    this.getAtivoResgate();
  },
  methods: {
    closeModal() {
      this.$router.go(-1);
    },
    async getAtivoResgate() {
      const id_user = "user_" + window.uid;
      const id_carteira = "carteira_" + window.uid;
      const id_aporte = "aporte_" + window.uid;
      const db = this.$firebase
        .firestore()
        .collection(id_user)
        .doc(id_carteira)
        .collection(id_aporte)
        .where("ativo", "==", this.$store.state.stateAtivo);

      await db.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (!this.ativo.length) {
            this.ativo.push(doc.data());
          } else {
            if (this.ativo[this.ativo.length - 1].ativo === doc.data().ativo) {
              this.ativo[this.ativo.length - 1].qtde += doc.data().qtde;
              this.ativo[this.ativo.length - 1].subtotal += doc.data().subtotal;
            } else {
              this.ativo.push(doc.data());
            }
          }
        });
        this.ativo.operacao = "V";
      });
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
