<template>
  <div class="mt-4">
    <div class="mx-auto" style="max-width: 50rem;">
      <p class="font-weight-bold">Upload para o Banco de dados:</p>
      <div class="row my-3">
        <div class="input-group col-12 mb-3">
          <label class="mr-3">Data Atualização: &nbsp;</label>
          <input type="date" v-model="data" class="form-control" id="inputCodigo" size="20" />
        </div>
        <div class="mb-3 col-2 text-primary">Cotação</div>
        <div class="mb-3 col-2 text-primary">Cadastro</div>
        <div class="mb-3 col-8 text-primary">Tipo</div>

        <div class="mb-3 col-2 text-primary">
          <button
            class="btn btn-outline-secondary py-0 mx-2"
            type="button"
            @click="cotacao(acoesb3,'cotacoes_acoesbrl','Ações B3')"
          >
            <i class="fas fa-file-upload text-primary"></i>
          </button>
        </div>
        <div class="mb-3 col-2 text-primary">
          <button
            class="btn btn-outline-secondary py-0 mx-2"
            type="button"
            @click="cadastroAtivos(cadacoesb3, 'acoesbrl','Cadastro Ações B3')"
          >
            <i class="fas fa-file-upload text-primary"></i>
          </button>
        </div>
        <div class="mb-3 col-8 text-primary">Ações B3</div>
        <div class="mb-3 col-2 text-success">
          <button
            class="btn btn-outline-secondary py-0 mx-2"
            type="button"
            @click="cotacao(fundos,'cotacoes_fundos','Fundos Imobiliários')"
          >
            <i class="fas fa-file-upload text-success"></i>
          </button>
        </div>
        <div class="mb-3 col-2 text-success">
          <button
            class="btn btn-outline-secondary py-0 mx-2"
            type="button"
            @click="cadastroAtivos(cadfundos,'fundos','Cadastro de Fundos Imobiliários')"
          >
            <i class="fas fa-file-upload text-success"></i>
          </button>
        </div>
        <div class="mb-3 col-8 text-success">Fundos Imobiliarios</div>

        <div class="mb-3 col-2 text-danger">
          <button
            class="btn btn-outline-secondary py-0 mx-2"
            type="button"
            @click="cotacao(reits,'cotacoes_reits','Reits')"
          >
            <i class="fas fa-file-upload text-danger"></i>
          </button>
        </div>
        <div class="mb-3 col-2 text-danger">
          <button
            class="btn btn-outline-secondary py-0 mx-2"
            type="button"
            @click="cadastroAtivos(cadreits, 'reits','Cadastro Reits')"
          >
            <i class="fas fa-file-upload text-danger"></i>
          </button>
        </div>
        <div class="mb-3 col-8 text-danger">Reits</div>

        <div class="mb-3 col-2 text-warning">
          <button
            class="btn btn-outline-secondary py-0 mx-2"
            type="button"
            @click="cotacao(etfs,'cotacoes_etfs','ETFs')"
          >
            <i class="fas fa-file-upload text-warning"></i>
          </button>
        </div>
        <div class="mb-3 col-2 text-warning">
          <button class="btn btn-outline-secondary py-0 mx-2" type="button" @click="cadastroAtivos(cadetfs, 'etfs','Cadastro Etfs')">
            <i class="fas fa-file-upload text-warning"></i>
          </button>
        </div>
        <div class="mb-3 col-8 text-warning">ETFs</div>

        <div class="mb-3 col-2 text-secondary">
          <button
            class="btn btn-outline-secondary py-0 mx-2"
            type="button"
            @click="cotacao(acoeseua,'cotacoes_acoeseua','Ações Americanas')"
          >
            <i class="fas fa-file-upload text-secondary"></i>
          </button>
        </div>
        <div class="mb-3 col-2 text-secondary">
          <button
            class="btn btn-outline-secondary py-0 mx-2"
            type="button"
            @click="cadastroAtivos(cadacoeseua, 'acoeseua','Cadastro Ações Americanas')"
          >
            <i class="fas fa-file-upload text-secondary"></i>
          </button>
        </div>
        <div class="mb-3 col-8 text-secondary">Ações Americanas</div>
        <div class="mb-3 col-2">-</div>
        <div class="mb-3 col-2">
          <button
            class="btn btn-outline-secondary py-0 mx-2"
            type="button"
            @click="cadastroAtivos(cadsegtipo, 'segmentotipo','Cadastro Segmento Tipo')"
          >
            <i class="fas fa-file-upload"></i>
          </button>
        </div>
        <div class="mb-3 col-8">Segmentos Tipo</div>
      </div>
    </div>
  </div>
