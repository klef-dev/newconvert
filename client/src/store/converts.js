// import router from "../router";
import instance from "../http";
import errorHandler from "../errorHandler";

export default {
  namespaced: true,
  state: {
    reg_no: null,
    spiritual: "",
    holy: "",
    water: "",
    newConverts: [],
    newlyAdded: [],
    totalConverts: 0,
    pcent: 100,
    rededicated: 0,
    newlyConverted: 0,
    years: [],
    tcpy: 0,
    months: [],
    tcpm: 0,
    semester: [],
    tcps: 0
  },
  actions: {
    async index({ commit }) {
      const { data } = await instance.get("/api/v1/convert");
      if (data.error) {
        iziToast.error({
          title: "Something happened",
          position: "topRight",
          timeout: 10000,
          message: data.msg
        });
      } else {
        commit("index", data);
      }
    },

    create({ commit, state }) {
      return instance
        .get(`/student/${state.reg_no}`)
        .then(({ data }) => {
          if (data == null) {
            iziToast.error({
              title: "Something is not right",
              position: "topRight",
              timeout: 10000,
              message: "This reg no is not registered with landmark"
            });
          } else {
            const { fullname, email, programme, hall, room } = data;
            let check = confirm(
              `Are this details correct: ${fullname}, ${state.reg_no}, ${programme}`
            );
            if (check) {
              return instance
                .post("/api/v1/convert", {
                  name: fullname,
                  reg_no: state.reg_no,
                  webmail: email,
                  programme,
                  hall,
                  room,
                  spiritual: state.spiritual,
                  holy: state.holy,
                  water: state.water
                })
                .then(({ data }) => {
                  if (data.error) {
                    iziToast.error({
                      title: "Something happened",
                      position: "topRight",
                      timeout: 10000,
                      message: data.msg
                    });
                  } else {
                    commit("create", data);
                    commit("setRegNo", null);
                    iziToast.success({
                      title: "Good job",
                      position: "topRight",
                      timeout: 10000,
                      message: `${fullname} is now born again`
                    });
                  }
                })
                .catch(error => {
                  errorHandler(error, "Converting error");
                });
            }
          }
        })
        .catch(error => {
          errorHandler(error, "Lmu error");
        });
    },

    // Get total number of new converts
    async total({ commit }) {
      try {
        const { data } = await instance.get("/api/v1/totalconverts");
        if (data.error) {
          iziToast.error({
            title: "Something happened",
            position: "topRight",
            timeout: 10000,
            message: data.msg
          });
        } else {
          commit("setTotal", data.totalConverts);
        }
      } catch (error) {
        errorHandler(error, "stats error");
      }
    },

    // Get current year from the db
    async getYear({ commit }) {
      try {
        const { data } = await instance.get("/api/v1/year");
        if (data.error) {
          iziToast.error({
            title: "Something happened",
            position: "topRight",
            timeout: 10000,
            message: data.msg
          });
        } else {
          commit("setYear", data);
        }
      } catch (error) {
        errorHandler(error, "Year error");
      }
    },

    // Get total number of converts yearly
    async getTotalPerYear({ commit }, year) {
      if (year == "") {
        return;
      }
      try {
        const { data } = await instance.get(`/api/v1/tcpy/${year}`);
        if (data.error) {
          iziToast.error({
            title: "Something happened",
            position: "topRight",
            timeout: 10000,
            message: data.msg
          });
        } else {
          commit("setTCPY", data.tcpy);
        }
      } catch (error) {
        errorHandler(error, "Year error");
      }
    },

    // Get current month from db
    async getMonth({ commit }) {
      try {
        const { data } = await instance.get("/api/v1/month");
        if (data.error) {
          iziToast.error({
            title: "Something happened",
            position: "topRight",
            timeout: 10000,
            message: data.msg
          });
        } else {
          commit("setMonth", data);
        }
      } catch (error) {
        errorHandler(error, "Month");
      }
    },

    // Get total number of converts monthly
    async getTotalPerMonth({ commit }, month) {
      if (month == "") {
        return;
      }
      try {
        const { data } = await instance.get(`/api/v1/tcpm/${month}`);
        if (data.error) {
          iziToast.error({
            title: "Something happened",
            position: "topRight",
            timeout: 10000,
            message: data.msg
          });
        } else {
          commit("setTCPM", data.tcpm);
        }
      } catch (error) {
        errorHandler(error, "Year error");
      }
    },
    // Get current semesters from db
    async getSemester({ commit }) {
      try {
        const { data } = await instance.get("/api/v1/semester");
        if (data.error) {
          iziToast.error({
            title: "Something happened",
            position: "topRight",
            timeout: 10000,
            message: data.msg
          });
        } else {
          commit("setSemester", data);
        }
      } catch (error) {
        errorHandler(error, "Semester error");
      }
    },

    // Get total number of converts semesterly
    async getTotalPerSemester({ commit }, semester) {
      if (semester == "") {
        return;
      }
      try {
        const { data } = await instance.get(`/api/v1/tcps/${semester}`);
        if (data.error) {
          iziToast.error({
            title: "Something happened",
            position: "topRight",
            timeout: 10000,
            message: data.msg
          });
        } else {
          commit("setTCPS", data.tcps);
        }
      } catch (error) {
        errorHandler(error, "Semester error");
      }
    },

    async rededicated({ commit, state }) {
      try {
        const { data } = await instance.get("/api/v1/rededicated");
        if (data.error) {
          iziToast.error({
            title: "Something happened",
            position: "topRight",
            timeout: 10000,
            message: data.msg
          });
        } else {
          let point = state.totalConverts, final = (data.rededicated / point) * state.pcent;
          commit("setRededicated", final.toFixed());
        }
      } catch (error) {
        errorHandler(error, "Rededicated error");
      }
    },

    async newlyConverted({ commit, state }) {
      try {
        const { data } = await instance.get("/api/v1/newlyConverted");
        if (data.error) {
          iziToast.error({
            title: "Something happened",
            position: "topRight",
            timeout: 10000,
            message: data.msg
          });
        } else {
          let point = state.totalConverts, final = (data.newlyConverted / point) * state.pcent;
          commit("setNewlyConverted", final.toFixed());
        }
      } catch (error) {
        errorHandler(error, "Newly converted error");
      }
    },
  },
  getters: {},
  mutations: {
    setRegNo(state, reg_no) {
      state.reg_no = reg_no;
    },
    setSpiritual(state, spiritual) {
      state.spiritual = spiritual;
    },
    setHoly(state, holy) {
      state.holy = holy;
    },
    setWater(state, water) {
      state.water = water;
    },
    create(state, newlyAdded) {
      state.newlyAdded.unshift(newlyAdded);
      state.newConverts.unshift(newlyAdded);
    },
    index(state, data) {
      state.newlyAdded = [];
      state.newConverts = data;
    },
    setTotal(state, total) {
      state.totalConverts = total;
    },
    setRededicated(state, rededicated) {
      state.rededicated = rededicated;
    },
    setNewlyConverted(state, newlyConverted) {
      state.newlyConverted = newlyConverted;
    },
    setYear(state, years) {
      state.years = years;
    },
    setTCPY(state, tcpy) {
      state.tcpy = tcpy;
    },
    setMonth(state, months) {
      state.months = months;
    },
    setTCPM(state, tcpm) {
      state.tcpm = tcpm;
    },
    setSemester(state, semesters) {
      state.semesters = semesters;
    },
    setTCPS(state, tcps) {
      state.tcps = tcps;
    }
  }
};
