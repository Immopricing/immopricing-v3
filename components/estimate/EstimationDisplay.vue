<template>
  <v-row v-if="pricePerSquareMeter && estimationSurface">
    <v-col cols="12" class="price-container">
      <h3>{{ numberWithSpaces(round(pricePerSquareMeter * estimationSurface)) }} €</h3>
      <h4>{{ pricePerSquareMeter }} € / m²</h4>
      <h5>{{ messageList[message] }}</h5>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EstimationDisplay',
  data () {
    return {
      pricePerSquareMeter: null,
      messageList: {
        'similar/inNeighborhood': 'Basé sur les biens similaires dans le quartier',
        'similar/inCity': 'Basé sur les biens similaires dans la ville',
        inNeighborhood: 'Basé sur les biens présents dans le quartiers',
        inCity: 'Basé sur les biens présents dans la même ville'
      }
    }
  },
  computed: {
    ...mapState({
      estimationData: state => state.houses.estimationData
    }),
    estimationSurface () {
      return this.$store.state.houses.houseSettings?.squareMeters
    },
    message () {
      return this.$store.state.houses.estimationData.dataset
    }
  },
  watch: {
    estimationData (val) {
      if (val.data.length === 0) {
        return null
      }
      let prices = []
      val.data.forEach((h) => {
        prices = [
          ...prices,
          ...h.transactions.map(t => t.price / t.surface)
        ]
      })
      const allPrices = prices.reduce((count, val) => count + val)
      const priceSquaremeters = allPrices / prices.length
      this.pricePerSquareMeter = Math.round(priceSquaremeters * 100) / 100
    }
  },
  methods: {
    round (x) {
      return Math.round(x)
    },
    numberWithSpaces (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    }
  }
}
</script>

<style scoped>

.price-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
