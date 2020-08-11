<template>
  <div>
    <h1>Current weather</h1>

    <div v-if="!!city2">
      <SingleCity v-bind:city="city2" />
    </div>
    <div v-if="!!city">
      <CityForecast v-bind:city="city" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import SingleCity from "@/components/SingleCity.vue";
import CityForecast from "@/components/forecast/CityForecast.vue";
import { WeekDays } from "../Enums/Enums";
import { IForecast } from "../Interfaces/ForecastInterface";
import { Dictionary } from "vue-router/types/router";
const constants = require("../assets/constants.json");

@Component({
  components: {
    SingleCity,
    CityForecast
  }
})
export default class Details extends Vue {
  key: string = constants.API_KEY;
  city: any = null;
  city2: any = null;

  newDictionary: Map<string, Array<IForecast>> = new Map();

  forecastArray: Array<Record<string, Array<IForecast>>>;

  monday: Array<IForecast> = [];
  tuesday: Array<IForecast> = [];
  wednesday: Array<IForecast> = [];
  thursday: Array<IForecast> = [];
  friday: Array<IForecast> = [];
  saturday: Array<IForecast> = [];
  sunday: Array<IForecast> = [];

  convertEnumToString(day: WeekDays) {
    switch (day) {
      case WeekDays.Monday:
        return "Monday";
      case WeekDays.Tuesday:
        return "Tuesday";
      case WeekDays.Wednseday:
        return "Wednseday";
      case WeekDays.Thursday:
        return "Thursday";
      case WeekDays.Friday:
        return "Friday";
      case WeekDays.Saturday:
        return "Saturday";
      case WeekDays.Sunday:
        return "Sunday";

      // can return an array of strings - from first day to last one and then easyly iterate through them
    }
  }
  created() {
    let id: any = this.$route.params.id;

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&APPID=${this.key}`
      )
      .then(res => {
        console.log("details result", res);
        this.city = res.data;

        let todaysDate = new Date().toISOString().slice(0, 10);

        let i = 0;
        let newDictionary2: Record<string, Array<IForecast>>;

        while (res.data.list[i].dt_txt.slice(0, 10) == todaysDate) {
          console.log("same");
          i++;
          newDictionary2(this.convertEnumToString(1));
          //pushing to first forecast array
          //
        }
        this.forecastArray.push();

        console.log(i);
        // i -> number of items to be in first array of forecast -> todays day
        // rest -> next 8 in new array, next 8 in new array, etc etc

        let day = new Date().getDay();
        /*    let firstDay;
     
            this.pushFirstDayForecast(day);
      

        pushFirstDayForecast(number: number)
        {

          push rest;
          
        } */
      })
      .catch(err => console.log("Errors", err));

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=${this.key}`
      )
      .then(res => {
        console.log("details result2", res);
        this.city2 = res.data;
        console.log(this.city2);
      })
      .catch(err => console.log("Errors", err));
  }
}
</script>

<style scoped>
h1 {
  color: dodgerblue;
}
</style>
