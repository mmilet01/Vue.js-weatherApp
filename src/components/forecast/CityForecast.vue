<template>
  <div class="wrapper">
    <h1>{{cityName}} - 5 day forrecast</h1>
    <div>
      <div v-for="(week ,index) in cityForecast" v-bind:key="index" class="forecast">
        <OneDayForecast v-if="week.forecastData.length" v-bind:week="week" v-bind:index="index" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OneDayForecast from "@/components/forecast/OneDayForecast.vue";
import { IForecastArray } from "../../Interfaces/ForecastArrayInterface";

@Component({
  components: {
    OneDayForecast
  }
})
export default class CityForecast extends Vue {
  @Prop() cityForecast: IForecastArray;
  @Prop() cityName: string;
}
</script>

<style scoped>
.wrapper {
  border: none;
  border-top: 1px solid blue;
}
.forecast {
  margin-top: 50px;
}
</style>
