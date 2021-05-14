<template>
  <v-row>
    <v-col>
      <h1>
        <slot />
      </h1>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PageHeader'
}
</script>

<style scoped>

h1 {
  margin: 10px 0;
}

</style>
