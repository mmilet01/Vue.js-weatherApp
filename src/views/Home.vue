<template>
  <div class="home">
    <CityWeather v-bind:weather="weather" msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CityWeather from "@/components/CityWeather.vue"; // @ is an alias to /src
import SearchInput from "@/components/SearchInput.vue";
import axios from "axios";
import { IWeather } from "@/Interfaces/WeatherInterface";
/* import Loading from "vue-loading-overlay";
 */ const Loading = require("vue-loading-overlay");
import "vue-loading-overlay/dist/vue-loading.css";
const constants = require("../assets/constants.json");
import requests from "../api/requests";

@Component({
  components: {
    CityWeather,
    SearchInput,
  },
})
export default class Home extends Vue {
  weather: IWeather[] = [];

  created() {
    /* let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    }); */

    requests.Weather.list()
      .then((res: IWeather[]) => {
        this.weather = res;
      })
      .catch((err) => {
        alert("Errors");
      });
  }
}
</script>
