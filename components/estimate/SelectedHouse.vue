<template>
  <div class="full-width">
    <v-row class="full-width ma-0">
      <v-col cols="4">
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="primary"
          @click="back"
        >
          <v-icon dark>
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="4" class="center-align">
        <span>{{ selectedHouse.address }}</span>
      </v-col>
      <v-col cols="4" class="center-align">
        <span>{{ priceSquareMeter }} € / m²</span>
      </v-col>
    </v-row>
    <v-row class="full-width ma-0">
      <TransactionList :items="selectedHouse.transactions" />
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TransactionList from '~/components/estimate/TransactionList'

export default {
  name: 'SelectedHouse',
  components: {
    TransactionList
  },
  computed: {
    ...mapState({
      selectedHouse: state => state.houses.selectedHouse
    }),
    priceSquareMeter () {
      const prices = this.selectedHouse.transactions.map((t) => {
        return t.price / t.surface
      })
      const priceSquareMeter = prices.reduce((count, val) => count + val) / prices.length
      return Math.round(priceSquareMeter * 100) / 100
    }
  },
  mounted () {
  },
  methods: {
    back () {
      this.$store.commit('houses/setSelectedHouse', null)
    }
  }
}
</script>

<style scoped>

.full-width {
  width: 100%;
}

.center-align {
  text-align: center;
}

</style>
