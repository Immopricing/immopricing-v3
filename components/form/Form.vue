<template>
  <div class="flex flex-col justify-around items-center h-[100%]">
    <div class="w-[100%] h-12 my-4 flex items-center justify-center">
      <MapsAutocomplete />
    </div>

    <div class="flex-1 h-24 w-[100%]">
      <HouseList v-if="!selectedHouse" />
      <HouseDetails v-if="selectedHouse" :house="selectedHouse" />
    </div>
  </div>
</template>

<script>
import HouseList from "../houses/HouseList.vue";
import MapsAutocomplete from "./MapsAutocomplete.vue";
import {mapState} from "vuex";
import HouseDetails from '../houses/HouseDetails.vue';

export default {
  components: { MapsAutocomplete, HouseList, HouseDetails },
  computed: {
    ...mapState({
      selectedHouse: (state) => state.houses.selectedHouse
    })
  }
};
</script>

<style scoped>
</style>