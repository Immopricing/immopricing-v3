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
import { levenshteinDistance } from "../helpers/utils"

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
    searchByVicinity(vicinity, cityDetails) {
      if (cityDetails.length === 0) {
        return {};
      }
      const found = cityDetails.find(city => city.nom.toLowerCase() === vicinity.toLowerCase());
      if (found) {
        return found;
      }
      cityDetails = cityDetails.map(city => {
        city.levenshteinDistance = levenshteinDistance(city.nom, vicinity);
        return city;
      });
      const distances = cityDetails.map(city => city.levenshteinDistance);
      const bestIdx = distances.findIndex(d => d === Math.min(...distances));
      return cityDetails[bestIdx];
    },
    async loadCityDetails(postCode, vicinity) {
      this.$nuxt.$loading.start();
      this.getCityDetails(postCode).then((details) => {
        details = Array.isArray(details) ? this.searchByVicinity(vicinity, details) : details;
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
      this.loadCityDetails(postCode.long_name, value.vicinity);
      this.getPolygon(value.formatted_address).then((polygon) => {
        this.$store.commit("maps/setPolygon", polygon);
      });
    },
  },
};
</script>
