<template>
  <div>
    <form v-on:submit.prevent="getCity">
      <input type="text" placeholder="Search Cities" v-model="city" class="input">
      <input type="submit" class="button" value="Search">
    </form>

    <div v-if="!!cityData">
      <SingleCity v-bind:city="cityData" :key="componentKey"/>
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
  componentKey: number = 0;

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
        this.componentKey += 1;
      })
      .catch(err => {
        alert(`There is no city with a name: ${this.city}`);
        console.log("Errors", err);
        this.city = "";
      });
  }
}
</script>

<style scoped>
.input {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: none;
  border: none;
  font-size: 26px;
  border-bottom: 2px solid dodgerblue;
  color: dodgerblue;
  margin-bottom: 15px;
}
.input::placeholder {
  color: dodgerblue;
}
.button {
  background-color: dodgerblue; /* Green */
  border: none;
  color: white;
  padding: 5px 10px;
  margin-bottom: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
}
</style>
