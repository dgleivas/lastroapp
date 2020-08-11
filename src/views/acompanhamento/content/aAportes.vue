<template>
  <div id="principal" class="card border-primary mx-auto mt-2 mb-2" style="max-width: 30rem;">
    <div class="card-header text-center font-weight-bold">Aporte</div>
    <div class="card-body">
      <div class="my-2 mx-3 row">
        <select class="form-select" aria-label="Default select example">
          <option selected>Selecione o Tipo</option>
          <option
            :value="grupo.id_grupo"
            v-for="grupo in Grupos.grupos"
            v-bind:key="grupo.id_grupo"
          >{{grupo.grupo_title}}</option>
        </select>
      </div>
      <div class="my-2 mx-3 row">
        <select class="form-select" aria-label="Default select example">
          <option selected>Selecione a Ação</option>
          <option
            :value="acao.id_acao"
            v-for="acao in Acoes.acoes"
            v-bind:key="acao.id_acao"
          >{{acao.codigo_acao}} - {{acao.empresa}}</option>
        </select>
      </div>
      <div class="my-2 mx-3 row">
        <select class="form-select" aria-label="Default select example">
          <option selected>Selecione o Segmento</option>
          <option
            :value="segmento.id_segmento"
            v-for="segmento in Segmentos.segmentos"
            v-bind:key="segmento.id_segmento"
          >{{segmento.segmento_title}}</option>
        </select>
      </div>
      <div class="my-2 mx-3 row">
        <input type="number" class="form-control" id="inputCodigo" placeholder="Quantidade" />
      </div>
      <div class="my-2 mx-3 row">
        <input
          type="number"
          class="form-control"
          id="inputCodigo"
          placeholder="Preço médio da compra"
        />
      </div>
      <div class="my-2 mx-3 row">
        <input
          type="text"
          class="form-control"
          id="inputCodigo"
          placeholder="Data da Compra (dd/mm/aaaa)"
        />
      </div>
    </div>
    <div class="card-footer text-center">
      <button type="button" class="btn btn-outline-primary">
        <i class="fas fa-plus"></i> Adicionar
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["Grupos", "Segmentos", "Acoes", "Fiis"])
  },
  methods: {
    ...mapActions(["getGrupos", "getSegmentos", "getAcoes", "getFiis"])
  },
  created() {
    this.getGrupos(), this.getSegmentos(), this.getAcoes(), this.getFiis();
  }
};
</script>

<style scoped>
div,
input,
select {
  font-size: 14px;
}

#principal {
  border-radius: 25px;
}
</style>