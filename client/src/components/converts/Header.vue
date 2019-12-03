<template>
  <div class="row">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
      <div class="card influencer-profile-data">
        <div class="card-body" v-if="user.length > 0">
          <div class="row">
            <div class="col-xl-2 col-lg-4 col-md-4 col-sm-4 col-12">
              <!-- PROFILE IMAGE MAIN -->
              <div class="text-center">
                <img
                  :src="user[0].profilePic"
                  alt="User Avatar"
                  class="rounded-circle user-avatar-xxl"
                  style="height: auto;"
                />
              </div>
              <!-- END OF PROFILE IMAGE MAIN -->
            </div>
            <div class="col-xl-10 col-lg-8 col-md-8 col-sm-8 col-12">
              <div class="user-avatar-info">
                <div class="m-b-20">
                  <div class="user-avatar-name">
                    <h2 class="mb-1">{{user[0].unit}} Unit</h2>
                  </div>
                  <div class="rating-star  d-inline-block"></div>
                </div>
                <div class="user-avatar-address">
                  <p class="border-bottom pb-3">
                    <span class="d-xl-inline-block d-block mb-2">
                      {{user[0].webmail}}
                    </span>
                    <span class="mb-2 ml-xl-4 d-xl-inline-block d-block"
                      >Head: {{user[0].head}}</span
                    >
                    <span class=" mb-2 d-xl-inline-block d-block ml-xl-4"
                      >Assistant Head: {{user[0].assistant}}</span
                    >
                  </p>
                </div>
                <span style="cursor:pointer" id="messageThem"
                  ><i class="fa fa-envelope"></i
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Header",
  computed: {
      ...mapState("authentication", ["user"])
  }
};
</script>

<style></style>
