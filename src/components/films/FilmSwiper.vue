<template>
    <div class="swiper">
            <div class="swiper-wrapper">
               <slot></slot>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>

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
    loop: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    new Swiper('.swiper', {
      // direction: 'vertical', // 垂直切换选项
      loop: this.loop, // 循环模式选项

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
      scrollbar: {
        el: '.swiper-scrollbar'
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    })
  }
}
</script>
