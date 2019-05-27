<template>
  <div class="parent">
    <header class="header">
      <div class="logo">
        <i class="fas fa-umbrella fa-3x"></i>
      </div>
      <div class="middle">
        <h1>WeatherApp</h1>
        <div class="nav">
          <router-link class="link" to="/">Home</router-link>
          <span>|</span>
          <router-link class="link" to="/random">Random</router-link>
        </div>
      </div>
      <div class="logo">
        <i class="fas fa-umbrella fa-3x"></i>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  //all compoennt options are allowed in here
})
export default class Navbar extends Vue {}
</script>

<style scoped>
.parent {
}
h1 {
  margin: 0;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: rgb(36, 163, 206);
  padding-bottom: 35px;
}
img {
  width: 40px;
  height: 40px;
}
.link {
  font-size: 30px;
}
.nav {
  margin-top: 10px;
}
.middle h1 {
  font-size: 54px;
}
span {
  font-size: 30px;
  padding: 5px;
}
</style>
