<template>
  <div class="container height: 100%">
    <i class="fas fa-user-circle"></i> <span class="small">{{ this.$store.state.email }} </span>
    <nav id="sidebarMenu" class="d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item mb-2">
            <router-link :to="{name:'ConteudoAcompanhamento', params: { subrota: 'adashboard'}}">
              <i class="fas fa-chart-line"></i> Dashboard
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link :to="{ name:'ConteudoAcompanhamento', params: { subrota: 'acarteiras'} }">
              <i class="fas fa-wallet"></i> Carteiras
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link :to="{ name:'ConteudoAcompanhamento', params: { subrota: 'aextrato'} }">
              <i class="far fa-list-alt"></i> Extratos
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link :to="{ name:'ConteudoAcompanhamento', params: { subrota: 'aproventos'} }">
              <i class="fas fa-search-dollar"></i> Proventos
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link
              :to="{ name:'ConteudoAcompanhamento', params: { subrota: 'arentabilidade'} }"
            >
              <i class="far fa-chart-bar"></i> Rentabilidade
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link :to="{ name:'ConteudoAcompanhamento', params: { subrota: 'aaportes'} }">
              <i class="fas fa-piggy-bank"></i> Aportes
            </router-link>
          </li>
           <li class="nav-item mb-2">
            <router-link :to="{ name:'ConteudoAcompanhamento', params: { subrota: 'upload'} }">
              <i class="fas fa-upload"></i> Upload
            </router-link>
          </li>
        </ul>
        <p class="nav-item mt-5 font-weight-bold">
          Configurações
          <i class="fas fa-user-cog"></i>
        </p>
        <ul class="nav flex-column">
          <li class="nav-item mb-2">
            <router-link :to="{ name:'ConteudoAcompanhamento', params: { subrota: 'aconta'} }">
              <i class="far fa-address-card"></i> Conta
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link :to="{ name:'ConteudoAcompanhamento', params: { subrota: 'aajuda'} }">
              <i class="far fa-question-circle"></i> Ajuda
            </router-link>
          </li>
          <li class="nav-item mb-4 ml-15">
            <aSair></aSair>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import aSair from "./content/aSair";
import { mapState } from "vuex";

export default {
  data(){
    return{
      ...mapState(["email"])
    }
  },
  components: {
    aSair
  }
};
</script>

<style scoped>
a {
  color: black;
  font-size: 14px;
  text-decoration: none;
}
li:hover {
  background-color: white;
  font-weight: bold;
}
a:active {
  color: red;
}
.small{
  font-size: 10px;
}
</style>
