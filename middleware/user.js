import axios from 'axios'

export default function ({ store, route }) {
  return axios.get('/user/me').then((res) => {
    store.commit('user/setUser', res.data)
  }).catch(() => {
    store.commit('user/setUser', null)
  })
}
