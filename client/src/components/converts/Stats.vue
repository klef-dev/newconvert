<template>
  <div class="stats">
    <div class="row">
      <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-inline-block">
              <h5 class="text-muted">Total Converts</h5>
              <h2 class="mb-0">{{ totalConverts }}</h2>
            </div>
            <div
              class="float-right icon-circle-medium  icon-box-lg  bg-info-light mt-1"
            >
              <i class="fa fa-eye fa-fw fa-sm text-info"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
        <div class="card">
          <select id="years" @input="getTotalPerYear($event.target.value)">
            <option value="">Select</option>
            <option :value="year.year" v-for="(year, i) in years" :key="i">
              {{ year.year }}
            </option>
          </select>
          <span id="tcpy">
            <div class="card-body" style="margin-bottom:-17px">
              <div class="d-inline-block">
                <h5 class="text-muted">(Year)</h5>

                <h2 class="mb-0">{{ tcpy }}</h2>
              </div>
              <div
                class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1"
              >
                <i class="fa fa-user fa-fw fa-sm text-primary"></i>
              </div>
            </div>
          </span>
        </div>
      </div>

      <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
        <div class="card">
          <select id="months" @input="getTotalPerMonth($event.target.value)">
            <option value="">Select</option>
            <option :value="month.month" v-for="(month, i) in months" :key="i">
              {{ strMonth(month.month) }}
            </option>
          </select>
          <span id="tcpm">
            <div class="card-body" style="margin-bottom:-17px">
              <div class="d-inline-block">
                <h5 class="text-muted">(Month)</h5>

                <h2 class="mb-0">{{ tcpm }}</h2>
              </div>
              <div
                class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1"
              >
                <i class="fa fa-user fa-fw fa-sm text-primary"></i>
              </div>
            </div>
          </span>
        </div>
      </div>

      <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
        <div class="card">
          <select
            id="semester"
            @input="getTotalPerSemester($event.target.value)"
          >
            <option value="">Select</option>
            <option
              :value="semester.semester"
              v-for="(semester, i) in semesters"
              :key="i"
            >
              {{ semester.semester }}
            </option>
          </select>
          <span id="tcps">
            <div class="card-body" style="margin-bottom:-17px">
              <div class="d-inline-block">
                <h5 class="text-muted">(Semester)</h5>

                <h2 class="mb-0">{{ tcps }}</h2>
              </div>
              <div
                class="float-right icon-circle-medium  icon-box-lg  bg-primary-light mt-1"
              >
                <i class="fa fa-user fa-fw fa-sm text-primary"></i>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
    <percentage></percentage>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import percentage from "@/components/converts/Percentage";
export default {
  name: "Stats",
  components: {
    percentage
  },
  computed: {
    ...mapState("converts", [
      "totalConverts",
      "years",
      "tcpy",
      "months",
      "tcpm",
      "semesters",
      "tcps"
    ]),
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  methods: {
    ...mapActions("converts", [
      "getTotalPerYear",
      "getTotalPerMonth",
      "getTotalPerSemester"
    ]),
    strMonth(get_month) {
      var month = "";
      switch (get_month) {
        case 1:
          month = "January";
          return month;
        case 2:
          month = "Febuary";
          return month;
        case 3:
          month = "March";
          return month;
        case 4:
          month = "April";
          return month;
        case 5:
          month = "May";
          return month;
        case 6:
          month = "June";
          return month;
        case 7:
          month = "July";
          return month;
        case 8:
          month = "August";
          return month;
        case 9:
          month = "September";
          return month;
        case 10:
          month = "October";
          return month;
        case 11:
          month = "November";
          return month;
        case 12:
          month = "December";
          return month;
        default:
          break;
      }
    }
  }
};
</script>

<style></style>
