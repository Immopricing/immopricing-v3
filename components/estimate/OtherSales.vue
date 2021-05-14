<template>
  <v-expansion-panels v-model="panelModel">
    <v-expansion-panel
      @change="inCityOpen = !inCityOpen; inNeighborhoodOpen = false; similarOpen = false; displayOnMap(inCity);"
    >
      <v-expansion-panel-header>
        Biens vendus dans la même ville ({{ inCity.length }})
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <HouseList :items="inCity" />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel
      @change="inNeighborhoodOpen = !inNeighborhoodOpen; inCityOpen = false; similarOpen = false; displayOnMap(inNeighborhood);"
    >
      <v-expansion-panel-header>
        Biens vendus dans le même quartier ({{ inNeighborhood.length }})
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <HouseList :items="inNeighborhood" />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel
      @change="similarOpen = !similarOpen; inCityOpen = false; inNeighborhoodOpen = false; displayOnMap(similarHouses);"
    >
      <v-expansion-panel-header>
        Biens similaires ({{ similarHouses.length }})
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <HouseList :items="similarHouses" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState } from 'vuex'
import HouseList from '~/components/estimate/HouseList'
import { getPricesByCity } from '~/plugins/immoprices.service'

export default {
  name: 'OtherSales',
  components: {
    HouseList
  },
  data () {
    return {
      panelModel: null,
      similarHouses: []
    }
  },
  computed: {
    city () {
      return this.$store.state.houses.city
    },
    inNeighborhood () {
      if (!this.houses) {
        return []
      }
      return this.houses.filter((h) => {
        return this.bounds.contains(new window.google.maps.LatLng(h.longitude, h.latitude))
      })
    },
    inCity () {
      if (!this.houses) {
        return []
      }
      return this.houses
    },
    ...mapState({
      houses: state => state.houses.houses,
      houseSettings: state => state.houses.houseSettings,
      bounds: state => state.maps.bounds
    }),
    inCityOpen: {
      get: function () {
        return this.$store.state.houses.inCityOpen
      },
      set: function (value) {
        this.$store.commit('houses/setInCityOpen', value)
      }
    },
    inNeighborhoodOpen: {
      get: function () {
        return this.$store.state.houses.inNeighborhoodOpen
      },
      set: function (value) {
        this.$store.commit('houses/setInNeighborhoodOpen', value)
      }
    },
    similarOpen: {
      get: function () {
        return this.$store.state.houses.similarOpen
      },
      set: function (value) {
        this.$store.commit('houses/setSimilarOpen', value)
      }
    }
  },
  watch: {
    async city (val) {
      if (!val) {
        return
      }
      const houses = await getPricesByCity(val)
      this.$store.commit('houses/setHouses', houses)
    },
    houseSettings () {
      this.updateSimilarHouses()
    },
    houses () {
      this.updateSimilarHouses()
    }
  },
  mounted () {
    if (this.inCityOpen) {
      this.panelModel = 0
    }
    if (this.inNeighborhoodOpen) {
      this.panelModel = 1
    }
    if (this.similarOpen) {
      this.panelModel = 2
    }
    this.updateSimilarHouses()
  },
  methods: {
    displayOnMap (housesToDisplay) {
      this.$emit('displayMarkers', [])
      if (this.inNeighborhoodOpen || this.inCityOpen || this.similarOpen) {
        this.$emit('displayMarkers', housesToDisplay)
      }
    },
    findSimilarHouses (houseList) {
      const houseListCopy = JSON.parse(JSON.stringify(houseList))
      if (this.houseSettings.houseType) {
        for (let i = 0; i < houseListCopy.length; i++) {
          houseListCopy[i].transactions = houseListCopy[i].transactions.filter((t) => {
            return t.unit_type === this.houseSettings.houseType.id
          })
        }
      }
      if (this.houseSettings.squareMeters) {
        for (let i = 0; i < houseListCopy.length; i++) {
          houseListCopy[i].transactions = houseListCopy[i].transactions.filter((t) => {
            return this.hasSimilarSurface(t.surface, this.houseSettings.squareMeters)
          })
        }
      }
      if (this.houseSettings.rooms) {
        for (let i = 0; i < houseListCopy.length; i++) {
          houseListCopy[i].transactions = houseListCopy[i].transactions.filter((t) => {
            return this.hasSimilarRooms(t.number_of_parts, this.houseSettings.rooms)
          })
        }
      }
      return houseListCopy.filter(h => h.transactions.length > 0)
    },
    hasSimilarSurface (tSurface, surface) {
      return surface < tSurface * 1.2
    },
    hasSimilarRooms (tRooms, rooms) {
      return (tRooms - 1) < rooms && rooms < (tRooms + 1)
    },
    updateSimilarHouses () {
      let dataset = 'similar/inNeighborhood'
      let data = []
      let similarNear = this.findSimilarHouses(this.inNeighborhood)
      if (similarNear.length < 2) {
        similarNear = this.findSimilarHouses(this.inCity)
        dataset = 'similar/inCity'
      }
      if (similarNear.length < 2) {
        if (this.inNeighborhood.length >= 2) {
          dataset = 'inNeighborhood'
          data = [...this.inNeighborhood]
        } else {
          dataset = 'inCity'
          data = [...this.inCity]
        }
      } else {
        data = [...similarNear]
      }
      this.$store.commit('houses/setEstimationData', {
        dataset,
        data
      })
      this.similarHouses = similarNear
    }
  }
}
</script>

<style scoped>

</style>
