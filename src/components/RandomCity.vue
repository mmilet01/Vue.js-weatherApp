<template>
  <div>
    <div class="nav">
      <h1>
        Weather in a
        <button v-on:click="randomCity">Random</button> city
      </h1>
    </div>
    <div v-if="city">
      <SingleCity v-bind:city="city" :key="componentKey" />
    </div>
    <div class="right">
      <h1>Not the city you want?</h1>
      <SearchInput />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SingleCity from "@/components/SingleCity.vue";
import SearchInput from "@/components/SearchInput.vue";
let cities: Array<any> = require("../assets/city.list.json");
const constants = require("../assets/constants.json");
import axios from "axios";
/* console.log(cities);
console.log(cities[500]); */
@Component({
  //all compoennt options are allowed in here
  components: {
    SingleCity,
    SearchInput
  }
})
export default class RandomCity extends Vue {
  city: any = null;
  componentKey: number = 0;
  created() {
    this.randomCity();
  }

  randomCity() {
    const key = constants.API_KEY;
    let number = Math.floor(Math.random() * cities.length + 1);
    let cityID: number = cities[number].id;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&APPID=${key}`
      )
      .then(res => {
        console.log("inside randomcity", res);
        this.city = res.data;
        this.componentKey += 1;
      })
      .catch(err => console.log("Errors", err));
  }
}
</script>

<style scoped>
.nav {
  border-bottom: 4px solid dodgerblue;
  color: dodgerblue;
}
.right h1 {
  border-top: 2px solid dodgerblue;
  padding-top: 10px;
  color: dodgerblue;
}
button {
  margin: 5px;
  box-shadow: 2;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.75);
}
</style>
