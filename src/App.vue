<template>
  <div>
  <tabbar v-show="this.$store.state.isTabbarShow"></tabbar>
  <section>
    <router-view></router-view>
  </section>
   <!-- 路由容器,插槽封装-->
  </div>
</template>
<script>
import tabbar from '@/components/Tabbar'
import axios from 'axios'
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
export default {
  data () {
    return {
      isShow: true
    }
  },
  components: {
    tabbar
  },
  methods: {
    handleEvent () {
      this.isShow = !this.isShow
    }
  },
  mounted () {
    // axios.get('/ajax/api/mmdb/movie/v3/list/hot.json?ct=%E8%8D%86%E5%B7%9E&ci=257&channelId=4')
    //   .then(res => {

    //   })
  }
}

// https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E8%8D%86%E5%B7%9E&ci=257&channelId=4

</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
html,body{
  height: 100%;
}

  ul{
    list-style: none;
  }
.box{
  width:20.8333rem ;
  height: 10.6667rem;
  background-color: yellow;
}
.link{
  text-decoration: none;
}
section{
  padding-bottom: 3.125rem;
}
</style>>
