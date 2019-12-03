<template>
  <!-- left sidebar -->
  <!-- ============================================================== -->
  <div class="nav-left-sidebar sidebar-dark" v-if="isLoggedIn">
    <div class="menu-list">
      <nav class="navbar navbar-expand-lg navbar-light">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav flex-column">
            <li class="nav-divider">Menu</li>
            <li class="nav-item ">
              <a
                class="nav-link active"
                href="#"
                data-toggle="collapse"
                aria-expanded="false"
                data-target="#submenu-1"
                aria-controls="submenu-1"
                ><i class="fa fa-fw fa-user-circle"></i
                ><span :value="user[0].unit">{{ user[0].unit }}</span>
                <span class="badge badge-success">6</span></a
              >
              <div id="submenu-1" class="collapse submenu">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <router-link class="nav-link" to="/dashboard"
                      >Dashboard</router-link
                    >
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/settings"
                      >Settings</router-link
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" style="cursor:pointer" @click="logout()"
                      >Logout</a
                    >
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
  <!-- ============================================================== -->
  <!-- end left sidebar -->
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters("authentication", ["isLoggedIn"]),
    ...mapState("authentication", ["user"])
  },
  methods: {
    ...mapActions("authentication", ["logout", "index"])
  }
};
</script>

<style></style>