</template>

<script>
import jsonAcoesBrl from "./respositorio/priceAcoesBrl.json";
import jsonAcoesEua from "./respositorio/priceAcoesEua.json";
import jsonEtfs from "./respositorio/priceEtfs.json";
import jsonFundos from "./respositorio/priceFundos.json";
import jsonReits from "./respositorio/priceReits.json";
import jsonCadAcoesBrl from "./respositorio/cadAcoesBrl.json";
import jsonCadAcoesEua from "./respositorio/cadAcoesEua.json";
import jsonCadEtfs from "./respositorio/cadEtfs.json";
import jsonCadFundos from "./respositorio/cadFundos.json";
import jsonCadReits from "./respositorio/cadReits.json";
import jsonCadSegmentoTipo from "./respositorio/cadSegmentoTipo.json";
export default {
  data() {
    return {
      acoesb3: jsonAcoesBrl,
      acoeseua: jsonAcoesEua,
      etfs: jsonEtfs,
      fundos: jsonFundos,
      reits: jsonReits,
      cadacoesb3: jsonCadAcoesBrl,
      cadacoeseua: jsonCadAcoesEua,
      cadetfs: jsonCadEtfs,
      cadfundos: jsonCadFundos,
      cadreits: jsonCadReits,
      cadsegtipo: jsonCadSegmentoTipo,
      data: ""
    };
  },
  methods: {
    async cotacao(arrayDados, collec, tipo) {
      if (this.data != "") {
        const createdDate = new Date(this.data + "T00:00:00");
        const mes = String(createdDate.getMonth() + 1);
        const ano = String(createdDate.getFullYear());
        const mesano = mes.concat(ano);
        const db = this.$firebase.firestore();
        await db
          .collection(collec)
          .doc(mesano)
          .delete()
          .then(() => {
            db.collection(collec)
              .doc(mesano)
              .set(arrayDados)
              .then(() => {
                this.$root.$emit("Notification::show", {
                  type: "success",
                  mensagem: `BD ${tipo} atualizado com sucesso!`
                });
              });
          })
          .catch(() => {
            this.$root.$emit("Notification::show", {
              type: "danger",
              mensagem: `Erro na tentativa de atualizar o BD ${tipo} . Tente novamente.`
            });
          });
      } else {
        this.$root.$emit("Notification::show", {
          type: "danger",
          mensagem: "Selecione uma data."
        });
      }
    },
    async cadastroAtivos(arrayDados, docName, tipo) {
      const db = this.$firebase.firestore();
      await db
        .collection("cadastroGeral")
        .doc(docName)
        .delete()
        .then(() => {
          db.collection("cadastroGeral")
            .doc(docName)
            .set(arrayDados)
            .then(() => {
              this.$root.$emit("Notification::show", {
                type: "success",
                mensagem: `BD ${tipo} atualizado com sucesso!`
              });
            });
        })
        .catch(() => {
          this.$root.$emit("Notification::show", {
            type: "danger",
            mensagem: `Erro na tentativa de atualizar o BD ${tipo} . Tente novamente.`
          });
        });
    }
  }
};
</script>

<style>
</style>
