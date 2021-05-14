export const state = () => ({
  city: null,
  selectedHouse: null,
  houses: [],
  inNeighborhoodOpen: false,
  inCityOpen: false,
  similarOpen: false,
  estimationData: {
    dataset: null,
    data: []
  },
  houseSettings: {
    houseType: null,
    squareMeters: null,
    rooms: null
  }
})

export const mutations = {
  setCity (state, city) {
    state.city = city
  },
  setSelectedHouse (state, house) {
    state.selectedHouse = house
  },
  setHouses (state, houses) {
    state.houses = houses
  },
  setInNeighborhoodOpen (state, value) {
    state.inNeighborhoodOpen = value
  },
  setInCityOpen (state, value) {
    state.inCityOpen = value
  },
  setSimilarOpen (state, value) {
    state.similarOpen = value
  },
  setSettings (state, settings) {
    state.houseSettings = settings
  },
  resetState (state) {
    state.city = null
    state.selectedHouse = null
    state.houses = []
    state.inNeighborhoodOpen = false
    state.inCityOpen = false
    state.similarOpen = false
    state.houseSettings = {
      houseType: null,
      squareMeters: null,
      rooms: null
    }
    state.estimationData = {
      dataset: null,
      data: []
    }
  },
  setEstimationData (state, data) {
    state.estimationData = data
  }
}

export const actions = {}
