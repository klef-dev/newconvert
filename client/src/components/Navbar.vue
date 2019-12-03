<template>
  <!-- navbar -->
  <!-- ============================================================== -->
  <div class="dashboard-header">
    <nav class="navbar navbar-expand-lg bg-white fixed-top">
      <router-link class="navbar-brand" to="/">
        <img
          src="/assets/images/logo.PNG"
          alt=""
          width="50"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse " id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto navbar-right-top">
          <router-link class="dropdown-item" to="/login" v-if="!isLoggedIn"
            ><i class="fas fa-cog mr-2"></i>Login</router-link
          >
          <!-- PROFILE NAVBAR -->
          <li class="nav-item dropdown nav-user" v-if="isLoggedIn">
            <a
              class="nav-link nav-user-img"
              href="#"
              id="navbarDropdownMenuLink2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              ><img
                :src="user[0].profilePic"
                alt=""
                class="user-avatar-md rounded-circle"
                style="width: auto;"
            /></a>
            <div
              class="dropdown-menu dropdown-menu-right nav-user-dropdown"
              aria-labelledby="navbarDropdownMenuLink2"
            >
              <div class="nav-user-info">
                <h5 class="mb-0 text-white nav-user-name">
                  {{ user[0].unit }}
                </h5>
              </div>
              <router-link class="dropdown-item" to="/dashboard"
                ><i class="fas fa-cog mr-2"></i>Dashboard</router-link
              >
              <router-link class="dropdown-item" to="/settings"
                ><i class="fas fa-cog mr-2"></i>Setting</router-link
              >
              <a class="dropdown-item" style="cursor:pointer" @click="logout()"
                ><i class="fas fa-power-off mr-2"></i>Logout</a
              >
            </div>
          </li>
          <!-- END OF PROFILE NAVBAR -->
        </ul>
      </div>
    </nav>
  </div>
  <!-- ============================================================== -->
  <!-- end navbar -->
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters("authentication", ["isLoggedIn"]),
    ...mapState("authentication", ["user"])
  },
  methods: {
    ...mapActions("authentication", ["logout"])
  }
};
</script>
