<template>
  <div class="mt-4">
    <p class="font-weight-bold">Ações</p>
    <table class="table table-striped table-hover">
      <thead>
        <tr class="table-dark text-center">
          <th class="col text-left">Codigo</th>
          <th class="col text-left">Nome</th>
          <th class="col">Qtde.</th>
          <th class="col">Posição Inicial</th>
          <th class="col">Posição Atual</th>
          <th class="col border-right">Resultado (R$)</th>
          <th class="col">Preço Médio</th>
          <th class="col">Cotação Atual</th>
          <th class="col border-right">Resultado (%)</th>
          <th class="col border-right">Resultado ultimo dia</th>
          <th class="col">Resgate</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="acao in acoes" :key="acao.id">
          <td class="text-left">{{acao.ativo}}</td>
          <td class="text-left">{{acao.empresa}}</td>
          <td>{{acao.qtde.toFixed(0)}}</td>
          <td>R$ {{acao.subtotal.toFixed(2)}}</td>
          <td>-</td>
          <td class="border-right">-</td>
          <td>{{ formatNumber(acao.qtde,acao.subtotal) }}</td>
          <td>-</td>
          <td class="border-right">-</td>
          <td class="border-right">-</td>
          <td>
            <a @click="resgate(acao.ativo)">
              <i class="fas fa-hand-holding-usd text-danger fa-2x"></i>
            </a>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="text-center font-weight-bold">
          <td class="text-left" colspan="2">Total</td>
          <td>{{ geraTotais.qtde.toFixed(0)}}</td>
          <td>R$ {{ geraTotais.posicao_inicial.toFixed(2)}}</td>
          <td>618,00</td>
          <td class="border-right">+110,00</td>
          <td>-</td>
          <td>-</td>
          <td class="border-right">20,0%</td>
          <td class="border-right">-7,91</td>
          <td>-</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      ...mapState(["stateAtivo"]),
      acoes: []
    };
  },
  created() {
    this.getData();
  },
  computed: {
    geraTotais() {
      const values = {
        qtde: 0,
        posicao_inicial: 0
      };
      if (this.acoes.length) {
        for (let i in this.acoes) {
          values.qtde += this.acoes[i].qtde;
          values.posicao_inicial += this.acoes[i].subtotal;
        }
      }
      return values;
    }
  },
  methods: {
    resgate(ativo) {
      this.$store.state.stateAtivo = ativo
      this.$router.push({
        name: "ConteudoAcompanhamento",
        params: { subrota: "aresgates" }
      });
    },
    formatNumber(value1, value2) {
      const finalValue = value2 / value1;
      return finalValue.toFixed(2);
    },
    getData() {
      const id_user = "user_" + window.uid;
      const id_carteira = "carteira_" + window.uid;
      const id_aporte = "aporte_" + window.uid;
      const db = this.$firebase
        .firestore()
        .collection(id_user)
        .doc(id_carteira)
        .collection(id_aporte)
        .where("tipo", "==", "Ações B3")
        .orderBy("ativo", "asc");

      db.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (!this.acoes.length) {
            this.acoes.push(doc.data());
          } else {
            if (this.acoes[this.acoes.length - 1].ativo === doc.data().ativo) {
              this.acoes[this.acoes.length - 1].qtde += doc.data().qtde;
              this.acoes[this.acoes.length - 1].subtotal += doc.data().subtotal;
            } else {
              this.acoes.push(doc.data());
            }
          }
        });
      });
    }
  }
};
</script>

<style>
</style>
