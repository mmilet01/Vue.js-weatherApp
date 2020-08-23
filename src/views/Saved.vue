<template>
  <div v-if="!!this.weather.length && this.ids">
    <CityDetails
      class="bColor"
      v-for="(city,index) in weather"
      v-bind:class="{'backColor': index % 2 === 0}"
      v-bind:key="city.id"
      v-bind:cityWeather="city"
      v-on:my-event="doSomething"
    />
  </div>
  <div v-else>
    <h1 v-if="this.isLoading">Loading...</h1>
    <h1 v-if="!this.isLoading">Nothing Saved yet</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CityDetails from "@/components/CityDetails.vue"; // @ is an alias to /src
import { IWeather } from "@/Interfaces/WeatherInterface";
import requests from "../api/requests";

@Component({
  components: {
    CityDetails,
  },
})
export default class Home extends Vue {
  ids: Array<number>;
  weather: IWeather[] = [];
  isLoading: boolean = false;

  created() {
    this.ids = JSON.parse(localStorage.getItem("ids")!);

    if (this.ids.length !== 0) {
      this.isLoading = true;

      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });
      this.ids.forEach((id: any) => {
        requests.Weather.cityById(id)
          .then((res) => {
            this.weather.push(res);
            loader.hide();
            this.isLoading = false;
          })
          .catch((err) => {
            console.log(err);
            alert("Please try again later");
            loader.hide();
            this.isLoading = false;
          });
      });
    }
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
</style>