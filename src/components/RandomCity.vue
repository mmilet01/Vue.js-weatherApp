<template>
  <div>
    <div>SAY HELLO FROM A RANDOM CITY</div>
    <button v-on:click="randomCity">Random</button>
    <div v-if="city">
      <SingleCity v-bind:city="city"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SingleCity from "@/components/SingleCity.vue";
let cities: Array<any> = require("../assets/city.list.json");
const constants = require("../assets/constants.json");
import axios from "axios";
console.log(cities);
console.log(cities[500]);
@Component({
  //all compoennt options are allowed in here
  components: {
    SingleCity
  }
})
export default class RandomCity extends Vue {
  city: any = null;

  created(){
    this.randomCity();
  }
  
  randomCity() {
    const key = constants.API_KEY;
    console.log(key);
    let number = Math.floor(Math.random() * cities.length + 1);
    console.log(number);
    let cityID: number = cities[number].id;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&APPID=${key}`
      )
      .then(res => {
        this.city = res.data;
      })
      .catch(err => console.log("Errors", err));
  }
}
</script>

<style scoped>
</style>
