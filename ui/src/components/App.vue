<template>
  <div class="container" id="app">
    <div class="banner text-center">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<!-- Global CSS -->
<style>

:root{
  --background-color : linear-gradient(to left, dodgerblue, #345);
  --color : white;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

</style>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>

#app {
  margin-top: 20vh;
}

.banner {
  min-height: 300px;
  padding: 50px 10px;
  background: var(--background-color);
  color : var(--color);
  position: relative;
}

</style>
