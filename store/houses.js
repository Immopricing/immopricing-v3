import axios from 'axios';

export const state = () => ({
  city: null,
  selectedHouse: null,
  houses: [],
  displayedHouses: [],
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
  setCity(state, city) {
    state.city = city
  },
  setSelectedHouse(state, house) {
    state.selectedHouse = house;
  },
  setHouses(state, houses) {
    state.houses = houses;
  },
  setDisplayedHouses(state, houses) {
    state.displayedHouses = houses;
  },
  resetState(state) {
    state.city = null;
    state.selectedHouse = null;
    state.houses = [];
    state.houseSettings = {
      houseType: null,
      squareMeters: null,
      rooms: null
    };
    state.estimationData = {
      dataset: null,
      data: []
    };
  },
  setEstimationData(state, data) {
    state.estimationData = data
  }
}

export const actions = {
  getPricesByCity(state, cityDetails) {
    return new Promise((resolve) => {
      axios.post('/immoprice', cityDetails).then((res) => {
        resolve(res.data)
      })
    })
  }
}
