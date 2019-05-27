<template>
  <div>
    <h3>{{days[day]}}: {{date}}</h3>
    <div class="forecast">
      <div v-for="city in array" v-bind:key="city.id" class="forecast2">
        <HourlyForecast v-bind:city="city"/>
      </div>
    </div>
    <hr>
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
  @Prop() index!: any;
  @Prop() days!: any;

  day: number = 0;
  date: String = "";

  created() {
    this.day = this.day2 + this.index;
    console.log(this.array);
    this.date = this.array[0].dt_txt.slice(5, 10);
  }
}
</script>

<style scoped>
.forecast {
  display: flex;
  /*   justify-content: space-around;
 */
  flex-wrap: wrap;
}
.forecast2 {
  width: 12.5%;
}
@media only screen and (max-width: 900px) {
  .forecast2 {
    width: auto;
  }
}
</style>
