<template>
  <div class="dashboard-influence">
    <div class="container-fluid dashboard-content">
      <Header></Header>
      <converts></converts>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import Header from "@/components/converts/Header";
import converts from "@/components/converts/Index";
import instance from "../http";
import router from "../router";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "home",
  components: {
    Header,
    converts
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push("/login");
    } else {
      this.index(),
        this.total(),
        this.rededicated(),
        this.newlyConverted(),
        this.getYear(),
        this.getMonth(),
        this.getSemester(),
        this.getTotalPerYear(new Date().getFullYear()),
        this.getTotalPerMonth(new Date().getMonth() + 1),
        this.getTotalPerSemester("Alpha");
    }
  },
  computed: {
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  methods: {
    ...mapActions("converts", [
      "total",
      "rededicated",
      "newlyConverted",
      "getYear",
      "getMonth",
      "getSemester",
      "getTotalPerYear",
      "getTotalPerMonth",
      "getTotalPerSemester"
    ]),
    ...mapActions("authentication", ["index"])
  }
};
</script>
