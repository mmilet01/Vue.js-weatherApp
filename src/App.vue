<template>
  <div id="app" class="app">
    <div class="navv">
      <Navbar/>
    </div>
    <div class="view">
      <router-view/>
    </div>
    <div class="footer">
      <Footer/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default Vue.extend({
  components: {
    Navbar,
    Footer
  }
});
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
}

button {
  background-color: dodgerblue; /* Green */
  border: none;
  color: white;
  padding: 5px 10px;
  margin-bottom: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

a {
  font-weight: bold;
  color: #2c3e50;
}

a.router-link-exact-active {
  color: blue;
}
.navv {
  position: fixed;
  width: 100%;
  z-index: 1;
  margin: 0;
}
.view {
  height: 100%;
  position: relative;
  padding-top: 150px;
}
.app {
  display: flex;
  flex-direction: column;
}
.footer {
}
</style>
