<template>
  <div class="container">
    <template v-if="acoesb3.length">
      <aCarteirasTabela tipo="Ações B3" :cartteira="acoesb3" ></aCarteirasTabela>
    </template>
    <template v-if="fundos.length">
      <aCarteirasTabela tipo="Fundos Imobiliários" :cartteira="fundos"></aCarteirasTabela>
    </template>
    <template v-if="acoeseua.length">
      <aCarteirasTabela tipo="Ações Americanas" :cartteira="acoeseua"></aCarteirasTabela>
    </template>
    <template v-if="reits.length">
      <aCarteirasTabela tipo="Reits" :cartteira="reits"></aCarteirasTabela>
    </template>
    <template v-if="etfs.length">
      <aCarteirasTabela tipo="ETFs" :cartteira="etfs"></aCarteirasTabela>
    </template>
  </div>
</template>

<script>
import aCarteirasTabela from "./acarteiras/aCarteirasTabela";
export default {
  name: "aCarteiras",
  data() {
    return {
      acoesb3: [],
      acoeseua: [],
      etfs: [],
      fundos: [],
      reits: []
    };
  },
  components: {
    aCarteirasTabela
  },
  created() {
    this.getDataDB().then(dados => {
      setTimeout(() => {
        this.preencheArray(dados);
      }, 200);
    });
  },
  methods: {
    preencheArray(dados) {
      if (dados.length) {
        for (let i in dados) {
          if (dados[i].tipo == "Ações B3") {
            this.acoesb3.push(dados[i]);
          } else if (dados[i].tipo == "Fundos Imobiliários") {
            this.fundos.push(dados[i]);
          } else if (dados[i].tipo == "Ações Americanas") {
            this.acoeseua.push(dados[i]);
          } else if (dados[i].tipo == "Reits") {
            this.reits.push(dados[i]);
          } else if (dados[i].tipo == "ETFs") {
            this.etfs.push(dados[i]);
          }
        }
      }
    },

    async getDataDB() {
      const stocks = [];
      const id_user = "user_" + window.uid;
      const id_carteira = "carteira_" + window.uid;
      const id_aporte = "aporte_" + window.uid;

      const db = this.$firebase
        .firestore()
        .collection(id_user)
        .doc(id_carteira)
        .collection(id_aporte)
        .orderBy("ativo", "asc");

      await db.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (!stocks.length) {
            stocks.push(doc.data());
          } else {
            if (stocks[stocks.length - 1].ativo === doc.data().ativo) {
              stocks[stocks.length - 1].qtde += doc.data().qtde;
              stocks[stocks.length - 1].subtotal += doc.data().subtotal;
            } else {
              stocks.push(doc.data());
            }
          }
        });
      });
      return stocks;
    }
  }
};
</script>

<style>
table {
  font-size: 12px;
}
</style>
