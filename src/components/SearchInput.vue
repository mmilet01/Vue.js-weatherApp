<template>
  <div>
    <form v-on:submit="getCity">
      <input type="text" placeholder="city" v-model="city">
      <input type="submit">
    </form>
    <!--     <button v-on:click="getCity">Search</button>
    -->
    <div v-if="!!cityData">
      <SingleCity v-bind:city="cityData"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
const constants = require("../assets/constants.json");
import axios from "axios";
import SingleCity from "@/components/SingleCity.vue";

@Component({
  //all compoennt options are allowed in here
  components: {
    SingleCity
  }
})
export default class SearchInput extends Vue {
  city: string = "";
  cityData: any = null;

  getCity() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${
          this.city
        }&units=metric&APPID=${constants.API_KEY}`
      )
      .then(res => {
        this.cityData = res.data;
        this.city = "";
      })
      .catch(err => console.log("Errors", err));
  }
}
</script>

<style scoped>
</style>
