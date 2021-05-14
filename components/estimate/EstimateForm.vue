<template>
  <v-form v-model="valid" @change="formChanged">
    <v-container class="">
      <v-row>
        <v-col cols="12">
          <MapsAutocomplete @addressSelected="addressSelected" />
        </v-col>
      </v-row>
      <v-row v-if="selectedAddress">
        <v-col cols="4">
          <v-select
            v-model="settingsModel.houseType"
            :item-text="selectDisplay"
            :items="houseTypes"
            label="Type de bien"
            required
            return-object
            @change="formChanged"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="settingsModel.squareMeters"
            type="number"
            label="Surface (m²)"
            required
            @change="formChanged"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="settingsModel.rooms"
            type="number"
            label="Nombre de pièces"
            required
            @change="formChanged"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import MapsAutocomplete from '~/components/estimate/MapsAutocomplete'

export default {
  name: 'EstimateForm',
  components: {
    MapsAutocomplete
  },
  data () {
    return {
      valid: true,
      settingsModel: {
        houseType: null,
        squareMeters: null,
        rooms: null
      },
      houseTypes: [
        {
          id: 1,
          label: 'Appartement'
        },
        {
          id: 2,
          label: 'Maison'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      selectedAddress: state => state.maps.selectedAddress
    })
  },
  watch: {
    selectedAddress () {
      this.settingsModel = {
        houseType: this.houseTypes[0],
        squareMeters: null,
        rooms: null
      }
    }
  },
  mounted () {
    this.settingsModel.houseType = this.houseTypes[0]
    this.$store.commit('houses/setSettings', { ...this.settingsModel })
  },
  methods: {
    addressSelected (val) {
      if (!val) {
        console.warn('no value selected')
        return
      }
      const postCodeComponent = val.address_components.find(c => c.types.includes('postal_code'))
      if (!postCodeComponent) {
        console.warn('postcode not found in', val)
        return
      }
      this.$emit('postCode', postCodeComponent.short_name)
      this.$emit('addressSelected', val.formatted_address)
    },
    selectDisplay: item => item.label,
    formChanged () {
      this.$store.commit('houses/setSettings', { ...this.settingsModel })
    }
  }
}
</script>

<style scoped>

form {
  width: 100%;
}

</style>
