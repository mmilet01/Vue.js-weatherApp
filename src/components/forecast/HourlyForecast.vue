<template>
  <div class="hourly">
    <p>{{city.hour}}h</p>
    <div class="weather">
      <div class="desc">
        <div>
          <img v-bind:src="city.icon" />
        </div>
        <h3>{{city.description}}</h3>
        <p>{{city.details}}</p>
      </div>
      <p class="temp">{{city.temperature}} °C</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IForecast } from "../../Interfaces/ForecastInterface";

@Component({})
export default class CityForecast extends Vue {
  @Prop() city: IForecast;
}
</script>

<style scoped>
.hourly {
  border: 1px solid dodgerblue;
  width: 12.5%;
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
