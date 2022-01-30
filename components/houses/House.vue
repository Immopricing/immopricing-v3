<template>
  <div class="flex w-full h-20 p-4 flex-row" @click="selectHouse(house)">
    <div class="flex justify-center items-center h-full">
      <img
        v-if="house.transactions[0].unit_type === 1"
        class="w-8 h-8"
        src="~/assets/appartment-icon.png"
        alt="appartment for sale icon"
      />
      <img
        v-if="house.transactions[0].unit_type === 2"
        class="w-8 h-8"
        src="~/assets/house-icon.png"
        alt="house for sale icon"
      />
      <img
        v-if="![1, 2].includes(house.transactions[0].unit_type)"
        class="w-8 h-8"
        src="~/assets/house-icon.png"
        alt="house for sale icon"
      />
    </div>
    <div class="flex items-center h-full p-2">
      <span class="text-white">{{ house.address }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["house"],
  computed: {
    icon() {
      switch (this.house.unit_type) {
        case 1:
          return "~/assets/appartment-icon.png";
        case 2:
          return "~/assets/house-icon.png";
        default:
          return "~/assets/house-icon.png";
      }
    },
  },
  methods: {
    selectHouse(h) {
      this.$store.commit("houses/setSelectedHouse", h);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>