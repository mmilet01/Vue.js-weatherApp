<template>
  <div>
    <div>{{city.city.name}}</div>
    <div>
      <p>MONDAY</p>
      <div class="forecast">
        <div v-for="city in monday" v-bind:key="city.id">
          <p>{{city.dt_txt}}</p>
          <p>{{city.weather[0].description}}</p>
        </div>
      </div>
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
    "Saturday"
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
  created() {
    /*     console.log(this.city);
     */ let day = new Date().getDay();
    console.log(day); // number of the day
    console.log(this.days[day]);
    let date2 = new Date().getDate();
    /*     let sliced2 = this.city.list[0].dt_txt.slice(8, 10);
     */

    for (let i = 0; i < this.city.cnt; i++) {
      let sliced = this.city.list[i].dt_txt.slice(8, 10);
      let intSliced = +sliced;
      if (i === 0 && sliced != date2) {
        this.array[day].push(this.city.list[i]);
      } else if (sliced != date2) {
        if (intSliced == 1) {
          date2 = 0;
        }
        date2++;
        day++;
        if (day == 7) {
          day = 0;
        }
        this.array[day].push(this.city.list[i]);
      } else {
        this.array[day].push(this.city.list[i]);
      }
    }
    console.log(this.array);
    console.log(this.thursday);
    console.log(this.city.list[0].dt_txt);
    console.log(date2);
  }
}
</script>

<style scoped>
.forecast {
  display: flex;
}
</style>
