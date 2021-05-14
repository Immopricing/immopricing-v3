<template>
  <v-autocomplete
    v-model="selectedAddress"
    :search-input.sync="address"
    :loading="loading"
    hide-no-data
    no-filter
    return-object
    item-text="formatted_address"
    :items="items"
    label="Adresse"
  />
</template>

<script>
import _ from 'lodash'

export default {
  name: 'MapsAutocomplete',
  data () {
    return {
      selectedAddress: null,
      address: '',
      items: [],
      loading: false,
      geocoder: null
    }
  },
  watch: {
    address: _.debounce(function (val) {
      if (val && val.length) {
        this.searchAddress(val)
      } else {
        this.items = []
      }
    }, 750),
    selectedAddress (val) {
      this.$store.commit('maps/resetState')
      this.$store.commit('houses/resetState')
      this.$nuxt.$loading.start()
      this.$store.commit('maps/setSelectedAddress', val)
      this.$emit('addressSelected', val)
    }
  },
  mounted () {
    this.geocoder = new window.google.maps.Geocoder()
  },
  methods: {
    searchAddress (address) {
      this.loading = true
      this.geocoder.geocode({ address }, (res, status) => {
        this.items = res.map((i) => {
          return {
            address_components: i.address_components,
            formatted_address: i.formatted_address,
            geometry: i.geometry
          }
        })
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
