<template>
  <div v-if="!!this.weather.length">
    <CityDetails
      class="bColor"
      v-for="(city,index) in weather"
      v-bind:class="{'backColor': index % 2 === 0}"
      v-bind:key="city.id"
      v-bind:cityWeather="city"
      v-on:my-event="doSomething"
    />
  </div>
  <div v-else>
    <h1>Nothing saved yet</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CityDetails from "@/components/CityDetails.vue"; // @ is an alias to /src
import { IWeather } from "@/Interfaces/WeatherInterface";
import requests from "../api/requests";

@Component({
  components: {
    CityDetails,
  },
})
export default class Home extends Vue {
  ids: Array<number>;
  weather: IWeather[] = [];

  created() {
    this.ids = JSON.parse(localStorage.getItem("ids")!);
    if (this.ids !== null) {
      this.ids.forEach((id: any) => {
        requests.Weather.cityById(id).then((res) => {
          this.weather.push(res);
        });
      });
    }
  }
}
</script>


<style scoped>
.bColor {
  background-color: lightblue;
}
.backColor {
  background-color: white;
}
</style>