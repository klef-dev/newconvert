<template>
  <div class="dashboard-influence">
    <div class="container-fluid dashboard-content">
      <div class="row">
        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12"></div>
        <div
          class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"
          v-for="user in user"
          :key="user.id"
        >
          <Panel title="Edit Profile">
            <form method="post" @submit.prevent="edit(user)">
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <label for="email">Webmail</label>
                  <input
                    type="email"
                    class="form-control"
                    :value="user.webmail"
                    @input="
                      setEditEmail({ user, webmail: $event.target.value })
                    "
                    required
                  />
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <label for="unit">Unit</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="user.unit"
                    @input="setEditUnit({ user, unit: $event.target.value })"
                    required
                  />
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <label for="head">Head of Unit</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="user.head"
                    @input="setEditHead({ user, head: $event.target.value })"
                    required
                  />
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <label for="assistant">Assistant of Unit</label>
                  <input
                    type="text"
                    class="form-control"
                    :value="user.assistant"
                    @input="
                      setEditAssistant({ user, assistant: $event.target.value })
                    "
                    required
                  />
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="invalidCheck"
                        required
                      />
                      <label class="form-check-label" for="invalidCheck">
                        Confirm the changes
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <button class="btn btn-primary" type="submit">
                    Edit
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
import router from "../router";
export default {
  mounted() {
    if (!this.isLoggedIn) {
      return router.push("/login");
    }
  },
  computed: {
    ...mapState("authentication", ["user"]),
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  methods: {
    ...mapMutations("authentication", [
      "setEditEmail",
      "setEditPassword",
      "setEditConPassword",
      "setEditUnit",
      "setEditHead",
      "setEditAssistant"
    ]),
    ...mapActions("authentication", ["edit"])
  }
};
</script>

<style></style>
