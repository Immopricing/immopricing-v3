
export const state = () => ({
  polygon: null,
  map: null,
  selectedAddress: null,
  bounds: null
})

export const mutations = {
  setPolygon (state, polygon) {
    state.polygon = polygon
  },
  setMap (state, map) {
    state.map = map
  },
  setSelectedAddress (state, address) {
    state.selectedAddress = address
  },
  setBounds (state, bounds) {
    state.bounds = bounds
  },
  resetState (state) {
    state.polygon = null
    state.map = null
    state.selectedAddress = null
    state.bounds = null
  }
}

export const actions = {
}
