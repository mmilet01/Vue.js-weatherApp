<template>
  <div class="container">
    <h1 class="name">{{city.name}}</h1>

    <div class="temp">
      <i class="fas fa-thermometer-half fa-2x"></i>
      <h1>{{temp}} °C</h1>
    </div>

    <div class="weather">
      <img v-bind:src="iconURL">
      <h3>{{city.weather[0].main}}</h3>
      <p>{{city.weather[0].description}}</p>
    </div>

    <div class="description">
      <p>Humidity: {{city.main.humidity}}%</p>
      <p>Pressure: {{city.main.pressure}} hPa</p>
      <p>Wind: {{city.wind.speed}}m/s {{windDirection}}</p>
      <button class="link">
        <router-link class="link" v-bind:to="routeURL">Forecast</router-link>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  //all compoennt options are allowed in here
})
export default class CityWeather extends Vue {
  //data + methods
  today: Date = new Date();
  currentTime: any = this.today.getHours() + ":" + this.today.getMinutes();
  iconURL: string = "";
  windDirection: string = "";
  routeURL: string = "";
  temp: any = null;

  @Prop() city!: any;

  created() {
    console.log(this.city);
    this.getIcon();
    this.getWindDirection();
    this.routeURL = "/city/" + this.city.id;
    this.temp = Math.round(this.city.main.temp);
  }
  beforeUpdate() {
    this.getIcon();
    this.getWindDirection();
  }
  getIcon() {
    this.iconURL = `http://openweathermap.org/img/w/${
      this.city.weather[0].icon
    }.png`;
  }
  getWindDirection() {
    let deg: number = this.city.wind.deg;
    if (deg >= 22.5 && deg <= 67.5) {
      this.windDirection = "NE";
    } else if (deg >= 67.5 && deg <= 112.5) {
      this.windDirection = "N";
    } else if (deg >= 112.5 && deg <= 157.5) {
      this.windDirection = "NW";
    } else if (deg >= 157.5 && deg <= 202.5) {
      this.windDirection = "W";
    } else if (deg >= 202.5 && deg <= 247.5) {
      this.windDirection = "SW";
    } else if (deg >= 247.5 && deg <= 292.5) {
      this.windDirection = "S";
    } else if (deg >= 292.5 && deg <= 337.5) {
      this.windDirection = "SE";
    } else {
      this.windDirection = "E";
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

