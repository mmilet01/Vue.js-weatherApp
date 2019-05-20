<template>
  <header class="header">
    <div class="logo">
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/random">Random</router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  //all compoennt options are allowed in here
})
export default class Navbar extends Vue {}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  padding: 10px;
  background-color: rgb(198, 232, 243);
}
img {
  width: 40px;
  height: 40px;
}
</style>
