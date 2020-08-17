<template>
  <div>
    <h1>Current weather</h1>

    <div v-if="!!city2">
      <SingleCity v-bind:city="city2" />
    </div>
    <!--     <div v-if="!!cityName">
    -->
    <CityForecast v-bind:cityForecast="forecastArray" />
    <!--     </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import SingleCity from "@/components/SingleCity.vue";
import CityForecast from "@/components/forecast/CityForecast.vue";
import { WeekDays } from "../Enums/Enums";
import { IForecast } from "../Interfaces/ForecastInterface";
import { IForecastArray } from "../Interfaces/ForecastArrayInterface";
import { IDate } from "../Interfaces/DateInterface";
import { Dictionary } from "vue-router/types/router";
const constants = require("../assets/constants.json");
import requests from "../api/requests";

@Component({
  components: {
    SingleCity,
    CityForecast,
  },
})
export default class Details extends Vue {
  key: string = constants.API_KEY;
  cityName: string;
  city2: any = null;

  forecastArray: IForecastArray[] = [];

  firstDayDate: IDate;
  secondDayDate: IDate;
  thirdDayDate: IDate;
  forthDayDate: IDate;
  fifthDayDate: IDate;
  sixthDayDate: IDate;

  firstDay: Array<IForecast> = [];
  secondDay: Array<IForecast> = [];
  thirdDay: Array<IForecast> = [];
  forthDay: Array<IForecast> = [];
  fifthDay: Array<IForecast> = [];
  sixthDay: Array<IForecast> = [];

  convertEnumToString(day: WeekDays) {
    switch (day) {
      case WeekDays.Monday:
        return "Monday";
      case WeekDays.Tuesday:
        return "Tuesday";
      case WeekDays.Wednesday:
        return "Wednesday";
      case WeekDays.Thursday:
        return "Thursday";
      case WeekDays.Friday:
        return "Friday";
      case WeekDays.Saturday:
        return "Saturday";
      case WeekDays.Sunday:
        return "Sunday";
    }
  }

  pushDayToForecastArray(data: IForecast[], date: IDate) {
    this.forecastArray.push({
      date,
      forecastData: data,
    });
  }

  getForecastData(data: any) {
    return {
      icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      hour: data.dt_txt.slice(11, 16),
      temperature: Math.round(data.main.temp),
      description: data.weather[0].main,
      details: data.weather[0].description,
    };
  }

  checkValueOfTodaysDay(day: WeekDays) {
    day++;
    return day > WeekDays.Saturday ? WeekDays.Monday : day;
  }

  createForecastArray() {
    let todaysDay: WeekDays = new Date().getDay();

    if (this.firstDay.length != 0) {
      this.pushDayToForecastArray(this.firstDay, this.firstDayDate);
    }

    this.pushDayToForecastArray(this.secondDay, this.secondDayDate);

    this.pushDayToForecastArray(this.thirdDay, this.thirdDayDate);

    this.pushDayToForecastArray(this.forthDay, this.forthDayDate);

    this.pushDayToForecastArray(this.fifthDay, this.fifthDayDate);

    this.pushDayToForecastArray(this.sixthDay, this.sixthDayDate);
  }

  getDateAndMonth(unixTimestamp: number) {
    const date = new Date(unixTimestamp * 1000);
    let returnDate: IDate = {
      month: date.getUTCMonth(),
      date: date.getUTCDate(),
      day: this.convertEnumToString(date.getUTCDay()),
    };
    return returnDate;
  }

  created() {
    /* let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    }); */
    let id: any = this.$route.params.id;

    requests.Weather.forecast(id).then((res: IForecastArray[]) => {
      this.forecastArray = res;
      console.log(res, "inside detaisl");
    });
    /* 
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&APPID=${this.key}`
      )
      .then((res) => {
        console.log("details result", res);
        this.cityName = res.data.city.name;

        this.firstDayDate = this.getDateAndMonth(res.data.list[0].dt);
        this.secondDayDate = this.getDateAndMonth(res.data.list[8].dt);
        this.thirdDayDate = this.getDateAndMonth(res.data.list[16].dt);
        this.forthDayDate = this.getDateAndMonth(res.data.list[24].dt);
        this.fifthDayDate = this.getDateAndMonth(res.data.list[32].dt);
        this.sixthDayDate = this.getDateAndMonth(res.data.list[39].dt);

        let todaysDate = new Date().getDate();

        for (let i = 0; i < res.data.list.length; i++) {
          let forecastData: IForecast = this.getForecastData(res.data.list[i]);
          let date = new Date(res.data.list[i].dt * 1000).getDate();
          if (date == todaysDate) {
            this.firstDay.push(forecastData);
          } else if (i < this.firstDay.length + 8) {
            this.secondDay.push(forecastData);
          } else if (i < this.firstDay.length + 16) {
            this.thirdDay.push(forecastData);
          } else if (i < this.firstDay.length + 24) {
            this.forthDay.push(forecastData);
          } else if (i < this.firstDay.length + 32) {
            this.fifthDay.push(forecastData);
          } else {
            this.sixthDay.push(forecastData);
          }
        }

        this.createForecastArray();
              //  loader.hide();
        
      })
      .catch((err) => console.log("Errors", err)); */

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=${this.key}`
      )
      .then((res) => {
        console.log("details result2", res);
        this.city2 = res.data;
        console.log(this.city2);
      })
      .catch((err) => console.log("Errors", err));
  }
}
</script>

<style scoped>
h1 {
  color: dodgerblue;
}
</style>
