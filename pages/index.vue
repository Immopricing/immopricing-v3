<template>
  <div class="flex flex-col md:flex-row bg-[#212f3f]">
    <div class="md:flex-1 h-[50vh] md:h-[100vh] md:w-32">
      <Form />
    </div>
    <div class="md:flex-1 h-[50vh] md:h-[100vh] md:w-32">
      <Map />
    </div>
  </div>
</template>

<script>
import { Map } from "../components/Map.vue";
import { Form } from "../components/form/Form.vue";
import { findPostCode } from "../helpers/geo_helpers";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: mapState({
    selectedAddress: (state) => state.maps.selectedAddress,
  }),
  methods: {
    ...mapActions({
      getCityDetails: "geocode/getCityDetails",
      getPricesByCity: "houses/getPricesByCity",
      getPolygon: "geocode/getPolygon",
    }),
    ...mapMutations({
      setHouses: "houses/setHouses",
    }),
    async loadCityDetails(postCode) {
      this.$nuxt.$loading.start();
      this.getCityDetails(postCode).then((details) => {
        this.getPricesByCity(details).then((res) => {
          this.$nuxt.$loading.finish();
          this.$store.commit("houses/setHouses", res);
          this.$store.commit("houses/setDisplayedHouses", res);
        });
      });
    },
  },
  watch: {
    selectedAddress(value) {
      if (!value) {
        return;
      }
      const postCode = findPostCode(value);
      if (!postCode) {
        console.warn("no postcode in", value);
        return;
      }
      this.loadCityDetails(postCode.long_name);
      this.getPolygon(value.formatted_address).then((polygon) => {
        this.$store.commit("maps/setPolygon", polygon);
      });
    },
  },
};
</script>
