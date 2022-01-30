<template>
  <input
    type="text"
    id="search-input"
    placeholder="Rechercher une adresse"
    class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-[75%]"
  />
</template>

<script>
export default {
  mounted() {
    const input = document.getElementById("search-input");
    const autocomplete = new google.maps.places.Autocomplete(input, {
      strictBounds: false,
      componentRestrictions: { country: "fr" },
      types: ["address"],
    });
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      this.autocompleteChanged(place);
    });
  },
  methods: {
    autocompleteChanged(place) {
      this.$store.commit("maps/setSelectedAddress", place);
    },
  },
};
</script>

<style scoped>
</style>