<template>
  <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
    <Panel title="Recently Added">
      <div v-if="newlyAdded.length > 0">
        <ol>
          <li v-for="(newlyAdded, i) in newlyAdded" :key="i">
            {{ newlyAdded.name }}
          </li>
        </ol>
      </div>
    </Panel>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("converts", ["newlyAdded"])
  }
};
</script>

<style></style>
