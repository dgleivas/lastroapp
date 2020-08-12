<template>
  <div class="mt-4">
    <div class="mx-auto" style="max-width: 30rem;">
      <p class="font-weight-bold">Extrato</p>
      <table class="table table-striped table-hover">
        <thead>
          <tr class="table-dark text-center">
            <th class="col text-left">Dia</th>
            <th class="col text-left">Codigo</th>
            <th class="col text-right">Operação</th>
            <th class="col text-right">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center">
            <td class="text-left">02/08/2020</td>
            <td class="text-left">ITUB3</td>
            <td class="text-right">Credito</td>
            <td class="text-right"><span class="text-success">+18,99</span></td>
          </tr>
          <tr class="text-center">
            <td class="text-left">02/08/2020</td>
            <td class="text-left">ITUB3</td>
            <td class="text-right">Credito</td>
            <td class="text-right"><span class="text-success">+10,30</span></td>
          </tr>
          <tr class="text-center">
            <td class="text-left">02/08/2020</td>
            <td class="text-left">ITUB3</td>
            <td class="text-right">Debito</td>
            <td class="text-right"><span class="text-danger">-23,50</span></td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="text-center font-weight-bold">
            <td class="text-left">Total</td>
            <td></td>
            <td></td>
            <td class="text-right">24,00</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
