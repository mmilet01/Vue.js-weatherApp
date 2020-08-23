<template>
  <CityWeather v-if="weather.length" v-bind:weather="weather"/>
  <div v-else>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CityWeather from "@/components/CityWeather.vue"; // @ is an alias to /src
import SearchInput from "@/components/SearchInput.vue";
import { IWeather } from "@/Interfaces/WeatherInterface";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import requests from "../api/requests";

@Component({
  components: {
    CityWeather,
    SearchInput,
    Loading
  }
})
export default class Home extends Vue {
  weather: IWeather[] = [];
  isLoading: boolean;

  created() {
    this.isLoading = true;
    requests.Weather.list()
      .then((res: IWeather[]) => {
        this.weather = res;
        this.isLoading = false;
      })
      .catch(err => {
        this.isLoading = false;
        alert("Errors");
      });
  }
}
</script>
