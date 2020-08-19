<template>
  <div class="container" v-if="!!cityWeather">
    <h1 class="name">{{cityWeather.name}}</h1>

    <div class="temp">
      <i class="fas fa-thermometer-half fa-2x"></i>
      <h1>{{cityWeather.temperature}} °C</h1>
    </div>

    <div class="weather">
      <img v-bind:src="cityWeather.icon" />
      <h3>{{cityWeather.description}}</h3>
      <p>{{cityWeather.details}}</p>
    </div>

    <div class="description">
      <p>Humidity: {{cityWeather.humidity}}%</p>
      <p>Pressure: {{cityWeather.pressure}} hPa</p>
      <p>Wind: {{cityWeather.wind_speed}}m/s {{cityWeather.windDirection}}</p>
      <button class="link" v-if="shouldShowButton">
        <router-link class="link" v-bind:to="routeURL">Forecast</router-link>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IWeather } from "../Interfaces/WeatherInterface";

@Component({})
export default class CityWeather extends Vue {
  routeURL: string;
  shouldShowButton: boolean;

  @Prop() cityWeather: IWeather;

  created() {
    if (this.$route.name == "details") {
      this.shouldShowButton = false;
    } else {
      this.shouldShowButton = true;
    }
    this.routeURL = "/city/" + this.cityWeather.id;
  }
}
</script>

<style scoped>
.temp {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.temp h1 {
  margin-left: 8px;
}
.link {
  margin-top: 30px;
  text-decoration: none;
}
.container {
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 5px;
}
.name {
  align-self: center;
}
img {
  width: 55px;
  height: 55px;
  padding: 0;
  margin: 0;
}
h1 {
  padding: 0;
  font-weight: bold;
  font-size: 42px;
}
div {
  padding-top: 8px;
}
p {
  margin: 3px;
  padding: 5px;
}
.description {
  margin: auto;
}
@media only screen and (max-width: 700px) {
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .temp {
    margin: auto;
  }
  .name {
    margin: auto;
    margin-right: 10%;
  }
  .weather {
    margin: auto;
  }
}
</style>

