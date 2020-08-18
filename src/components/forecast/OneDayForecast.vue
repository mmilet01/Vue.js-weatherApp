<template>
  <div>
    <h2>{{date.day}} - {{date.date}}.{{date.month}}</h2>
    <div class="forecast">
      <div v-for="city in forecastData" v-bind:key="city.hour" class="forecast2">
        <HourlyForecast v-bind:city="city" />
      </div>
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
    if (+this.date.month < 10) {
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
  flex-wrap: wrap;
}
.forecast2 {
  width: 12.5%;
}
@media only screen and (max-width: 700px) {
  .forecast2 {
    width: 150px;
  }
}
</style>
