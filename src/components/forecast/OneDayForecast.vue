<template>
  <div>
    <h2>{{date.day}} - {{date.date}}.{{date.month}}</h2>
    <div class="forecast">
      <HourlyForecast v-for="city in forecastData" v-bind:key="city.hour" v-bind:city="city" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import HourlyForecast from "@/components/forecast/HourlyForecast.vue";
import { IForecastArray } from "../../Interfaces/ForecastArrayInterface";
import { IForecast } from "../../Interfaces/ForecastInterface";
import { IDate } from "@/Interfaces/DateInterface";

@Component({
  components: {
    HourlyForecast,
  },
})
export default class Details extends Vue {
  @Prop() week: IForecastArray;
  forecastData: IForecast[];
  date: IDate;
  created() {
    this.forecastData = this.week.forecastData;
    this.date = this.week.date;
    if (+this.date.month < 10 && this.date.month.length < 2) {
      this.date.month = "0" + this.date.month;
    }
  }
}
</script>

<style scoped>
h2 {
  color: dodgerblue;
}
.forecast {
  display: flex;
  justify-content: flex-start;
  margin: auto;
}
@media only screen and (max-width: 700px) {
}
</style>
