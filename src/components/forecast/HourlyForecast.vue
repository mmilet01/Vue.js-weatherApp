<template>
  <div class="hourly">
    <p>{{forecast.hour}}h</p>
    <div class="weather">
      <div class="desc">
        <div>
          <img v-bind:src="forecast.icon" />
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
import { IForecast } from "../../Interfaces/ForecastInterface";

@Component({})
export default class CityForecast extends Vue {
  forecast: IForecast = {} as any;

  @Prop() city!: any;

  created() {
    this.prepareData();
  }
  prepareData() {
    this.forecast.icon = this.city.icon;
    this.forecast.hour = this.city.hour;
    this.forecast.temperature = this.city.temperature;
    this.forecast.description = this.city.description;
    this.forecast.details = this.city.details;
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
