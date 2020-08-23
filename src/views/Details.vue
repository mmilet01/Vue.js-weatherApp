<template>
  <div v-if="cityDetails !== null">
    <h1>Current weather</h1>
    <CityDetails v-bind:cityWeather="cityDetails"/>
    <CityForecast v-bind:cityForecast="forecastArray" v-bind:cityName="cityName"/>
  </div>
  <div v-else>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CityForecast from "@/components/forecast/CityForecast.vue";
import CityDetails from "@/components/CityDetails.vue";
import { IForecast } from "../Interfaces/ForecastInterface";
import { IForecastArray } from "../Interfaces/ForecastArrayInterface";
import requests from "../api/requests";
import { IWeather } from "@/Interfaces/WeatherInterface";
import "vue-loading-overlay/dist/vue-loading.css";
import Loading from "vue-loading-overlay";

@Component({
  components: {
    CityForecast,
    CityDetails,
    Loading
  }
})
export default class Details extends Vue {
  cityName: string = "";
  cityDetails: IWeather | null = null;
  forecastArray: IForecastArray[] = [];
  isLoading: boolean;

  created() {
    this.isLoading = true;
    const id: any = this.$route.params.id;

    requests.Weather.forecast(id)
      .then(res => {
        this.forecastArray = res.forecast;
        this.cityName = res.cityName;
        this.isLoading = false;
      })
      .catch(err => {
        console.log("Errors", err);
        alert("Please try again later");
        this.isLoading = false;
      });

    requests.Weather.cityById(id)
      .then(res => {
        this.cityDetails = res;
        this.isLoading = false;
      })
      .catch(err => {
        console.log("Errors", err);
        this.isLoading = false;
      });
  }
}
</script>

<style scoped>
h1 {
  color: dodgerblue;
}
</style>
