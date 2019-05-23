<template>
  <div>
    <p>{{days[day]}}</p>
    <div class="forecast">
      <div v-for="city in array" v-bind:key="city.id" class="forecast2">
        <p>{{city.dt_txt}}</p>
        <p>{{city.weather[0].description}}</p>
      </div>
    </div>
    <hr>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  //all compoennt options are allowed in here
})
export default class Details extends Vue {
  @Prop() array!: any;
  @Prop() day2!: any;
  @Prop() index!: any;

  day: number = 0;
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

  created() {
    this.day = this.day2 + this.index;
  }
}
</script>

<style scoped>
.forecast {
  display: flex;
  /*   justify-content: space-around;
 */
  flex-wrap: wrap;
}
.forecast2 {
  width: 12.5%;
}
@media only screen and (max-width: 900px) {
  .forecast2 {
    width: auto;
  }
}
</style>
