<template>
  <div class="row">
    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
      <div class="card">
        <h5 class="card-header">Spiritual Stats</h5>
        <div class="card-body">
          <div id="status_donut" style="height: 230px;"></div>
        </div>
      </div>
    </div>
    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
      <div class="card">
        <h5 class="card-header">Spiritual Status</h5>
        <div class="card-body">
          <div class="mb-3">
            <div class="d-inline-block">
              <h4 class="mb-0">Re-Dedication</h4>
            </div>
            <div class="progress mt-2 float-right progress-md">
              <div
                v-if="rededicated == 'NaN'"
                class="progress-bar bg-danger"
                role="progressbar"
                style="width: 1%"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <span style="color: #000;">1%</span>
              </div>
              <div
                v-if="rededicated !== 'NaN'"
                class="progress-bar bg-danger"
                role="progressbar"
                :style="[
                  rededicated ? { width: rededicated + '%' } : { width: '0%' }
                ]"
                :aria-valuenow="rededicated"
                aria-valuemin="0"
                :aria-valuemax="pcent"
              >
                <span style="color: #000;">{{ rededicated }}%</span>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <div class="d-inline-block">
              <h4 class="mb-0">New Convert</h4>
            </div>
            <div class="progress mt-2 float-right progress-md">
              <div
                v-if="newlyConverted == 'NaN'"
                class="progress-bar bg-warning"
                role="progressbar"
                style="width: 1%"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <span style="color: #000;">1%</span>
              </div>
              <div
                v-if="newlyConverted != 'NaN'"
                class="progress-bar bg-warning"
                role="progressbar"
                :style="[
                  newlyConverted
                    ? { width: newlyConverted + '%' }
                    : { width: '0%' }
                ]"
                :aria-valuenow="newlyConverted"
                aria-valuemin="0"
                :aria-valuemax="pcent"
              >
                <span style="color: #000;">{{ newlyConverted }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Percentage",
  methods: {
    sync() {
      $(document).ready(() => {
        if (this.rededicated != "NaN" && this.newlyConverted != "NaN") {
          Morris.Donut({
            element: "status_donut",
            data: [
              { value: this.newlyConverted, label: "Newly Converted" },
              { value: this.rededicated, label: "Re-dedicated" }
            ],

            labelColor: "#000",
            colors: ["#ffc108", "#ef172c"],

            formatter: function(x) {
              return x + "%";
            }
          });
        } else {
          Morris.Donut({
            element: "status_donut",
            data: [
              { value: 1, label: "Newly Converted" },
              { value: 1, label: "Re-dedicated" }
            ],

            labelColor: "#000",
            colors: ["#ffc108", "#ef172c"],

            formatter: function(x) {
              return x + "%";
            }
          });
        }
      });
    }
  },
  watch: {
    $route: "sync"
  },
  created() {
    this.sync();
  },
  computed: {
    ...mapState("converts", ["rededicated", "newlyConverted", "pcent"])
  }
};
</script>

<style></style>
