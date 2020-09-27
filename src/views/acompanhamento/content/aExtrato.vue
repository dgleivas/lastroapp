<template>
  <div class="mt-4">
    <div class="mx-auto" style="max-width: 45rem;">
      <div class="row">
        <div class="form-group col-4 font-weight-bold"></div>
        <div class="form-group col-2 font-weight-bold text-right pt-2">
          Mês:
        </div>
        <div class="form-group col-2 font-weight-bold">
          <select
            class="form-select month"
            @change="getExtrato()"
            v-model="mes"
          >
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
        </div>
        <div class="form-group col-2 font-weight-bold text-right pt-2">
          Ano:
        </div>
        <div class="form-group col-2 font-weight-bold">
          <select class="form-select" @change="getExtrato()" v-model="ano">
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
          </select>
        </div>
      </div>
      <hr />

      <p class="font-weight-bold">Extrato</p>
      <table class="table table-striped table-hover">
        <thead>
          <tr class="table-dark text-center">
            <th class="col text-left" width="10%">Dia</th>
            <th class="col" width="12.5%">Codigo</th>
            <th class="col text-left" width="27.5%">Empresa</th>
            <th class="col" width="10%">Operação</th>
            <th class="col" width="10%">Qtde</th>
            <th class="col" width="12.5%">Preço Médio</th>
            <th class="col" width="12.5%">Valor total</th>
            <th class="col" width="5%"></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="extrato.length">
            <tr class="text-center" v-for="dados in extrato" :key="dados.id">
              <td class="text-left">
                {{ dados.data_compra.seconds | convertData }}
              </td>
              <td>{{ dados.ativo }}</td>
              <td class="text-left">{{ dados.empresa }}</td>
              <td>{{ dados.operacao === "C" ? "Compra" : "Venda" }}</td>
              <td>{{ dados.qtde }}</td>
              <td>{{ dados.preco }}</td>
              <td>{{ dados.subtotal.toFixed(2) }}</td>
              <td>
                <a @click="alterar(dados.id)">
                  <i class="fas fa-edit text-primary"></i>
                </a>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr class="text-center">
              <td class="text-center" colspan="8">
                Não ha movimentações para o periodo escolhido
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import dataformat from "../../../mixins/dataformat.js";
export default {
  name: "Extrato",
  mixins: [dataformat],
  data() {
    return {
      ...mapState(["stateIDExtrato"]),
      mes: "",
      ano: "",
      extrato: []
    };
  },
  created() {
    this.getExtrato();
  },
  computed: {},
  methods: {
    alterar(id) {
      this.$store.state.stateIDExtrato = id;
      this.$router.push({
        name: "ConteudoAcompanhamento",
        params: { subrota: "aalterar" }
      });
    },
    async getExtrato() {
      if (this.mes === "" || this.ano === "") {
        const createdDate = new Date();
        this.mes = String(createdDate.getMonth() + 1);
        this.ano = String(createdDate.getFullYear());
      }
      const startDate = new Date(this.ano, this.mes - 1);
      const finalDate = new Date(this.ano, this.mes);
      let stocks = [];
      const id_user = "user_" + window.uid;
      const id_carteira = "carteira_" + window.uid;
      const id_aporte = "aporte_" + window.uid;

      const db = this.$firebase
        .firestore()
        .collection(id_user)
        .doc(id_carteira)
        .collection(id_aporte)
        .orderBy("data_compra", "asc")
        .where("data_compra", ">=", startDate)
        .where("data_compra", "<", finalDate);
      await db
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(stockDoc => {
            stocks.push(stockDoc.data());
          });
          return stocks;
        })
        .then(resultData => {
          this.extrato = resultData;
        });
    }
  }
};
</script>

<style scoped>
.month {
  width: 120px;
}
</style>
