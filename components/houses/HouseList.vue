<template>
  <div class="h-full flex flex-col">
    <div
      v-if="houses.length"
      class="
        text-center
        py-3
        flex
        items-center
        justify-around
        flex-row
        w-full
        text-white
      "
    >
      <div class="flex flex-row items-center justify-evenly">
        <section
          @click="filterAppartments = !filterAppartments; toggleFilter();"
          :class="{ 'bg-gray-500': filterAppartments }"
          class="mx-1 p-2 rounded-full cursor-pointer"
        >
          <img
            class="w-8 h-8"
            src="~/assets/appartment-icon.png"
            alt="appartment for sale icon"
          />
        </section>

        <section
          @click="filterHouses = !filterHouses; toggleFilter();"
          :class="{ 'bg-gray-500': filterHouses }"
          class="mx-1 p-2 rounded-full cursor-pointer"
        >
          <img
            class="w-8 h-8"
            src="~/assets/house-icon.png"
            alt="house for sale icon"
          />
        </section>
      </div>

      <div class="flex">
        <h3>{{displayHouses.length}} biens vendues dans cette ville</h3>
      </div>
    </div>

    <div class="flex flex-col w-full overflow-y-auto p-2">
      <House v-for="(h, index) in displayHouses" :key="index" :house="h" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import House from "./House.vue";

export default {
  components: { House },
  data: () => {
    return {
      filterAppartments: true,
      filterHouses: true
    };
  },
  methods: {
    filter() {
      const filtered = this.houses.filter(h => this.houseTypes.includes(h.transactions[0].unit_type));
      this.$store.commit('houses/setDisplayedHouses', filtered);
    },
    toggleFilter() {
      const tmpFilter = [];
      if (this.filterAppartments) {
        tmpFilter.push(1);
      }
      if (this.filterHouses) {
        tmpFilter.push(2);
      }
      this.$store.commit('filters/setHouseTypes', tmpFilter);
    },
  },
  computed: {
    ...mapState({
      houses: (state) => state.houses.houses,
      displayHouses: (state) => state.houses.displayedHouses,
      houseTypes: (state) => state.filters.houseTypes
    }),
  },
  watch: {
    houseTypes() {
      this.filter();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>