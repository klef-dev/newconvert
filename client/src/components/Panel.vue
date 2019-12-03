<template>
  <div class="card">
    <h5 class="card-header">{{ title }}</h5>
    <div class="card-body">
      <slot>No slot content defined</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style></style>
