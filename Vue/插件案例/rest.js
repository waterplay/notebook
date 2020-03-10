import axios from "axios"

const $axios = axios.create({
  baseUrl: '/',
  timeout: 1000,
  loading: true
})

// 请求拦截
$axios.interceptors.request.use(options => {
  // ...
})

// 响应拦截器
$axios.interceptors.response.use(options => {

}, error => {

})

const RES_CODE = {
  SUCCESS: 0,
  ERROR: 404,
  // ...
}

const install = Vue => {
  Vue.prototype.$rest = $axios
  Vue.prototype.RES_CODE = RES_CODE
}

export default install;