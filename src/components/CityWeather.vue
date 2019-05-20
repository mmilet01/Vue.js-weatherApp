<template>
  <div class="hello">
    <div v-if="!!data">
      <div
        v-for="(city,index) in data.list"
        v-bind:class="{'backColor': index % 2 === 0}"
        v-bind:key="city.id"
      >
        <CityDetails v-bind:city="city"/>
      </div>
    </div>
    <div v-else>Loading....</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import CityDetails from "@/components/CityDetails.vue";
const constants = require("../assets/constants.json");
console.log(constants);

@Component({
  //all compoennt options are allowed in here
  components: {
    CityDetails
  }
})
export default class CityWeather extends Vue {
  //data + methods
  data: any = null;
  iconURL: string = "";
  url: string = `http://api.openweathermap.org/data/2.5/find?lat=45.1&lon=15.20&cnt=10&units=metric&APPID=${
    constants.API_KEY
  }`;
  @Prop() private msg!: string;

  created() {
    this.fetchingData();
  }

  fetchingData() {
    axios
      .get(this.url)
      .then(res => {
        this.data = res.data;
        console.log(this.data);
        console.log(!!this.data);
      })
      .catch(err => {
        console.log("Errors");
        console.log(err);
      });
  }
}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.backColor {
  background-color: darkgray;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
