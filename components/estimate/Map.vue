<template>
  <div id="map" />
</template>

<script>
import { mapState } from 'vuex'
import homeIcon from 'assets/maps-marker/home.png'
import forSale from 'assets/maps-marker/for-sale.png'

export default {
  name: 'Map',
  data () {
    return {
      map: null,
      currentMarkers: [],
      currentPolygon: null
    }
  },
  computed: {
    ...mapState({
      polygon: state => state.maps.polygon,
      bounds: state => state.maps.bounds,
      selectedAddress: state => state.maps.selectedAddress,
      selectedHouse: state => state.houses.selectedHouse
    })
  },
  watch: {
    polygon (val) {
      if (this.currentPolygon) {
        this.currentPolygon.setMap(null)
      }
      if (!val) {
        return
      }
      const polygon = new window.google.maps.Polygon({
        paths: val,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      })
      polygon.setMap(this.map)
      const bounds = new window.google.maps.LatLngBounds()
      val.forEach(path => bounds.extend(path))
      this.moveBounds(bounds)
      this.currentPolygon = polygon
    },
    selectedAddress (val) {
      this.currentMarkers.forEach(m => m.setMap(null))
      this.currentMarkers = []
      this.currentMarkers.push(new window.google.maps.Marker({
        position: val.geometry.location,
        map: this.map,
        icon: homeIcon,
        title: val.formatted_address
      }))
      this.moveBounds(this.map.getBounds().extend(val.geometry.location))
    },
    selectedHouse (val) {
      if (!val) {
        this.map.fitBounds(this.bounds)
      } else {
        this.map.setCenter(new window.google.maps.LatLng(val.longitude, val.latitude))
        this.map.setZoom(19)
      }
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 46.06123561766724, lng: 2.516710639479057 },
        zoom: 6
      })
    },
    moveBounds (bounds) {
      this.map.fitBounds(bounds)
      this.$store.commit('maps/setBounds', bounds)
    },
    addHomes (homes) {
      if (homes.length === 0) {
        this.currentMarkers.forEach((m, i) => {
          if (i === 0) {
            return
          }
          m.setMap(null)
        })
        this.currentMarkers.splice(1, this.currentMarkers.length - 1)
      } else {
        homes.forEach((h) => {
          this.currentMarkers.push(new window.google.maps.Marker({
            position: new window.google.maps.LatLng(h.longitude, h.latitude),
            map: this.map,
            icon: forSale
          }))
          this.currentMarkers[this.currentMarkers.length - 1].addListener('click', () => {
            this.$store.commit('houses/setSelectedHouse', h)
          })
        })
      }
    }
  }
}
</script>

<style scoped>

#map {
  height: calc(80vh - 24px);
  width: calc(100% - 24px);
}

</style>
