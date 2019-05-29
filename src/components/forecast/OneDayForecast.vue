<template>
  <div>
    <h2>{{days[day]}}: {{date}}</h2>
    <div class="forecast">
      <div v-for="city in array" v-bind:key="city.id" class="forecast2">
        <HourlyForecast v-bind:city="city"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import HourlyForecast from "@/components/forecast/HourlyForecast.vue";

@Component({
  //all compoennt options are allowed in here
  components: {
    HourlyForecast
  }
})
export default class Details extends Vue {
  @Prop() array!: any;
  @Prop() day2!: any;
  @Prop() index!: Number;
  @Prop() days!: any;

  day: number = 0;
  date: String = "";

  created() {
    this.day = this.day2 + this.index;
    this.date = this.array[0].dt_txt.slice(5, 10);
  }
}
</script>

<style scoped>
h2 {
  color: dodgerblue;
}
.forecast {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.forecast2 {
  width: 12.5%;
}
@media only screen and (max-width: 700px) {
  .forecast2 {
    width: 150px;
  }
}
</style>
