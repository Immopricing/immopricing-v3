import axios from 'axios'

export const getPricesByCity = (cityDetails) => {
  return new Promise((resolve) => {
    axios.post('/immoprice', cityDetails).then((res) => {
      resolve(res.data)
    })
  })
}
