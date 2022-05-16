<template>

    <div><van-index-bar :index-list="computedlist" @select="handlechange">
      <div>热门城市</div>
       <div v-for="item in hotcity" :key="item.cityId">
           {{item.name}}
       </div>
 <div v-for="data in citylist" :key="data.type">
      <van-index-anchor :index="data.type" />
      <van-cell :title="item.name" v-for="item in data.list" :key="item.cityId" @click="handleclick(item)"/>
 </div>
</van-index-bar></div>
</template>

<script>
import http from '@/util/http'
import { Toast } from 'vant'
import obj from '@/util/mixinObj'

export default {
  mixins: [obj],
  data () {
    return {
      citylist: [],
      hotcity: []

    }
  },
  computed: {
    computedlist () {
      return this.citylist.map(item => item.type)
    }
  },
  methods: {
    handleclick (item) {
      //    this.$store.state.cityName=item.name
      this.$store.commit('changecityname', item.name)
      this.$store.commit('changeCityId', item.cityId)
      this.$store.dispatch('getCinemaData')
      this.$router.back()
    },
    handlechange (data) {
      Toast(data)
    },
    hotcityrender (list) {
      var hotcity = []
      hotcity = list.filter(item => item.isHot == 1)
      return hotcity
    },
    renderCity (list) {
      var letterlist = []

      for (var i = 65; i < 91; i++) {
        // console.log(String.fromCharCode(i));
        letterlist.push(String.fromCharCode(i))
      }
      // console.log(letterlist);
      var citylist = []
      letterlist.forEach(Letter => {
        var newlist = list.filter(item => item.pinyin.substring(0, 1).toUpperCase() == Letter)
        //    console.log(newlist);
        if (newlist.length > 0) {
          citylist.push({
            type: Letter,
            list: newlist
          })
        }
      })
      // console.log(citylist);

      return citylist
    }
  },
  mounted () {
    http({
      url: '/gateway?k=4247412',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res.data.data.cities);
      this.citylist = this.renderCity(res.data.data.cities)
      this.hotcity = this.hotcityrender(res.data.data.cities)
    })
  }

}
</script>
<style>

    .van-toast--html, .van-toast--text {

    min-width: 30px;

}

</style>
