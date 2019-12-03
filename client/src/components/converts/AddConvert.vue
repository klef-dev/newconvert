<template>
  <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
    <Panel title="Add a convert">
      <form method="post" @submit.prevent="create">
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
            <label for="reg_no">Reg No.</label>
            <input
              type="text"
              class="form-control"
              @input="setRegNo($event.target.value)"
              placeholder="Enter reg. no"
              :value="reg_no"
              required
              maxlength="7"
            />
          </div>
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
            <label for="reg_no">Spiritual Status:</label>
            <select
              @input="setSpiritual($event.target.value)"
              class="form-control"
              required
            >
              <option value="">Select</option>
              <option value="New Convert">New Convert</option>
              <option value="Re-dedication">Re-dedication</option>
            </select>
          </div>
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
            <label for="reg_no">Water Baptized:</label>
            <select
              @input="setWater($event.target.value)"
              class="form-control"
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
            <label for="reg_no"
              >Are you filled with the spirit with the evidence of speaking in
              tounges?:</label
            >
            <select
              @input="setHoly($event.target.value)"
              class="form-control"
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
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
                  Confirm the fields
                </label>
              </div>
            </div>
          </div>
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
            <button class="btn btn-primary" type="submit">
              Submit form
            </button>
          </div>
        </div>
      </form>
    </Panel>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("converts", ["reg_no"])
  },
  methods: {
    ...mapMutations("converts", [
      "setRegNo",
      "setSpiritual",
      "setHoly",
      "setWater"
    ]),
    ...mapActions("converts", ["create"])
  }
};
</script>

<style></style>
