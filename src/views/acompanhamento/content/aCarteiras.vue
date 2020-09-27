<template>
  <div class="container">
    <ul class="nav nav-tabs mt-4" id="myTab" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="cartteiraTipo == 'Ações B3' ? 'active' : ''"
          href="#"
          @click="cartteiraChange('acoesb3')"
          >Ações B3</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="cartteiraTipo == 'Fundos Imobiliários' ? 'active' : ''"
          href="#"
          @click="cartteiraChange('fundos')"
          >Fundo Imobiliário</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="cartteiraTipo == 'Ações Americanas' ? 'active' : ''"
          href="#"
          @click="cartteiraChange('acoeseua')"
          >Ações Americanas</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="cartteiraTipo == 'Reits' ? 'active' : ''"
          href="#"
          @click="cartteiraChange('reits')"
          >Reits</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="cartteiraTipo == 'ETFs' ? 'active' : ''"
          href="#"
          @click="cartteiraChange('etfs')"
          >ETFs</a
        >
      </li>
    </ul>

    <template v-if="cartteiraArray.length > 0">
      <aCarteirasTabela
        :tipo="cartteiraTipo"
        :cartteira="cartteiraArray"
      ></aCarteirasTabela>
    </template>
    <template v-else>
      <p class="font-weight-bold mt-4">Carteira vazia!</p>
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
      reits: [],
      cartteiraArray: [],
      cartteiraTipo: ""
    };
  },
  components: {
    aCarteirasTabela
  },
  created() {
    this.getDataDB().then(dados => {
      setTimeout(() => {
        this.preencheArray(dados);
        if (!this.cartteiraArray.length) {
          if (this.acoesb3.length) {
            this.cartteiraTipo = "Ações B3";
            this.cartteiraArray = this.acoesb3;
          } else if (this.fundos.length) {
            this.cartteiraTipo = "Fundos Imobiliários";
            this.cartteiraArray = this.fundos;
          } else if (this.acoeseua.length) {
            this.cartteiraTipo = "Ações Americanas";
            this.cartteiraArray = this.acoeseua;
          } else if (this.reits.length) {
            this.cartteiraTipo = "Reits";
            this.cartteiraArray = this.reits;
          } else if (this.etfs.length) {
            this.cartteiraTipo = "ETFs";
            this.cartteiraArray = this.etfs;
          }
        }
      }, 200);
    });
  },
  methods: {
    cartteiraChange(tipo) {
      if (tipo == "acoesb3") {
        this.cartteiraTipo = "Ações B3";
        this.cartteiraArray = this.acoesb3;
      } else if (tipo == "fundos") {
        this.cartteiraTipo = "Fundos Imobiliários";
        this.cartteiraArray = this.fundos;
      } else if (tipo == "acoeseua") {
        this.cartteiraTipo = "Ações Americanas";
        this.cartteiraArray = this.acoeseua;
      } else if (tipo == "reits") {
        this.cartteiraTipo = "Reits";
        this.cartteiraArray = this.reits;
      } else if (tipo == "etfs") {
        this.cartteiraTipo = "ETFs";
        this.cartteiraArray = this.etfs;
      }
    },
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
