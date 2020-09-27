<template>
  <div class="mt-4">
    <table class="table table-striped table-hover">
      <thead>
        <tr class="table-dark text-center">
          <th class="col text-left align-middle" width="5%">Codigo</th>
          <th class="col text-lef align-middle">Nome</th>
          <th class="col align-middle border-right">Qtde.</th>
          <th class="col align-middle">
            Posição
            <br />Inicial
          </th>
          <th class="col align-middle">
            Posição
            <br />Atual
          </th>
          <th class="col border-right align-middle">
            Resultado
            <br />Acumulado
          </th>
          <th class="col align-middle">
            Preço
            <br />Médio
          </th>
          <th class="col align-middle">
            Cotação
            <br />Atual
          </th>
          <th class="col border-right align-middle">Variação</th>
          <th class="col border-right align-middle">
            Resultado
            <br />do dia
          </th>
          <th class="col align-middle" width="5%">Resgate</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="acao in acoes" :key="acao.id">
          <td class="text-left">{{ acao.ativo }}</td>
          <td class="text-left">{{ acao.empresa }}</td>
          <td class="border-right">{{ acao.qtde.toFixed(2) }}</td>
          <td>{{ acao.subtotal.toFixed(2) }}</td>
          <td>{{ calcMulti(acao.qtde, acao.actualprice) }}</td>
          <td class="border-right">
            {{ calcSubtracao(acao.subtotal, acao.qtde * acao.actualprice) }}
          </td>
          <td>{{ calcMedio(acao.subtotal, acao.qtde) }}</td>
          <td>{{ acao.actualprice }}</td>
          <td class="border-right">
            {{ calcPercentual(acao.actualprice, acao.subtotal / acao.qtde) }}%
          </td>
          <td class="border-right">
            {{
              calcSubtracao(
                acao.qtde * acao.lastprice,
                acao.qtde * acao.actualprice
              )
            }}
          </td>
          <td>
            <a @click="resgate(acao.ativo)">
              <i class="fas fa-hand-holding-usd text-danger"></i>
            </a>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="text-center font-weight-bold">
          <td class="text-left" colspan="2">Total</td>
          <td class="border-right">{{ geraTotais.qtde.toFixed(2) }}</td>
          <td>{{ geraTotais.posicaoInicial.toFixed(2) }}</td>
          <td>{{ geraTotais.posicaoAtual.toFixed(2) }}</td>
          <td class="border-right">{{ geraTotais.resultTotal.toFixed(2) }}</td>
          <td>-</td>
          <td>-</td>
          <td class="border-right">
            {{ geraTotais.resultPercent.toFixed(2) }}%
          </td>
          <td class="border-right">{{ geraTotais.resultHoje.toFixed(2) }}</td>
          <td>-</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import dataformat from "../../../../mixins/dataformat.js";
export default {
  name: "Tabela_da_Carteira",
  props: ["tipo", "cartteira"],
  mixins: [dataformat],
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
        posicaoInicial: 0,
        posicaoOntem: 0,
        posicaoAtual: 0,
        resultTotal: 0,
        resultHoje: 0,
        resultPercent: 0
      };
      if (this.acoes.length) {
        for (let i in this.acoes) {
          values.qtde += this.acoes[i].qtde;
          values.posicaoInicial += this.acoes[i].subtotal;
          values.posicaoAtual += this.acoes[i].qtde * this.acoes[i].actualprice;
          values.posicaoOntem += this.acoes[i].qtde * this.acoes[i].lastprice;
        }
      }
      values.resultTotal = values.posicaoAtual - values.posicaoInicial;
      values.resultPercent =
        (values.posicaoAtual / values.posicaoInicial - 1) * 100;
      values.resultHoje = values.posicaoAtual - values.posicaoOntem;
      return values;
    }
  },
  methods: {
    getData() {
      this.getDataDBCotacao(this.cartteira).then(data2 => {
        this.acoes = data2;
      });
    },
    resgate(ativo) {
      this.$store.state.stateAtivo = ativo;
      this.$router.push({
        name: "ConteudoAcompanhamento",
        params: { subrota: "aresgates" }
      });
    },
    async getDataDBCotacao(data) {
      const stocksCotacoes = [];
      let collec = "";
      const createdDate = new Date();
      const mes = String(createdDate.getMonth() + 1);
      const ano = String(createdDate.getFullYear());
      const mesano = mes.concat(ano);
      switch (this.tipo) {
        case "Ações B3":
          collec = "cotacoes_acoesbrl";
          break;
        case "Fundos Imobiliários":
          collec = "cotacoes_fundos";
          break;
        case "Ações Americanas":
          collec = "cotacoes_acoeseua";
          break;
        case "Reits":
          collec = "cotacoes_reits";
          break;
        case "ETFs":
          collec = "cotacoes_etfs";
          break;
      }
      const db = this.$firebase
        .firestore()
        .collection(collec)
        .doc(mesano);

      await db
        .get()
        .then(doc => {
          if (doc.exists) {
            stocksCotacoes.push(doc.data().dadosCotacao);
          }
        })
        .catch(error => {
          console.log("Error getting document:", error);
        });
      for (let i in data) {
        for (let j in stocksCotacoes[0]) {
          if (stocksCotacoes[0][j]["codigo"] == data[i].ativo) {
            data[i].actualprice = Number(stocksCotacoes[0][j]["actualprice"]);
            data[i].lastprice = Number(stocksCotacoes[0][j]["lastprice"]);
          }
        }
      }

      return data;
    }
  }
};
</script>

<style scoped></style>
