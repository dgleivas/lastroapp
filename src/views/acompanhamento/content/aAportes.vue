<template>
  <div class="card border-primary mx-auto mt-2 mb-2" style="max-width: 30rem;">
    <div class="card-header text-center font-weight-bold">Aporte</div>
    <div class="card-body">
      <div class="my-2 mx-3 row">
        <select class="form-select" aria-label="Default select example">
          <option selected>Selecione o Tipo</option>
          <option value="1">Fundo Imobiliario</option>
          <option value="2">Ações</option>
        </select>
      </div>
      <div class="my-2 mx-3 row">
        <input type="text" class="form-control" id="inputCodigo" placeholder="Codigo" />
      </div>
      <div class="my-2 mx-3 row">
        <input type="number" class="form-control" id="inputCodigo" placeholder="Quantidade" />
      </div>
      <div class="my-2 mx-3 row">
        <input type="number" class="form-control" id="inputCodigo" placeholder="Preço médio da compra" />
      </div>
      <div class="my-2 mx-3 row">
        <input type="text" class="form-control" id="inputCodigo" placeholder="Data da Compra (dd/mm/aaaa)" />
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
export default {};
</script>

<style scoped>
div {
  font-size: 10px;
}
input {
  font-size: 10px;
}
</style>