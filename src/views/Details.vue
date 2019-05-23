<template>
  <div>
    <h1>Current weather</h1>

    <div v-if="!!city2">
      <SingleCity v-bind:city="city2"/>
    </div>
    <div v-if="!!city">
      <CityForecast v-bind:city="city"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import SingleCity from "@/components/SingleCity.vue";
import CityForecast from "@/components/CityForecast.vue";
const constants = require("../assets/constants.json");

@Component({
  //all compoennt options are allowed in here
  components: {
    SingleCity,
    CityForecast
  }
})
export default class Details extends Vue {
  key: string = constants.API_KEY;
  city: any = null;
  city2: any = null;

  created() {
    let id: any = this.$route.params.id;

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&APPID=${
          this.key
        }`
      )
      .then(res => {
        this.city = res.data;
        console.log(this.city);
      })
      .catch(err => console.log("Errors", err));

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=${
          this.key
        }`
      )
      .then(res => {
        this.city2 = res.data;
        /*         console.log(this.city2);
         */
      })
      .catch(err => console.log("Errors", err));
  }
}
</script>
