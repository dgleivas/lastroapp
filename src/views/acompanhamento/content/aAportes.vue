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
                    <label>Tipos:</label>
                    <select class="form-select" v-model="form.tipo">
                      <option v-for="(tipo, idx) in tipos" :value="tipo" :key="idx">{{ tipo }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <template v-if="form.tipo">
                <div class="row mb-2">
                  <div class="col-8 form-group">
                    <label>Ativo:</label>
                    <template v-if="form.tipo =='Ações B3'">
                      <select class="form-select" v-model="form.ativo">
                        <option
                          v-for="(ativo, idx) in acoesbrl"
                          :value="ativo.codigo"
                          :key="idx"
                        >{{ ativo.codigo }} - {{ ativo.empresa }}</option>
                      </select>
                    </template>
                    <template v-else-if="form.tipo =='Ações Americanas'">
                      <select class="form-select" v-model="form.ativo">
                        <option
                          v-for="(ativo, idx) in acoesusa"
                          :value="ativo.codigo"
                          :key="idx"
                        >{{ ativo.codigo }} - {{ ativo.empresa }}</option>
                      </select>
                    </template>
                    <template v-else-if="form.tipo =='Fundos Imobiliários'">
                      <select class="form-select" v-model="form.ativo">
                        <option
                          v-for="(ativo, idx) in fundos"
                          :value="ativo.codigo"
                          :key="idx"
                        >{{ ativo.codigo }} - {{ ativo.empresa }}</option>
                      </select>
                    </template>
                    <template v-else-if="form.tipo =='Reits'">
                      <select class="form-select" v-model="form.ativo">
                        <option
                          v-for="(ativo, idx) in reits"
                          :value="ativo.codigo"
                          :key="idx"
                        >{{ ativo.codigo }} - {{ ativo.empresa }}</option>
                      </select>
                    </template>
                    <template v-else-if="form.tipo =='ETFs'">
                      <select class="form-select" v-model="form.ativo">
                        <option
                          v-for="(ativo, idx) in etfs"
                          :value="ativo.codigo"
                          :key="idx"
                        >{{ ativo.codigo }} - {{ ativo.empresa }}</option>
                      </select>
                    </template>
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
// import  json  from "./respositorio/acoes_brl.json";
//import  json  from "./respositorio/acoes_usa.json";
// import  json  from "./respositorio/etfs.json";
// import  json  from "./respositorio/fundos_imobiliarios.json";
// import  json  from "./respositorio/reits.json";
//import  json  from "./respositorio/segmentos.json";
import json from "./respositorio/TudoData.json";

export default {
  data() {
    return {
      adding: false,
      jsonData: json,
      segmentos: "",
      tipos: "",
      acoesbrl: "",
      acoesusa: "",
      fundos: "",
      etfs: "",
      reits: "",
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
    const {
      segmentos,
      tipos,
      acoesbrl,
      acoesusa,
      fundos,
      etfs,
      reits
    } = this.jsonData;
    this.segmentos = segmentos;
    this.tipos = tipos;
    this.acoesbrl = acoesbrl;
    this.acoesusa = acoesusa;
    this.fundos = fundos;
    this.etfs = etfs;
    this.reits = reits;
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
      // const obj = data.find(data => data.ativo === this.form.ativo);
      // if (typeof obj !== "undefined") {
      //   this.form.empresa = obj.empresa;
      //   this.form.tipo = obj.tipo;
      // }
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
