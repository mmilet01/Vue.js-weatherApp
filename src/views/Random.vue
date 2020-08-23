<template>
  <div class="about" v-if="city">
    <div class="nav">
      <h1>
        Weather in a
        <button v-on:click="randomCity">Random</button> city
      </h1>
    </div>
    <CityDetails v-if="!!city" v-bind:cityWeather="city" />
    <div class="right">
      <h1>Not the city you want?</h1>
      <SearchInput />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchInput from "@/components/SearchInput.vue";
import RandomCity from "@/components/RandomCity.vue";
import CityDetails from "@/components/CityDetails.vue";
import "vue-loading-overlay/dist/vue-loading.css";
/* import Loading from "vue-loading-overlay";
 */ const Loading = require("vue-loading-overlay");
let cities: Array<any> = require("../assets/city.list.json");
const constants = require("../assets/constants.json");
import axios from "axios";
import { IWeather } from "@/Interfaces/WeatherInterface";
import requests from "../api/requests";
import { set } from "vue/types/umd";

@Component({
  components: {
    SearchInput,
    CityDetails,
  },
})
export default class Random extends Vue {
  city: IWeather | null = null;
  isLoading: boolean;

  created() {
    this.isLoading = true;
    this.randomCity();
  }

  randomCity() {
    //errors shown but works
    let loader = this.$loading.show({
      // Optional parameters
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });
    const number = Math.floor(Math.random() * cities.length + 1);
    const cityID: number = cities[number].id;
    requests.Weather.cityById(cityID)
      .then((res: IWeather) => {
        this.city = res;
        loader.hide();
      })
      .catch((err) => {
        alert("Errors");
        loader.hide();
      });
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