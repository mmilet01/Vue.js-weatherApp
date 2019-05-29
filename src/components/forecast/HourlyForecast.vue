<template>
  <div class="hourly">
    <p>{{forecast.hour}}h</p>
    <div class="weather">
      <div class="desc">
        <div>
          <img v-bind:src="forecast.icon">
        </div>
        <h3>{{forecast.description}}</h3>
        <p>{{forecast.details}}</p>
      </div>
      <p class="temp">{{forecast.temperature}} °C</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ForecastInterface } from "../../ForecastInterface";

@Component({
  //all compoennt options are allowed in here
})
export default class CityForecast extends Vue {
  forecast: ForecastInterface = {};

  @Prop() city!: any;

  created() {
    this.prepareData();
  }
  prepareData() {
    this.forecast.icon = `http://openweathermap.org/img/w/${
      this.city.weather[0].icon
    }.png`;

    this.forecast.hour = this.city.dt_txt.slice(11);
    this.forecast.temperature = Math.round(this.city.main.temp);
    this.forecast.description = this.city.weather[0].main;
    this.forecast.details = this.city.weather[0].description;
  }
}
</script>

<style scoped>
.hourly {
  border: 1px solid dodgerblue;
}
.temp {
  color: rgb(224, 99, 99);
}
.weather {
  display: flex;
  flex-direction: column;
}
.desc {
  display: flex;
  flex-direction: column;
  height: 160px;
}
</style>
