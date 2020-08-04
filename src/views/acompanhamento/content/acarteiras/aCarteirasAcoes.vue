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
          <th class="col">Cotação Inicial</th>
          <th class="col">Cotação Atual</th>
          <th class="col border-right">Resultado (%)</th>
          <th class="col">Resultado ultimo dia</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center">
          <td class="text-left">ITUB3</td>
          <td class="text-left">ItauUnibanco</td>
          <td>24</td>
          <td>516,00</td>
          <td>618,00</td>
          <td class="border-right">+110,00</td>
          <td>21,30</td>
          <td>25,76</td>
          <td class="border-right">19,0%</td>
          <td>-7,91</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="text-center font-weight-bold">
          <td class="text-left" colspan="2">Total</td>
          <td>24</td>
          <td>516,00</td>
          <td>618,00</td>
          <td class="border-right">+110,00</td>
          <td>21,30</td>
          <td>25,76</td>
          <td class="border-right">19,0%</td>
          <td>-7,91</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style>

</style>