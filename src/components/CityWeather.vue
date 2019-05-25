<template>
  <div class="hello">
    <div v-if="!!data">
      <select v-on:change="sort">
        <option value selected disabled hidden>Sort</option>
        <option v-on:click="sortHighestTemp" value="1">Low to high</option>
        <option value="2">High to low</option>
        <option value="3">Alphabeticly</option>
      </select>
      <input v-on:keyup="filter" type="text" placeholder="SEARCH CITIES" v-model="search">
      <div
        class="bColor"
        v-for="(city,index) in filter"
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
  search: string = "";
  url: string = `http://api.openweathermap.org/data/2.5/find?lat=45.1&lon=15.20&cnt=10&units=metric&APPID=${
    constants.API_KEY
  }`;
  @Prop() private msg!: string;

  created() {
    this.fetchingData();
  }

  sort(e: any) {
    if (+e.target.value === 1) {
      this.sortHighestTemp();
    } else if (+e.target.value === 2) {
      this.sortLowestTemp();
    } else {
      this.sortAlpha();
    }
  }
  get filter() {
    console.log(this.data.list);
    return this.data.list.filter((city: any) =>
      city.name.toUpperCase().includes(this.search.toUpperCase())
    );
  }

  fetchingData() {
    axios
      .get(this.url)
      .then(res => {
        this.data = res.data;
        console.log(this.data.list);
        console.log(!!this.data);
      })
      .catch(err => {
        console.log("Errors");
        console.log(err);
      });
  }

  sortHighestTemp() {
    this.data.list.sort((a: any, b: any) => {
      return a.main.temp - b.main.temp;
    });
  }
  sortLowestTemp() {
    this.data.list.sort((a: any, b: any) => {
      return b.main.temp - a.main.temp;
    });
  }
  sortAlpha() {
    this.data.list.sort((a: any, b: any) => {
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




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bColor {
  background-color: lightblue;
}
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
