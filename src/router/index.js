import Vue from "vue";
import VueRouter from "vue-router";
import Acompanhamento from "../views/Acompanhamento.vue";
import Analise from "../views/Analise.vue";
import Orcamento from "../views/Orcamento.vue";
import aContent from "../views/acompanhamento/aContent.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/acompanhamento"
  },
  {
    path: "/analise",
    name: "Analise",
    component: Analise,
    props: true
  },
  {
    path: "/acompanhamento",
    name: "Acompanhamento",
    component: Acompanhamento,
    props: true,
    children: [{
      path: ":subrota",
      name: "ConteudoAcompanhamento",
      component: aContent,
      props: true
    }]
  },
  {
    path: "/orcamento",
    name: "Orcamento",
    component: Orcamento,
    props: true
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
