<template>
    <div v-if="filmInfo">
      <detail-header :name='filmInfo.name' v-scroll='50'>
        <!-- {{filmInfo.name}} -->
      </detail-header>
      <!-- 数据不会初始过早 -->
      <!-- <img :src="filmInfo.poster" alt="" style=" width:100%;
    height:12.5rem;"> -->
    <div  :style="{backgroundImage:'url('+filmInfo.poster+')'}" class="poster"></div>
    <div class="content">
<div>{{filmInfo.name}}</div>
<div >
  <div class="detail-text">{{filmInfo.category}}</div>
  <div class="detail-text">{{filmInfo.premiereAt |dateFilter}}上映</div>
  <div class="detail-text">{{filmInfo.nation}} |
    {{filmInfo.runtime}}分钟
    </div>
  <div  class="detail-text" style="line-height:15px;" :class="isHidden?'hidden':''">
    {{filmInfo.synopsis}}
  </div>
  <div style="text-align:center"> <i class="iconfont icon-shuaxin" @click="isHidden=!isHidden" :class="isHidden?'iconfont icon-sousuo':'iconfont icon-shuaxin'"></i></div>
</div>

<div>
  <div>演职人员</div>
  <div>
  <detail-swiper :perview="3.5" name='actors'>
    <detail-swiper-item v-for="(data,index)  in  filmInfo.actors " :key="index">
      <div :style="{backgroundImage:'url('+data.avatarAddress+')'}" class="avatar" > </div>
     <div style="text-align:center;font-size:12px"> {{data.name}}</div>
     <div style="text-align:center;font-size:13px"> {{data.role}} </div>
    </detail-swiper-item>
  </detail-swiper>
  </div>
  <div>
    剧照
  </div>
  </div>
    </div>
  <detail-swiper :perview="2" name='photos'>
   <detail-swiper-item v-for="(data,index) in filmInfo.photos" :key="index">

      <div :style="{backgroundImage:'url('+data+')'}" class="avatar" @click="handlePerview(index)"> </div>
   </detail-swiper-item>

  </detail-swiper>

    </div>
</template>
<script>
import http from '@/util/http'
import moment from 'moment'
import Vue from 'vue'
import detailSwiper from '@/components/detail/DetailSwiper'
import detailSwiperItem from '@/components/detail/DetailSwiperItem'
import DetailSwiper from '../components/detail/DetailSwiper.vue'
import DetailSwiperItem from '../components/detail/DetailSwiperItem.vue'
import detailHeader from '@/components/detail/DetailHeader.vue'
import { ImagePreview } from 'vant'
import obj from '@/util/mixinObj'

console.log(moment().format('YYYY-MM-DD'))
Vue.filter('dateFilter', (date) => {
  return moment(date * 1000).format('YYYY-MM-DD')
})
Vue.directive('scroll', {
  inserted (el, binding)// 指令回调函数,指令需要销毁
  {
    // console.log(el);
    // console.log(binding.value);
  //
    window.onscroll = () => {
      if ((document.documentElement.scrollTop || document.body.scrollTop) < binding.value) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
export default {
  mixins: [obj],
  data () {
    return {
      filmInfo: null,
      isHidden: true

    }
  },
  components: {
    detailSwiper,
    detailSwiperItem,
    DetailSwiper,
    DetailSwiperItem,
    detailHeader

  },
  methods: {
    handlePerview (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true
      })
    }
  },
  //   mounted(){
  //     window.onscroll=()=>{

  //      if(document.documentElement.scrollTop>30){
  //        console.log('显示');
  //      }
  //      else{
  //        console.log('隐藏');
  //      }
  //     }
  //   },
  //   destroyed(){
  // window.onscroll=null
  //   },
  mounted () {
    // this.$route当前匹配的路由
    console.log('created', this.$route.params.myid)// 拿到跳转页面的id
    // axios利用id发请求到详情页面接口，获取数据，布局页面
    http(
      {
        url: `/gateway?filmId=${this.$route.params.myid}&k=2153063`,
        Headers: {
          'X-Host': ' mall.film-ticket.film.info'
        }
      }

    ).then(res => {
      // console.log(res.data.data.film)
      this.filmInfo = res.data.data.film
    })
  }
}
</script>
<style lang="scss" scoped>
    .poster{
      width: 100%;
      height: 13.125rem;
      background-position: center;
      background-size:cover;
    }
    .content{
      padding: .9375rem;
      .detail-text{
        color: #797d82;
        font-size: 13px;
        margin-top: .25rem;
      }
    }
.hidden{
  overflow: hidden;
  height: 30px;
}
.avatar{
  width: 100%;
  height: 5.3125rem;
   background-position: center;
   background-size:cover;

}
</style>
