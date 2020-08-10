

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
import { Weather } from "@/Interfaces/WeatherInterface";
const constants = require("../assets/constants.json");

@Component({
  components: {
    CityWeather,
    SearchInput
  }
})
export default class Home extends Vue {
  url: string = `http://api.openweathermap.org/data/2.5/find?lat=45.1&lon=15.20&cnt=10&units=metric&APPID=${constants.API_KEY}`;
  weather: Weather[] = [];

  created() {
    axios
      .get(this.url)
      .then(res => {
        res.data.list.forEach((city: any) => {
          let cityWeather: Weather = {
            id: city.id,
            temperature: Math.round(city.main.temp),
            wind_speed: city.wind.speed,
            details: city.weather[0].description,
            humidity: city.main.pressure,
            pressure: city.main.humidity,
            description: city.weather[0].main,
            name: city.name,
            icon: `http://openweathermap.org/img/w/${city.weather[0].icon}.png`,
            wind_direction: this.getWindDirection(city.wind.deg)
          };
          this.weather.push(cityWeather);
        });
      })
      .catch(err => {
        console.log("Errors", err);
      });
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
