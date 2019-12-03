import router from "../router";
import instance from "../http";

export default {
  namespaced: true,
  state: {
    registerEmail: "",
    registerPassword: "",
    registerConPassword: "",
    registerUnit: "",
    registerHead: "",
    registerAssistant: "",
    registerError: null,
    file: null,
    loginEmail: "",
    loginPassword: "",
    loginError: null,
    token: null,
    user: []
  },
  actions: {
    logout({ commit }) {
      commit("setToken", null);
      commit("index", []);
      instance.defaults.headers.Authorization = null;
      router.push("/login");
    },

    async register({ commit, state }) {
      commit("setRegisterError", null);
      let formData = new FormData();
      formData.append("file", state.file);
      formData.append("webmail", state.registerEmail);
      formData.append("password", state.registerPassword);
      formData.append("unit", state.registerUnit);
      formData.append("head", state.registerHead);
      formData.append("assistant", state.registerAssistant);

      try {
        const { data } = await instance.post("/api/v1/auth/signup", formData);
        if (data.error) {
          commit("setRegisterError", data.msg);
        } else {
          commit("setToken", data.token);
          commit("setRegisterEmail", "");
          commit("setRegisterUnit", "");
          commit("setRegisterHead", "");
          commit("setRegisterAssistant", "");
          commit("setRegisterPassword", "");
          commit("setRegisterConPassword", "");
          instance.defaults.headers.Authorization = `Bearer ${data.token}`;
          router.push("/");
        }
      } catch (e) {
        commit(
          "setRegisterError",
          "An error occured trying to create your account."
        );
      }
    },

    async login({ commit, state }) {
      commit("setLoginError", null);
      try {
        const { data } = await instance.post("/api/v1/auth/login", {
          webmail: state.loginEmail,
          password: state.loginPassword
        });
        commit("setToken", data.token);
        commit("setLoginEmail", "");
        commit("setLoginPassword", "");
        commit("setLoginError", null);
        instance.defaults.headers.Authorization = `Bearer ${data.token}`;
        router.push("/");
      } catch (e) {
        commit("setLoginError", "An error occured trying to login.");
      }
    },

    async index({ commit }) {
      const { data } = await instance.get("/api/v1/user");
      commit("index", data);
    },

    async edit({ commit }, user) {
      commit("setRegisterError", null);
      try {
        const { data } = await instance.patch(
          `/api/v1/auth/edit/${user.id}`,
          user
        );
        if (data.error) {
          iziToast.error({
            title: "Something happened",
            position: "topRight",
            timeout: 10000,
            message: data.msg
          });
        } else {
          iziToast.success({
            title: "Good job",
            position: "topRight",
            timeout: 10000,
            message: "Edited successfully"
          });
          router.push("/dashboard");
        }
      } catch (error) {
        errorHandler(error, "Edit");
      }
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRegisterError(state, error) {
      state.registerError = error;
    },
    setRegisterEmail(state, email) {
      state.registerEmail = email;
    },
    setRegisterPassword(state, password) {
      state.registerPassword = password;
    },
    setRegisterConPassword(state, con_password) {
      state.registerConPassword = con_password;
    },
    setRegisterUnit(state, Unit) {
      state.registerUnit = Unit;
    },
    setRegisterHead(state, Head) {
      state.registerHead = Head;
    },
    setRegisterAssistant(state, Assistant) {
      state.registerAssistant = Assistant;
    },
    handleFileUpload(state, file) {
      state.file = file;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setLoginEmail(state, email) {
      state.loginEmail = email;
    },
    setLoginPassword(state, password) {
      state.loginPassword = password;
    },
    index(state, data) {
      state.user = [];
      state.user.push(data);
    },
    setEditEmail(state, { user, webmail }) {
      user.webmail = webmail;
    },
    setEditUnit(state, { user, unit }) {
      user.unit = unit;
    },
    setEditHead(state, { user, head }) {
      user.head = head;
    },
    setEditAssistant(state, { user, assistant }) {
      user.assistant = assistant;
    }
  }
};
