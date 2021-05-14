<template>
  <v-list>
    <v-list-item-group
      v-model="selectedHouse"
      color="primary"
    >
      <v-virtual-scroll
        :items="items"
        height="150"
        item-height="64"
        class="items-container"
      >
        <template #default="{ item, idx }">
          <v-list-item
            :key="idx"
            @click="selectedHouseChanged(item)"
          >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.address }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.transactions.length }} vente{{ item.transactions.length > 1 ? 's' : '' }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'HouseList',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedHouse: null
    }
  },
  methods: {
    selectedHouseChanged (house) {
      this.$store.commit('houses/setSelectedHouse', house)
    }
  }
}
</script>

<style scoped>

</style>
