import axios from 'axios'
import history from './history'

const appID = 'PzutokfofqknrEzTaJUBkmJA'
const appSecret = 'GUxobVHJT88pGFeDLtBpyT3D'

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
})

instance.interceptors.request.use(function (config) {
  const xToken = localStorage.getItem('x-token')
  if (xToken) {
    config.headers['Authorization'] = `Bearer ${xToken}`
  }
  return config
}, function (error) {
  console.error(error)
  return Promise.reject(error)
})


instance.interceptors.response.use(function (response) {
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token'])
  }
  return response
}, function (error) {
  if(error.response.status === 401){
    history.push('/login')
  }
  return Promise.reject(error)
})

export default instance
