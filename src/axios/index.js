import axios from 'axios'
import store from 'store2'
import router from '@/router/router.js'

const instance = axios.create()

instance.interceptors.request.use(
  config => {
    const token = store.get('token')
    if (token) config.headers.Authorization = token
    return config
  }, error => {
    return Promise.reject(error)
  })

instance.interceptors.response.use(
  response => {
    return response.data
  }, async error => {
    const { status } = error.response
    if (status === 401 || status === 403) {
      router.push({ path: '/login' })
    }
    return Promise.reject(error)
  }
)

export default instance
