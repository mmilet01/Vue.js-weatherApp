<template>
  <div class="container">
    <div>
      <h1>{{city.name}}</h1>
      <p>{{currentTime}}h CEST</p>
    </div>

    <div>
      <h1>{{city.main.temp}} °C</h1>
      <p>{{city.main.temp_min}}°C - {{city.main.temp_max}}°C</p>
    </div>

    <div>
      <img v-bind:src="iconURL">
      <h3>{{city.weather[0].main}}</h3>
      <p>{{city.weather[0].description}}</p>
    </div>

    <div>
      <p>Humidity: {{city.main.humidity}}%</p>
      <p>Pressure: {{city.main.pressure}} hPa</p>
      <p>Wind: {{city.wind.speed}}m/s {{windDirection}}</p>
      <button class="link">
        <router-link class="link" v-bind:to="routeURL">Details</router-link>
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

  @Prop() city!: any;

  created() {
    console.log(this.city);
    this.getIcon();
    this.getWindDirection();
    this.routeURL = "/city/" + this.city.id;
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
.link {
  margin-top: 30px;
  text-decoration: none;
}
.container {
  /* 
  display: flex;
  justify-content: space-between; */
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
</style>