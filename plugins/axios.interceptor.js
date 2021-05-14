import axios from 'axios'

axios.interceptors.request.use((config) => {
  if (config.url.startsWith('/')) {
    config.url = process.env.VUE_APP_API_URL + config.url
    config.headers['x-goog-authenticated-user-email'] = process.env.VUE_APP_IAP_USER
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
