<template>
  <div>
    <p>ONE DAY FORECAST</p>
    {{days[day2]}}
    <div v-for="city in array" v-bind:key="city.id">
      <p>{{city.dt_txt}}</p>
      <p>{{city.weather[0].description}}</p>
    </div>
    <hr>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  //all compoennt options are allowed in here
})
export default class Details extends Vue {
  @Prop() array!: any;
  @Prop() day2!: any;
  @Prop() days!: any;

  day: number = this.day2;

  created() {
    if (this.day === 6) {
      //reach into parent component and make it -1
      this.day = 0;
      this.$emit("update-day", this.day);
    } else {
      this.day = this.day + 1;
      console.log(this.day);
      this.$emit("update-day", this.day);
    }
  }
}
</script>

<style scoped>
</style>
