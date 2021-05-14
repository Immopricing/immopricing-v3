<template>
  <div>
    <PageHeader>
      Estimation
    </PageHeader>

    <v-row>
      <v-col>
        <v-row>
          <EstimateForm @postCode="postCode" @addressSelected="addressSelected" />
        </v-row>
        <v-row>
          <EstimationDisplay />
        </v-row>
        <v-row>
          <OtherSales v-if="!selectedHouse" @displayMarkers="displayMarkers" />
          <SelectedHouse v-if="selectedHouse" />
        </v-row>
      </v-col>
      <v-col>
        <Map ref="map" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageHeader from '~/components/PageHeader'
import EstimateForm from '~/components/estimate/EstimateForm'
import Map from '~/components/estimate/Map'
import { getCityDetails, getPolygon } from '~/plugins/geo.service'
import OtherSales from '~/components/estimate/OtherSales'
import SelectedHouse from '~/components/estimate/SelectedHouse'
import EstimationDisplay from '~/components/estimate/EstimationDisplay'

export default {
  components: {
    PageHeader,
    EstimateForm,
    Map,
    OtherSales,
    SelectedHouse,
    EstimationDisplay
  },
  computed: {
    ...mapState({
      selectedHouse: state => state.houses.selectedHouse,
      city: state => state.houses.city
    })
  },
  beforeDestroy () {
    this.$store.commit('houses/resetState')
    this.$store.commit('maps/resetState')
  },
  methods: {
    async addressSelected (formattedAddress) {
      const polygon = await getPolygon(formattedAddress)
      this.$store.commit('maps/setPolygon', polygon)
    },
    async postCode (val) {
      const city = await getCityDetails(val)
      this.$store.commit('houses/setCity', city)
      this.$nuxt.$loading.finish()
    },
    displayMarkers (homes) {
      const mapCmp = this.$refs.map
      mapCmp.addHomes(homes)
    }
  }
}
</script>

<style scoped>

</style>
