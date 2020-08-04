<template>
  <nav class="navbar navbar-expand-lg bg-primary bg-gradient">
    <div class="container-fluid">
      <div>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item mr-3">
            <router-link :to="{ name: 'Analise' }" exact>Analises</router-link>
          </li>
          <li class="nav-item mr-3">
            <router-link :to="{ name: 'Acompanhamento' }" exact>Acompanhamento</router-link>
          </li>
          <li class="nav-item mr-3">
            <router-link :to="{ name: 'Orcamento' }" exact>Orçamento</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.router-link-exact-active {
  font-weight: bold;
}
a {
  color: white;
  font-size: 18px;
  padding: 8px;
  text-align: center;
  text-decoration: none;
}

a:hover {
  font-weight: bold;
}
</style>