export const state = () => ({
  user: null
})

export const mutations = {
  load (state) {
    if (state.user) {
      return
    }
    if (process.env.NODE_ENV === 'local') {
      state.user = { email: process.env.VUE_APP_IAP_USER }
    }
  }
}
