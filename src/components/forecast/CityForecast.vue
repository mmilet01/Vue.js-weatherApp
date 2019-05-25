<template>
  <div>
    <div>{{city.city.name}} - 5 day forecast</div>
    <hr>
    <div>
      <div v-for="(day,index) in array2" v-bind:key="index" class="forecast">
        <OneDayForecast
          v-bind:day2="day2"
          v-bind:array="day"
          v-bind:days="days"
          v-bind:index="index"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OneDayForecast from "@/components/forecast/OneDayForecast.vue";

@Component({
  //all compoennt options are allowed in here
  components: {
    OneDayForecast
  }
})
export default class CityForecast extends Vue {
  @Prop() city!: any;
  monday: Array<any> = [];
  tuesday: Array<any> = [];
  wednesday: Array<any> = [];
  thursday: Array<any> = [];
  friday: Array<any> = [];
  saturday: Array<any> = [];
  sunday: Array<any> = [];

  days: Array<string> = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednseday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednseday",
    "Thursday",
    "Friday"
  ];

  array: Array<Array<any>> = [
    this.sunday,
    this.monday,
    this.tuesday,
    this.wednesday,
    this.thursday,
    this.friday,
    this.saturday
  ];
  array2: Array<any> = [];

  day2: number = new Date().getDay();

  created() {
    let day = new Date().getDay();
    console.log(day); // number of the day
    let date2 = new Date().getDate();

    for (let i = 0; i < this.city.cnt; i++) {
      let sliced = this.city.list[i].dt_txt.slice(8, 10);
      let intSliced = +sliced;
      if (i === 0 && sliced != date2) {
        this.array[day].push(this.city.list[i]);
        this.array2.push(this.array[day]);
      } else if (sliced != date2) {
        if (intSliced == 1) {
          date2 = 0;
        }
        date2++;
        day++;
        if (day == 7) {
          day = 0;
        }
        this.array2.push(this.array[day]);
        this.array[day].push(this.city.list[i]);
      } else {
        this.array[day].push(this.city.list[i]);
        if (this.array2.length === 0) {
          this.array2.push(this.array[day]);
        }
      }
    }

    if (this.array[this.day2].length === 0) {
      this.day2++;
      if (this.day2 === 7) {
        this.day2 = 0;
      }
    }
    console.log(this.day2);
    //DAY2 - prvi za pokazat vremensku prognozu
  }
}
</script>

<style scoped>
.forecast {
}
</style>
