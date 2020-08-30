<template>
  <div class="mt-4">
    <p class="font-weight-bold">Fundos Imobiliários</p>
    <table class="table table-striped table-hover">
      <thead>
        <tr class="table-dark text-center">
          <th class="col text-left">Codigo</th>
          <th class="col">Qtde.</th>
          <th class="col">Posição Inicial</th>
          <th class="col">Posição Atual</th>
          <th class="col border-right">Resultado (R$)</th>
          <th class="col">Yield Media 3 meses (R$)</th>
          <th class="col border-right">Yield Media 3 meses (%)</th>
          <th class="col">Yield Acum. Ano (R$)</th>
          <th class="col border-right">Yield Acum. Ano (%)</th>
          <th class="col">Resgate</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="fundo in fundos" :key="fundo.id">
          <td class="text-left">{{fundo.ativo}}</td>
          <td>{{fundo.qtde.toFixed(0)}}</td>
          <td>{{fundo.subtotal.toFixed(2)}}</td>
          <td>-</td>
          <td class="border-right">-</td>
          <td>-</td>
          <td class="border-right">-</td>
          <td>-</td>
          <td class="border-right">-</td>
          <td>
            <a @click="resgate(fundo.ativo)">
              <i class="fas fa-hand-holding-usd text-danger fa-2x"></i>
            </a>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="text-center font-weight-bold">
          <td class="text-left">Total</td>
          <td>{{ geraTotais.qtde.toFixed(0)}}</td>
          <td>R$ {{ geraTotais.posicao_inicial.toFixed(2)}}</td>
          <td>618,00</td>
          <td class="border-right">+110,00</td>
          <td>21,30</td>
          <td class="border-right">19,0%</td>
          <td>-7,91</td>
          <td class="border-right">-7,91</td>
          <td>
           -
          </td>
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
      fundos: []
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
      if (this.fundos.length) {
        for (let i in this.fundos) {
          values.qtde += this.fundos[i].qtde;
          values.posicao_inicial += this.fundos[i].subtotal;
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
    getData() {
      const id_user = "user_" + window.uid;
      const id_carteira = "carteira_" + window.uid;
      const id_aporte = "aporte_" + window.uid;
      const db = this.$firebase
        .firestore()
        .collection(id_user)
        .doc(id_carteira)
        .collection(id_aporte)
        .where("tipo", "==", "Fundos Imobiliários")
        .orderBy("ativo", "asc");

      db.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (!this.fundos.length) {
            this.fundos.push(doc.data());
          } else {
            if (
              this.fundos[this.fundos.length - 1].ativo === doc.data().ativo
            ) {
              this.fundos[this.fundos.length - 1].qtde += doc.data().qtde;
              this.fundos[
                this.fundos.length - 1
              ].subtotal += doc.data().subtotal;
            } else {
              this.fundos.push(doc.data());
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
