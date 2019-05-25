<template>
  <div>
    <p>{{hour}}h</p>
    <div>
      <div>
        <img v-bind:src="iconURL">
        <p>{{city.weather[0].main}}</p>
        <p>{{city.weather[0].description}}</p>
      </div>
      <p>{{city.main.temp}} C</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  //all compoennt options are allowed in here
})
export default class CityForecast extends Vue {
  @Prop() city!: any;

  iconURL: String = "";
  windDirection: String = "";
  hour: String = "";

  created() {
    /*     console.log(this.city);
     */ this.getIcon();
    this.getWindDirection();
  }

  getIcon() {
    this.iconURL = `http://openweathermap.org/img/w/${
      this.city.weather[0].icon
    }.png`;
    this.hour = this.city.dt_txt.slice(11);
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

<style scoped>
</style>
