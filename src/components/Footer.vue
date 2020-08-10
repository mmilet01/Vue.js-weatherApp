<template>
  <footer>
    <div class="subscribe">
      <h1>Subscribe to WeatherApp</h1>
      <input type="text" placeholder="Enter e-mail">
    </div>
    <div class="follow">
      <h2>Follow us</h2>
      <div class="icons">
        <i class="fab fa-twitter fa-2x"/>
        <i class="fab fa-facebook-square fa-2x"/>
        <i class="fab fa-instagram fa-2x"/>
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  //all component options are allowed in here
})
export default class Navbar extends Vue {}
</script>

<style scoped>
footer {
  margin-top: 15px;
  height: 150px;
  background-color: rgb(36, 163, 206);
  display: flex;
  justify-content: space-around;
}
input {
  font-family: "Segoe UI", Tahoma, Verdana, sans-serif;
  background: none;
  border: none;
  font-size: 26px;
  border-bottom: 2px solid darkblue;
  color: darkblue;
  margin-bottom: 15px;
}
.follow {
  display: flex;
  flex-direction: column;
}
i {
  width: 50px;
  height: 30px;
  margin: 7px;
  cursor: pointer;
}
</style>
