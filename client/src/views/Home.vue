<template>
  <div class="dashboard-influence">
    <div class="container-fluid dashboard-content">
      <div class="row">
        <addConvert></addConvert>
        <display></display>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import addConvert from "@/components/converts/AddConvert";
import display from "@/components/converts/Display";
import instance from "../http";
import router from "../router";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "home",
  components: {
    addConvert,
    display
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push("/login");
    } else {
      this.index();
    }
    if(this.user[0].unit != "Hospitality") {
      return router.push("/dashboard")
    }
  },
  computed: {
    ...mapState("authentication", ["user"]),
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  methods: {
    ...mapActions("authentication", ["index"])
  }
};
</script>
