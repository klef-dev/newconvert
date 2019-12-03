<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="section-block">
        <h3 class="section-title">New Convert</h3>
      </div>
      <div class="card">
        <div class="table-responsive" style="font-size: smaller;">
          <table id="data-table-basic" class="table table-hover">
            <thead>
              <tr class="border-0">
                <th class="border-0">S/N</th>
                <th class="border-0">Name</th>
                <th class="border-0">Reg. Number</th>
                <th class="border-0">Webmail</th>
                <th class="border-0">Department</th>
                <th class="border-0">Hall/Room</th>
                <th class="border-0">Status</th>
                <th class="border-0">Baptized</th>
                <th class="border-0">Holy Ghost Filled</th>
                <th class="border-0">Semester</th>
                <th class="border-0">Date</th>
              </tr>
            </thead>
            <tbody
              v-for="(newConvert, index) in newConverts"
              :key="newConvert.id"
            >
              <tr
                data-toggle="tooltip"
                :title="newConvert.timeago"
                style="cursor:pointer"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ newConvert.name }}</td>
                <td>{{ newConvert.reg_no }}</td>
                <td>{{ newConvert.webmail }}</td>
                <td>{{ newConvert.programme }}</td>
                <td>{{ newConvert.hall }}/{{ newConvert.room }}</td>
                <td>{{ newConvert.spiritual }}</td>
                <td>{{ newConvert.water }}</td>
                <td>{{ newConvert.holy }}</td>
                <td>{{ newConvert.semester }}</td>
                <td data-toggle="tooltip" :title="newConvert.date">
                  {{ newConvert.created_at }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "NewConvertsList",
  mounted() {
    if (this.isLoggedIn) {
      this.index();
    }
  },
  computed: {
    ...mapState("converts", ["newConverts"]),
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  methods: {
    ...mapActions("converts", ["index"]),
    sync() {
      $(document).ready(() => {
        $('[data-toggle="tooltip"]').tooltip();
      });
    }
  },
  watch: {
    $route: "sync"
  },
  created() {
    this.sync();
  }
};
</script>

<style></style>
