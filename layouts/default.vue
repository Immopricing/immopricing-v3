<template>
  <v-app dark class="main">
    <v-row>
      <v-col cols="2">
        <Drawer />
      </v-col>

      <v-col>
        <v-main>
          <nuxt />
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Drawer from '~/components/Drawer'

export default {
  components: {
    Drawer
  },
  data () {
    return {
    }
  },
  head () {
    return {
      title: 'Immopricing'
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>

.main {
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
}

</style>
