<template>
  <div>
    <form v-on:submit.prevent="getCity">
      <input type="text" placeholder="Search Cities" v-model="city" class="input" />
      <input type="submit" class="button" value="Search" />
    </form>

    <div v-if="!!cityData">
      <CityDetails v-bind:cityWeather="cityData" v-bind:key="cityData.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
const constants = require("../assets/constants.json");
import axios from "axios";
import CityDetails from "@/components/CityDetails.vue";
import { IWeather } from "@/Interfaces/WeatherInterface";
import requests from "@/api/requests";

@Component({
  components: {
    CityDetails,
  },
})
export default class SearchInput extends Vue {
  city: string = "";
  cityData: IWeather | null = null;

  getCity() {
    requests.Weather.cityByName(this.city)
      .then((res: IWeather) => {
        this.cityData = res;
        this.city = "";
      })
      .catch((err) => {
        alert("No city with that name. Check spelling and try again.");
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
