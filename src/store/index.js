import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios/dist/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stateAtivo:"teste ativo state",
    email:"",
    Grupos: [],
    Segmentos: [],
    Acoes: [],
    Fiis: []
  },
  mutations: { // invoca mutation usando commit
    getGrupos(state,payload){
      state.Grupos = payload;
    },
    getSegmentos(state,payload){
      state.Segmentos = payload;
    },
    getAcoes(state,payload){
      state.Acoes = payload;
    },
    getFiis(state,payload){
      state.Fiis = payload;
    }
  },
  actions: { // invoca action usando  dispatch
    async getGrupos(context) {
      return Axios({
        url: "http://localhost:4000", //porta padrão do apolloserver
        method: "post",
        data: {
          query: `
            query {
              grupos {
                id_grupo
                grupo_title
              }
            }
          `,
        },
      })
        .then((response) => {
          const query = response.data;
          context.commit("getGrupos",{ grupos: query.data.grupos})
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getSegmentos(context) {
      return Axios({
        url: "http://localhost:4000", //porta padrão do apolloserver
        method: "post",
        data: {
          query: `
            query {
              segmentos {
                id_segmento
                segmento_title
              }
            }
          `,
        },
      })
        .then((response) => {
          const query = response.data;
          context.commit("getSegmentos",{ segmentos: query.data.segmentos})
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getAcoes(context) {
      return Axios({
        url: "http://localhost:4000", //porta padrão do apolloserver
        method: "post",
        data: {
          query: `
            query {
              acoes {
                id_acao
                codigo_acao
                empresa
              }
            }
          `,
        },
      })
        .then((response) => {
          const query = response.data;
          context.commit("getAcoes",{ acoes: query.data.acoes})
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getFiis(context) {
      return Axios({
        url: "http://localhost:4000", //porta padrão do apolloserver
        method: "post",
        data: {
          query: `
            query {
              fiis {
                id_fii
                codigo_fii
                fii_title
              }
            }
          `,
        },
      })
        .then((response) => {
          const query = response.data;
          context.commit("getFiis",{ acoes: query.data.fiis})
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  modules: {}
});
