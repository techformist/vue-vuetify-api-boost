import req from "../util/req";

import { make } from "vuex-pathify";
import store from ".";

const getDefaultState = () => {
  return {
    serviceReqs: [],
    activeServiceReq: {}
  };
};

const state = getDefaultState();

export default {
  namespaced: true,
  name: "serviceReq",
  state: state,

  actions: {
    async fetchServiceReq(args, params) {
      let { page, query } = params;
      let url = `v0/sr-my`;
      page = page ? page : 1;
      url += `?page=${page}`;

      if (query && !!Object.entries(query).length)
        url += "&query=" + JSON.stringify(query);

      const { data } = await req("get", url);
      if (data) store.set("serviceReq/serviceReqs", data);
      else store.set("serviceReq/serviceReqs", { data: [] });
    },

    async createServiceReq({ commit }, sr) {
      const { data } = await req("post", "v0/sr/", sr);
      store.set("serviceReq/activeServiceReq", data);
      commit("appendServiceReq", data);
      return data;
    },

    async updateServiceReq({ state }) {
      try {
        const { data } = await req(
          "patch",
          `v0/sr/${state.activeServiceReq.id}`,
          state.activeServiceReq
        );

        if (data) {
          store.set("serviceReq/activeServiceReq", data);
          store.set("snackbar/snack", {
            message: "Service request updated.",
            color: "success"
          });
        } else {
          store.set("snackbar/snack", {
            message: "Service request update failed.",
            color: "error"
          });
          store.commit(
            "pgtalert/setAlertMsg",
            "Service update failed. Retry later or contact us for assistance."
          );
        }
      } catch (e) {
        // i am error}
      }
    }
  },

  mutations: {
    ...make.mutations(state),

    appendServiceReq(state, record) {
      if (state.serviceReqs && state.serviceReqs.data)
        state.serviceReqs.data.unshift(record);
    },

    resetState(state) {
      Object.assign(state, getDefaultState());
    }
  }
};
