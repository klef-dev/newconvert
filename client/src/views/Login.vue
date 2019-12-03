<template>
  <div class="dashboard-influence">
    <div class="container-fluid dashboard-content">
      <div class="row">
        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12"></div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
          <Panel title="Login">
            <form method="post" @submit.prevent="login">
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <label for="email">Webmail</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    :value="loginEmail"
                    @input="setLoginEmail($event.target.value)"
                    required
                  />
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    autocomplete="new-password"
                    :value="loginPassword"
                    @input="setLoginPassword($event.target.value)"
                    required
                  />
                </div>
                <span :value="loginError" v-html="loginError"></span>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <button class="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </Panel>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("authentication", ["loginEmail", "loginPassword", "loginError"])
  },
  methods: {
    ...mapMutations("authentication", ["setLoginEmail", "setLoginPassword"]),
    ...mapActions("authentication", ["login"])
  }
};
</script>
