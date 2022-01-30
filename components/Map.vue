<template>
  <div id="map" />
</template>

<script>
import { mapState } from "vuex";
import { mapStyle } from "../config/map_style";
import homeIcon from "assets/maps-marker/home.png";
import forSale from "assets/maps-marker/for-sale.png";

export default {
  name: "Map",
  data() {
    return {
      map: null,
      currentMarkers: [],
      currentPolygon: null,
    };
  },
  computed: {
    ...mapState({
      polygon: (state) => state.maps.polygon,
      bounds: (state) => state.maps.bounds,
      houses: (state) => state.houses.houses,
      displayedHouses: (state) => state.houses.displayedHouses,
      selectedAddress: (state) => state.maps.selectedAddress,
      selectedHouse: (state) => state.houses.selectedHouse,
    }),
  },
  watch: {
    polygon(val) {
      if (this.currentPolygon) {
        this.currentPolygon.setMap(null);
      }
      if (!val) {
        return;
      }
      const polygon = new window.google.maps.Polygon({
        paths: val,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      });
      polygon.setMap(this.map);
      const bounds = new window.google.maps.LatLngBounds();
      val.forEach((path) => bounds.extend(path));
      this.moveBounds(bounds);
      this.currentPolygon = polygon;
    },
    selectedAddress(val) {
      this.currentMarkers.forEach((m) => m.setMap(null));
      this.currentMarkers = [];
      this.currentMarkers.push(
        new window.google.maps.Marker({
          position: val.geometry.location,
          map: this.map,
          icon: homeIcon,
          title: val.formatted_address,
        })
      );
      this.moveBounds(this.map.getBounds().extend(val.geometry.location));
    },
    selectedHouse(val) {
      if (!val) {
        this.map.fitBounds(this.bounds);
      } else {
        this.map.setCenter(
          new window.google.maps.LatLng(val.longitude, val.latitude)
        );
        this.map.setZoom(19);
      }
    },
    displayedHouses(houses) {
      this.addHomes(houses);
    },
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 46.06123561766724, lng: 2.516710639479057 },
        zoom: 6,
        styles: mapStyle,
        fullscreenControl: false,
        zoomControl: false
      });
    },
    moveBounds(bounds) {
      this.map.fitBounds(bounds);
      this.$store.commit("maps/setBounds", bounds);
    },
    clearCurrentHomes() {
      this.currentMarkers.forEach((m, i) => {
        if (i === 0) {
          return;
        }
        m.setMap(null);
      });
      this.currentMarkers.splice(1, this.currentMarkers.length - 1);
    },
    addHomes(homes) {
      this.clearCurrentHomes();
      homes.forEach((h) => {
        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(h.longitude, h.latitude),
          map: this.map,
          icon: forSale,
        });
        marker.addListener("click", () => {
          this.$store.commit("houses/setSelectedHouse", h);
        });
        this.currentMarkers.push(marker);
      });
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 1023px) {
  #map {
    height: 50vh;
  }
}

@media screen and (min-width: 1024px) {
  #map {
    height: 100vh;
  }
}
</style>
