<template>
  <div class="about">
    <div class="nav">
      <h1>
        Weather in a
        <button v-on:click="randomCity">Random</button> city
      </h1>
    </div>
    <div v-if="city">
      <CityDetails v-bind:cityWeather="city" />
    </div>
    <div class="right">
      <h1>Not the city you want?</h1>
      <SearchInput />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchInput from "@/components/SearchInput.vue";
import RandomCity from "@/components/RandomCity.vue";
import CityDetails from "@/components/CityDetails.vue";

let cities: Array<any> = require("../assets/city.list.json");
const constants = require("../assets/constants.json");
import axios from "axios";
import { IWeather } from "@/Interfaces/WeatherInterface";

@Component({
  components: {
    SearchInput,
    CityDetails,
  },
})
export default class Random extends Vue {
  city: any = null;
  componentKey: number = 0;
  created() {
    this.randomCity();
  }

  randomCity() {
    const key = constants.API_KEY;
    let number = Math.floor(Math.random() * cities.length + 1);
    let cityID: number = cities[number].id;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&APPID=${key}`
      )
      .then((res) => {
        console.log("inside randomcity", res);
        let cityWeather: IWeather = {
          id: res.data.id,
          temperature: Math.round(res.data.main.temp),
          wind_speed: res.data.wind.speed,
          details: res.data.weather[0].description,
          humidity: res.data.main.pressure,
          pressure: res.data.main.humidity,
          description: res.data.weather[0].main,
          name: res.data.name,
          icon: `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`,
          wind_direction: this.getWindDirection(res.data.wind.deg),
        };
        this.city = cityWeather;
        this.componentKey += 1;
      })
      .catch((err) => console.log("Errors", err));
  }

  getWindDirection(windDeg: number) {
    if (windDeg >= 22.5 && windDeg <= 67.5) {
      return "NE";
    } else if (windDeg >= 67.5 && windDeg <= 112.5) {
      return "N";
    } else if (windDeg >= 112.5 && windDeg <= 157.5) {
      return "NW";
    } else if (windDeg >= 157.5 && windDeg <= 202.5) {
      return "W";
    } else if (windDeg >= 202.5 && windDeg <= 247.5) {
      return "SW";
    } else if (windDeg >= 247.5 && windDeg <= 292.5) {
      return "S";
    } else if (windDeg >= 292.5 && windDeg <= 337.5) {
      return "SE";
    } else {
      return "E";
    }
  }
}
</script>

<style scoped>
.nav {
  border-bottom: 4px solid dodgerblue;
  color: dodgerblue;
}
.right h1 {
  border-top: 2px solid dodgerblue;
  padding-top: 10px;
  color: dodgerblue;
}
button {
  margin: 5px;
  box-shadow: 2;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
}
</style>