<template>
  <div>
    <div>{{city.city.name}} - 5 day forecast</div>
    <hr>
    <div>
      <div class="forecast">
        <OneDayForecast
          v-bind:day2="day2"
          v-bind:array="array[day2]"
          v-bind:days="days"
          v-on:update-day="updateDay"
        />
        <OneDayForecast
          v-bind:day2="day3"
          v-bind:array="array[day3]"
          v-bind:days="days"
          v-on:update-day="updateDay3"
        />
        <OneDayForecast
          v-bind:day2="day4"
          v-bind:array="array[day4]"
          v-bind:days="days"
          v-on:update-day="updateDay4"
        />
        <OneDayForecast
          v-bind:day2="day4"
          v-bind:array="array[day4]"
          v-bind:days="days"
          v-on:update-day="updateDay4"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import OneDayForecast from "@/components/OneDayForecast.vue";

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
  array2: Array<any> = [];

  day2: number = new Date().getDay();
  day3: number = 1;
  day4: number = 1;

  updateDay(day: any) {
    /*     this.day2 = day;
     */
  }
  updateDay3(day: any) {
    this.day3 = day;
  }
  updateDay4(day: any) {
    this.day4 = day;
  }

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
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i].length != 0) {
        this.array2.push(this.array[i]);
      }
    }
    console.log(this.array2);
    console.log(this.array);
    // iterirat kroz array2 v-for, i tamo samo ispisat, kako dobit dan? slat index i trenutni dan pa po tome izracunat?
    // mozemo poslat i array-lenght - index kao prop il neki broj pomocu kojeg cemo znat dan
    // u toj komponenti uzet date now _> koji oznacava broj i plus index dobit trenutni dan
    console.log(this.city.list[0].dt_txt);
    console.log(date2);

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
