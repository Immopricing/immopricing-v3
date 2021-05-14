<template>
  <v-list six-line class="list-container">
    <v-subheader>
      Liste des biens vendus ({{ items.length }})
    </v-subheader>
    <v-divider />

    <template v-for="(item, index) in items">
      <v-list-item :key="index">
        <v-list-item-avatar>
          <v-icon
            v-if="item.unit_type === 1"
          >
            mdi-home-city
          </v-icon>
          <v-icon
            v-if="item.unit_type === 2"
          >
            mdi-home
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ item.unit_type === 1 ? 'Appartement' : 'Maison' }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.surface }} m²</v-list-item-subtitle>
          <v-list-item-subtitle>{{ item.number_of_parts }} pièces</v-list-item-subtitle>
          <v-list-item-subtitle>{{ item.estimated_price }} € estimé</v-list-item-subtitle>
          <v-list-item-subtitle>{{ item.price }} € vendu</v-list-item-subtitle>
          <v-list-item-subtitle>Vendu le {{ item.mutated_on }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'TransactionList',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

.list-container {
  max-height: 40vh;
  overflow-y: auto;
}

</style>
