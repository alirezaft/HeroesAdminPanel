<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
import Users from './components/Queries/Users.vue'
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "sass/main";

body {
  height: 100%;
  #app {
    height: 100%;
  }
}
</style>
