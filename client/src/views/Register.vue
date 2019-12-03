<template>
  <div class="dashboard-influence">
    <div class="container-fluid dashboard-content">
      <div class="row">
        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12"></div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <Panel title="Register">
            <form method="post" @submit.prevent="register">
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <label for="email">Webmail</label>
                  <input
                    type="email"
                    class="form-control"
                    :value="registerEmail"
                    @input="setRegisterEmail($event.target.value)"
                  />
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <label for="unit">Unit</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="registerUnit"
                    @input="setRegisterUnit($event.target.value)"
                  />
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <label for="head">Head of Unit</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="registerHead"
                    @input="setRegisterHead($event.target.value)"
                  />
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <label for="assistant">Assistant of Unit</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="registerAssistant"
                    @input="setRegisterAssistant($event.target.value)"
                  />
                </div>

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    autocomplete="new-password"
                    :value="registerPassword"
                    class="form-control"
                    @input="setRegisterPassword($event.target.value)"
                    required
                  />
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <label for="password">Confirm Password</label>
                  <input
                    type="password"
                    autocomplete="new-password"
                    :value="registerConPassword"
                    class="form-control"
                    @input="setRegisterConPassword($event.target.value)"
                    required
                  />
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <label for="password">Image</label>
                  <input
                    type="file"
                    id="file"
                    ref="file"
                    class="form-control"
                    v-on:change="handleFileUpload($refs.file.files[0])"
                    required
                  />
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <span
                    :value="registerError"
                    v-html="registerError"
                    style="color: red;"
                  ></span>
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <button class="btn btn-primary" type="submit">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </Panel>
        </div>
        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
// import router from '../router';
export default {
  // mounted() {
  //   if(!this.isLoggedIn) {
  //     return router.push("/login")
  //   }
  //   if(this.user[0].unit != "Hospitality") {
  //     return router.push("/dashboard")
  //   }
  // },
  computed: {
    ...mapState("authentication", [
      "user",
      "registerEmail",
      "registerPassword",
      "registerConPassword",
      "registerUnit",
      "registerHead",
      "registerAssistant",
      "registerError"
    ]),
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  methods: {
    ...mapMutations("authentication", [
      "setRegisterEmail",
      "setRegisterPassword",
      "setRegisterConPassword",
      "setRegisterUnit",
      "setRegisterHead",
      "setRegisterAssistant",
      "handleFileUpload"
    ]),
    ...mapActions("authentication", ["register"])
  }
};
</script>
