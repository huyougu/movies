import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],
  // 公共状态
  state: {
    cityId: '110100',
    cityName: '北京',
    cinemaList: [],
    isTabbarShow: true
  },
  mutations: {
    changecityname (state, cityname) {
      state.cityName = cityname
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    changeCinemaData (state, data) {
      state.cinemaList = data
    },
    clearCinema (state) {
      state.cinemaList = []
      console.log('清除缓存')
    },
    show (state) {
      state.isTabbarShow = true
    },
    hide (state) {
      state.isTabbarShow = false
    }
  }, // 不支持异步
  actions: {
    getCinemaData (store) {
      return http({
        url: `/gateway?cityId=${store.state.cityId}&ticketFlag=1&k=1332101`,
        headers: {
          'X-Host': ' mall.film-ticket.cinema.list'
        }
      }).then(res => {
        console.log('change')
        store.commit('changeCinemaData', res.data.data.cinemas)
      })
    }
  }
})
