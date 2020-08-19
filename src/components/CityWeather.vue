<template>
  <div v-if="!!weather">
    <div class="sortFilter">
      <select class="select" v-on:change="sort">
        <option value selected disabled hidden>Sort</option>
        <option value="1">Low to high</option>
        <option value="2">High to low</option>
        <option value="3">Alphabeticly</option>
      </select>
      <h1>Current Weather</h1>
      <input v-on:keyup="filter" type="text" placeholder="Filter Cities" v-model="search" />
    </div>
    <CityDetails
      class="bColor"
      v-for="(city,index) in filter"
      v-bind:class="{'backColor': index % 2 === 0}"
      v-bind:key="city.id"
      v-bind:cityWeather="city"
    />
  </div>
  <div v-else>Loading....</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import CityDetails from "@/components/CityDetails.vue";
import { IWeather } from "@/Interfaces/WeatherInterface";
import { SortOptions } from "../Enums/Enums";
const constants = require("../assets/constants.json");

@Component({
  components: {
    CityDetails,
  },
})
export default class CityWeather extends Vue {
  search: string = "";
  @Prop() weather: IWeather[];

  sort(e: any) {
    switch (+e.target.value) {
      case SortOptions.HighestTemp:
        this.sortHighestTemp();
        break;
      case SortOptions.LowestTemp:
        this.sortLowestTemp();
        break;

      default:
        this.sortAlpha();
        break;
    }
  }
  get filter() {
    return this.weather.filter((city: IWeather) =>
      city.name.toUpperCase().includes(this.search.toUpperCase())
    );
  }

  sortHighestTemp() {
    this.weather.sort((a: IWeather, b: IWeather) => {
      return a.temperature - b.temperature;
    });
  }

  sortLowestTemp() {
    this.weather.sort((a: IWeather, b: IWeather) => {
      return b.temperature - a.temperature;
    });
  }

  sortAlpha() {
    this.weather.sort((a: IWeather, b: IWeather) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
}
</script>

<style scoped>
.bColor {
  background-color: lightblue;
}
.backColor {
  background-color: white;
}

.select {
  background-color: dodgerblue;
  background: none;
  color: dodgerblue;
  font-size: 26px;
  border: none;
  border-bottom: 2px solid dodgerblue;
  width: auto;
  padding: 10px;
  margin-bottom: 15px;
  display: inline-block;
}

option {
  background-color: lightblue;
  font-size: 20px;
}
.sortFilter {
  display: flex;
  justify-content: space-between;
  border-bottom: 4px solid dodgerblue;
  padding: 0px 15px 0px 15px;
}
.sortFilter h1 {
  color: dodgerblue;
  padding: 0px 50px 0px 50px;
}
input {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: none;
  border: none;
  font-size: 26px;
  border-bottom: 2px solid dodgerblue;
  color: dodgerblue;
  margin-bottom: 15px;
}
input::placeholder {
  color: dodgerblue;
}

@media only screen and (max-width: 700px) {
  .sortFilter {
    flex-wrap: wrap;
  }
}
</style>