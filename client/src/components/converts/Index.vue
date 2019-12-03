<template>
  <div class="converts">
    <Stats></Stats>
    <List></List>
  </div>
</template>

<script>
import Stats from "@/components/converts/Stats";
import List from "@/components/converts/List";
export default {
  name: "Converts",
  components: {
    List,
    Stats
  },
};
</script>

<style></style>
