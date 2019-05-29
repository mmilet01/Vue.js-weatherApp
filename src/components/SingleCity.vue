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

    <div class="sun">
      <p>SUNRISE: {{weather.sunrise}}</p>
      <i class="fas fa-sun fa-2x"></i>
      <p>SUNSET: {{weather.sunset}}</p>
    </div>

    <div class="description">
      <p>Humidity: {{weather.humidity}}%</p>
      <p>Pressure: {{weather.pressure}} hPa</p>
      <p>Wind: {{weather.wind_speed}}m/s {{weather.wind_direction}}</p>
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

  @Prop() city!: any;

  created() {
    this.getIcon();
    this.getWindDirection();
    this.sunrise_sunset();
    this.prepareData();
  }

  sunrise_sunset() {
    let sunriseUnix = new Date(this.city.sys.sunrise * 1000);
    let sunsetUnix = new Date(this.city.sys.sunset * 1000);
    this.weather.sunrise =
      sunriseUnix.getHours() + ":" + sunriseUnix.getMinutes();
    this.weather.sunset = sunsetUnix.getHours() + ":" + sunsetUnix.getMinutes();
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
.container {
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
.temp {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.temp h1 {
  margin-left: 8px;
}

img {
  width: 55px;
  height: 55px;
  padding: 0;
  margin: 0;
}
h1 {
  padding: 0;
  margin: 0;
}
p {
  margin: 3px;
  padding: 5px;
}
.name {
  align-self: center;
  padding: 0;
  font-weight: bold;
  font-size: 42px;
  margin: auto;
}
.sun,
.description {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
@media only screen and (max-width: 700px) {
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .weather,
  .name,
  .description,
  .temp {
    margin-right: 5%;
  }
  p {
    font-weight: bold;
  }
}
</style>
