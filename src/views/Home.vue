<template>
  <div class="home">
    <CityWeather msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CityWeather from "@/components/CityWeather.vue"; // @ is an alias to /src
import SearchInput from "@/components/SearchInput.vue";

@Component({
  components: {
    CityWeather,
    SearchInput
  }
})
export default class Home extends Vue {}
</script>
