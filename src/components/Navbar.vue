<template>
  <div class="container">
    <div class="parent">
      <header class="header">
        <div class="logo">
          <i class="fas fa-umbrella fa-3x"></i>
        </div>
        <div class="middle">
          <h1>WeatherApp</h1>
        </div>
        <div class="logo">
          <i class="fas fa-umbrella fa-3x"></i>
        </div>
      </header>
    </div>
    <div class="nav">
      <router-link class="link" to="/">Home</router-link>
      <span>|</span>
      <router-link class="link" to="/random">Random</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Navbar extends Vue {}
</script>

<style scoped>
.container {
  background-color: rgb(36, 163, 206);
}
.parent {
  flex: 0 0 auto;
}
h1 {
  margin: 0;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  padding-bottom: 0;
  flex: 0 0 auto;
}
img {
  width: 40px;
  height: 40px;
}
.link {
  font-size: 30px;
}
.nav {
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  padding-bottom: 10px;
  margin-left: auto;
}
.middle h1 {
  color: rgb(35, 0, 0);
  font-size: 48px;
}
span {
  font-size: 30px;
  padding: 5px;
}
</style>
