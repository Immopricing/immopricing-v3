<template>
  <v-navigation-drawer permanent>
    <v-list-item class="header">
      <v-list-item-content>
        <v-list-item-title class="title">
          Immopricing
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ user ? user.email : 'Chargement...' }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Drawer',
  data: () => ({
    items: [
      { title: 'Accueil', icon: 'mdi-home', link: '/' },
      { title: 'Estimation', icon: 'mdi-cash', link: '/estimate' }
    ]
  }),
  computed: {
    ...mapState({
      user: (state) => {
        return state.user.user
      }
    })
  }
}
</script>

<style scoped>

</style>
