// 对数据请求的封装
import axios from 'axios'
import { Toast } from 'vant'
// function httpforlist() {
//     return axios({
//         url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=9849170',
//         headers: {
//             'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1649154371332086871326721"}',
//             'X-Host': ' mall.film-ticket.film.list'
//         }
//     })
// }

// function httpfordetail(params) {
//     return axios({
//         url: `https://m.maizuo.com/gateway?filmId=${params}&k=2153063`,
//         headers: {
//             'X-Client-Info': ' {"a":"3000","ch":"1002","v":"5.2.0","e":"1649154371332086871326721","bc":"310100"}',
//             'X-Host': ' mall.film-ticket.film.info'
//         }
//     })
// }

// function httpforcinemas() {
//     return axios({
//         url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=1332101',
//         headers: {
//             'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1649154371332086871326721"}',
//             'X-Host': ' mall.film-ticket.cinema.list'
//         }
//     })
// }
// // export default {
// //     httpforlist,
// //     httpfordetail,
// //     httpforcinemas

// // }
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 3000,
  headers: {
    'X-Client-Info': ' {"a":"3000","ch":"1002","v":"5.2.0","e":"1649154371332086871326721","bc":"310100"}',
    'X-Host': ' mall.film-ticket.film.info'
  }
})

// Add a request interceptor
// 在发请求之前拦截--showloading
http.interceptors.request.use(function (config) {
  // Do something before request is sent

  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
// 成功后拦截--hidenloading
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  Toast.clear()
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  Toast.clear()

  return Promise.reject(error)
})
export default http
