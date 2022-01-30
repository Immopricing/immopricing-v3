<template>
  <div class="flex flex-1 flex-col h-32">
    <div class="overflow-x-auto">
      <div class="align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <HouseTransactionsHeader />
            <tbody class="bg-white divide-y divide-gray-200">
              <HouseTransaction
                v-for="(t, index) in transactions"
                :key="index"
                :transaction="t"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HouseTransaction from "./HouseTransaction.vue";
import HouseTransactionsHeader from "./HouseTransactionsHeader.vue";
export default {
  components: { HouseTransactionsHeader, HouseTransaction },
  props: ["transactions"],
};
</script>

<style lang="scss" scoped>
</style>