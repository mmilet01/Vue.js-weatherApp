<template>
  <div class="container">
    <h1 class="name">{{weather.name}}</h1>

    <div class="temp">
      <i class="fas fa-thermometer-half fa-2x"></i>
      <h1>{{weather.temperature}} °C</h1>
    </div>

    <div class="weather">
      <img v-bind:src="weather.icon">
      <h3>{{weather.description}}</h3>
      <p>{{weather.details}}</p>
    </div>

    <div class="description">
      <p>Humidity: {{weather.humidity}}%</p>
      <p>Pressure: {{weather.pressure}} hPa</p>
      <p>Wind: {{weather.wind_speed}}m/s {{weather.windDirection}}</p>
      <button class="link">
        <router-link class="link" v-bind:to="routeURL">Forecast</router-link>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { WeatherInterface } from "../WeatherDataInterface";

@Component({
  //all compoennt options are allowed in here
})
export default class CityWeather extends Vue {
  //data + methods
  weather: WeatherInterface = {};
  routeURL: string = "";

  @Prop() city!: any;

  created() {
    this.routeURL = "/city/" + this.city.id;
    this.prepareData();
    this.getIcon();
    this.getWindDirection();
  }
  prepareData() {
    this.weather.temperature = Math.round(this.city.main.temp);
    this.weather.wind_speed = this.city.wind.speed;
    this.weather.details = this.city.weather[0].description;
    this.weather.humidity = this.city.main.pressure;
    this.weather.pressure = this.city.main.humidity;
    this.weather.description = this.city.weather[0].main;
    this.weather.name = this.city.name;
  }

  beforeUpdate() {
    this.getIcon();
    this.getWindDirection();
  }
  getIcon() {
    this.weather.icon = `http://openweathermap.org/img/w/${
      this.city.weather[0].icon
    }.png`;
  }
  getWindDirection() {
    let deg: number = this.city.wind.deg;
    if (deg >= 22.5 && deg <= 67.5) {
      this.weather.wind_direction = "NE";
    } else if (deg >= 67.5 && deg <= 112.5) {
      this.weather.wind_direction = "N";
    } else if (deg >= 112.5 && deg <= 157.5) {
      this.weather.wind_direction = "NW";
    } else if (deg >= 157.5 && deg <= 202.5) {
      this.weather.wind_direction = "W";
    } else if (deg >= 202.5 && deg <= 247.5) {
      this.weather.wind_direction = "SW";
    } else if (deg >= 247.5 && deg <= 292.5) {
      this.weather.wind_direction = "S";
    } else if (deg >= 292.5 && deg <= 337.5) {
      this.weather.wind_direction = "SE";
    } else {
      this.weather.wind_direction = "E";
    }
  }
}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  .description {
    margin: auto;
  }
}
</style>

