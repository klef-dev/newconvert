<template>
  <div id="app" class="dashboard-main-wrapper">
    <navbar></navbar>
    <sidebar></sidebar>
    <div class="dashboard-wrapper">
      <router-view />
      <Footer v-if="isLoggedIn"></Footer>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import navbar from "@/components/Navbar";
import sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
export default {
  components: {
    navbar,
    sidebar,
    Footer
  },
  computed: {
    ...mapGetters("authentication", ["isLoggedIn"])
  }
};
</script>
