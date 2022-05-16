<template>
    <div>
<van-nav-bar title="影院"  ref='navbar' @click-left="handleLeft" @click-right="handleRight">
    <template #left>
    {{$store.state.cityName}}
    <van-icon name="arrow-down" />
  </template>
  <template #right>
    <van-icon name="search" size="18"  color="black"/>
  </template>
</van-nav-bar>
       <div class="cinema" :style="{height:height}">
            <ul>
            <li v-for="data in $store.state.cinemaList" :key="data.cinemaId">
              <div class="left">
                  <div class="cinema_name"> {{data.name}}</div>
               <div class="cinema_text">{{data.address}}</div>
               </div>
               <div class="right cinema_name">
                   <div style="color:red">
                       ￥{{data.lowPrice/100}}起
                   </div>
               </div>
            </li>
        </ul>
       </div>
    </div>
</template>
<script>

import BetterScroll from 'better-scroll'
import axios from 'axios'
export default {
  methods: {
    handleLeft () {
      // console.log('left');
      this.$router.push('/city')
      this.$store.commit('clearCinema')
      // 清空缓存
    },
    handleRight () {
      this.$router.push('/search')
    }
  },
  data () {
    return {
      height: '0px'
    }
  },

  mounted () {
    console.log(this.$refs.navbar.$el)

    // 动态计算高度
    this.height = document.documentElement.clientHeight - document.querySelector('footer').offsetHeight - this.$refs.navbar.$el.offsetHeight + 'px'
    // this.height=document.documentElement.clientHeight-30-this.$refs.navbar.$el.offsetHeight+'px'
    // 分发
    if (this.$store.state.cinemaList.length == 0) {
      this.$store.dispatch('getCinemaData', this.$store.state.cityId).then(res => {
        console.log('数据完事了')
        this.$nextTick(() => {
          new BetterScroll('.cinema', {
            scrollbar: {
              fade: true
            }
          })
        })
      }
      )
    } else {
      console.log('缓存')
      this.$nextTick(() => {
        new BetterScroll('.cinema', {
          scrollbar: {
            fade: true
          }
        })
      })
    }

    //   http({
    //        url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=1332101`,
    //     headers: {
    //         'X-Host': ' mall.film-ticket.cinema.list'
    //     }
    //     }).then(res=>{
    //         //  console.log(res.data);
    //         this.cinemalist=res.data.data.cinemas
    //    this.$nextTick(()=>{
    //         new BetterScroll('.cinema',{
    //             scrollbar:{
    //                 fade:true
    //             }
    //         })
    //        })}
    //     )
  }
}

// betterScroll提升滑动性能

</script>

<style scoped lang='scss'>
li{
    padding:.9375rem;
    display: flex;
    justify-content: space-between;
    .left{
        width: 13.25rem;
    }
}
.cinema_name{
    font-size: 15px;
}
.cinema_text{
    color: #797d82;
    font-size: 12px;
    margin-top: 5px;
     overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}
.cinema{
    // height:38.625rem;
    overflow: hidden;
    position: relative;
    //修正滚动条位置
}
</style>
