<template>
    <div>
       <film-swiper :key="datalist.length">
         <!-- 防止图片初始化过早 -->
        <film-swiper-item v-for="data in datalist" :key="data.filmId" class="filmswiperitem">
           <img :src="data.poster"  class="swiperphoto">
        </film-swiper-item>
       </film-swiper>
        <div>
           <film-header class="sticky"></film-header>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import filmHeader from '@/components/films/FilmHeader'
import filmSwiper from '@/components/films/FilmSwiper'
import filmSwiperItem from '@/components/films/FilmSwiperItem'

import axios from 'axios'
export default {
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    axios.get('test.json').then(res => {
      this.datalist = res.data.data.films
    })
  },
  components: {
    filmSwiper,
    filmSwiperItem,
    filmHeader
  }
}
</script>
<style  lang="scss" scoped>
    .sticky{
        position: sticky;
        top:0rem;
        background: white;
        z-index: 100;
    }

   .swiperphoto{
       width: 100%;
       height: 13.125rem
   }

</style>
