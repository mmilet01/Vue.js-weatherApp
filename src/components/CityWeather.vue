<template>
  <div class="hello">
    <div v-if="!!data">
      <div class="sortFilter">
        <select class="select" v-on:change="sort">
          <option value selected disabled hidden>Sort</option>
          <option value="1">Low to high</option>
          <option value="2">High to low</option>
          <option value="3">Alphabeticly</option>
        </select>
        <h1>Current Weather</h1>
        <input v-on:keyup="filter" type="text" placeholder="Filter Cities" v-model="search">
      </div>

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
  margin: 0;
  background-color: lightblue;
}
.backColor {
  background-color: white;
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
}
.sortFilter h1 {
  color: dodgerblue;
  padding-left: 70px;
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
</style>
