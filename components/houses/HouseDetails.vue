<template>
  <div class="v-full h-full flex flex-col p-2">
    <div class="flex v-full flex-row content-between">
      <button
        @click="previous"
        type="button"
        class="flex items-center p-2 rounded-md focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <h3 class="text-white leading-[40px] w-full text-center">
        {{ house.address }}
      </h3>
    </div>
    <h4 class="text-center text-white w-full py-2">
      {{ house.transactions_count }} ventes à cette adresse
    </h4>
    <HouseTransactions :transactions="house.transactions" />
  </div>
</template>

<script>
import HouseTransactions from "./HouseTransactions.vue";
export default {
  components: { HouseTransactions },
  props: ["house"],
  mounted() {
    console.log("selected house", this.house);
  },
  methods: {
    previous() {
      this.$nuxt.$loading.start();
      setTimeout(() => {
        this.$store.commit("houses/setSelectedHouse", null);
        this.$nuxt.$loading.finish();
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>