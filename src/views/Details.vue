<template>
  <div>
    <h1>Current weather</h1>
    <CityDetails v-if="!!cityDetails" v-bind:cityWeather="cityDetails" />
    <CityForecast v-bind:cityForecast="forecastArray" v-bind:cityName="cityName" />
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

@Component({
  components: {
    CityForecast,
    CityDetails,
  },
})
export default class Details extends Vue {
  cityName: string;
  cityDetails: IWeather | null = null;

  forecastArray: IForecastArray[] = [];

  created() {
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });
    const id: any = this.$route.params.id;

    requests.Weather.forecast(id).then((res) => {
      this.forecastArray = res.forecast;
      this.cityName = res.cityName;
      loader.hide();
    });

    requests.Weather.cityById(id)
      .then((res) => {
        loader.hide();
        this.cityDetails = res;
      })
      .catch((err) => {
        console.log("Errors", err);
        loader.hide();
      });
  }
}
</script>

<style scoped>
h1 {
  color: dodgerblue;
}
</style>
