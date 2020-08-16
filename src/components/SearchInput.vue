<template>
  <div>
    <form v-on:submit.prevent="getCity">
      <input type="text" placeholder="Search Cities" v-model="city" class="input" />
      <input type="submit" class="button" value="Search" />
    </form>

    <div v-if="!!cityData">
      <CityDetails v-bind:cityWeather="cityData" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
const constants = require("../assets/constants.json");
import axios from "axios";
import SingleCity from "@/components/SingleCity.vue";
import CityDetails from "@/components/CityDetails.vue";
import { IWeather } from "@/Interfaces/WeatherInterface";

@Component({
  components: {
    SingleCity,
    CityDetails,
  },
})
export default class SearchInput extends Vue {
  city: string = "";
  cityData: any = null;
  componentKey: number = 0;

  getCity() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=${constants.API_KEY}`
      )
      .then((res) => {
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
        this.cityData = cityWeather;
        this.city = "";
        this.componentKey += 1;
      })
      .catch((err) => {
        alert(`There is no city with a name: ${this.city}`);
        console.log("Errors", err);
        this.city = "";
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
