<template>
  <div>
    <h1>Current weather</h1>
    <CityDetails v-if="!!cityDetails" v-bind:cityWeather="cityDetails" />
    <CityForecast v-bind:cityForecast="forecastArray" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import CityForecast from "@/components/forecast/CityForecast.vue";
import CityDetails from "@/components/CityDetails.vue";
import { WeekDays } from "../Enums/Enums";
import { IForecast } from "../Interfaces/ForecastInterface";
import { IForecastArray } from "../Interfaces/ForecastArrayInterface";
import { IDate } from "../Interfaces/DateInterface";
import { Dictionary } from "vue-router/types/router";
const constants = require("../assets/constants.json");
import requests from "../api/requests";
import { IWeather } from "@/Interfaces/WeatherInterface";

@Component({
  components: {
    CityForecast,
    CityDetails,
  },
})
export default class Details extends Vue {
  key: string = constants.API_KEY;
  cityName: string;
  cityDetails: IWeather | null = null;

  forecastArray: IForecastArray[] = [];

  created() {
    const id: any = this.$route.params.id;

    requests.Weather.forecast(id).then((res: IForecastArray[]) => {
      this.forecastArray = res;
      console.log(res, "inside detaisl");
    });

    requests.Weather.cityById(id)
      .then((res) => {
        this.cityDetails = res;
      })
      .catch((err) => console.log("Errors", err));
  }
}
</script>

<style scoped>
h1 {
  color: dodgerblue;
}
</style>
