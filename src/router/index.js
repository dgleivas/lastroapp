import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import(/* webpackChunkName: "Analise" */ "../components/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    props: true,
    component: () => import(/* webpackChunkName: "Analise" */ "../components/Home.vue"),
    children: [
      {
        path: "analise",
        name: "Analise",
        component: () => import(/* webpackChunkName: "Analise" */ "../components/Analise.vue"),
        props: true
      },
      {
        path: "acompanhamento",
        name: "Acompanhamento",
        component: () => import(/* webpackChunkName: "Acompanhamento" */ "../components/Acompanhamento.vue"),
        props: true,
        children: [{
          path: ":subrota",
          name: "ConteudoAcompanhamento",
          component: () => import(/* webpackChunkName: "ConteudoAcompanhamento" */ "../views/acompanhamento/aContent.vue"),
          props: true
        }]
      },
      {
        path: "orcamento",
        name: "Orcamento",
        component: () => import(/* webpackChunkName: "Orcamento" */ "../components/Orcamento.vue"),
        props: true
      }
    ]

  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!window.uid && to.name != "Login") {
    next({ name: "Login" })
  } else {
    next()
  }

})

export default router;
