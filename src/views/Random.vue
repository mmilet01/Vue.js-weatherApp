<template>
  <div class="about">
    <RandomCity/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchInput from "@/components/SearchInput.vue";
import RandomCity from "@/components/RandomCity.vue";

@Component({
  components: {
    SearchInput,
    RandomCity
  }
})
export default class Home extends Vue {}
</script>