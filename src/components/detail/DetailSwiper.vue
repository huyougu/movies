<template>
    <div  class="swiper" :class="name">
            <div class="swiper-wrapper">
               <slot></slot>
            </div>
            <!-- 如果需要分页器 -->
            <!-- <div class="swiper-pagination"></div> -->

            <!-- 如果需要导航按钮 -->
            <!-- <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div> -->

            <!-- 如果需要滚动条 -->
            <!-- <div class="swiper-scrollbar"></div> -->
        </div>
</template>
<script>
import Swiper from 'swiper/swiper-bundle'
import 'swiper/swiper-bundle.css'
export default {
  props: {
    perview: {
      type: Number,
      default: 1

    },
    name: {
      type: String,
      default: 'swiper'
    }
  },
  mounted () {
    new Swiper('.' + this.name, {
      slidesPerView: this.perview,
      spaceBetween: 30,
      freeMode: true
      // direction: 'vertical', // 垂直切换选项
      // 循环模式选项

      //   如果需要分页器
      //    pagination: {
      //      el: '.swiper-pagination',
      //    },
      // 如果需要前进后退按钮
      // navigation: {
      // nextEl: '.swiper-button-next',
      // prevEl: '.swiper-button-prev',
      // },
      // 如果需要滚动条
    //   scrollbar: {
    //     el: '.swiper-scrollbar'
    //   },
    //   autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false
    //   }
    })
  }
}
</script>
