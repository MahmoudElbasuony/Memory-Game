<template>
  <div class="loader">
    <i class="fas fa-spinner fa-pulse"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "loader",
  components: {},
  props: []
};
</script>

<style scoped>
.loader {
  position: absolute;
  font-size: 5em;
  margin: auto;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
</style>
