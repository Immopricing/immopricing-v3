<template>
  <tr>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ unitType }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ transaction.mutated_on }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ transaction.price }} €
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ transaction.estimated_price }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ transaction.surface }} m²
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ transaction.number_of_parts }} pièce(s)
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ pricePerSquareMeter }} €/m²
    </td>
  </tr>
</template>

<script>
import { UNIT_TYPES } from "~/config/house_config";

export default {
  props: ["transaction"],
  computed: {
    unitType() {
      return UNIT_TYPES[this.transaction.unit_type];
    },
    pricePerSquareMeter() {
      return Math.round((this.transaction.price / this.transaction.surface) * 100) / 100;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>