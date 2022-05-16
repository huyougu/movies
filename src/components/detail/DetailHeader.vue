<template>
    <div class="header">
        <i class="iconfont icon-shouye" @click="handleBack"></i>
      {{na}}
    </div>
</template>
<style scoped lang='scss'>
.header{
    position: fixed;
    top: 0%;
    left: 0%;
    height: 2.75rem;
    width: 100%;
    line-height: 2.75rem;
    background-color: white;
    text-align: center;
    i{
        font-size: 1.875rem;
        position: fixed;
        left: .625rem;
        top: 0%;

    }
}
</style>
<script>
import { months } from 'moment'
export default {
  props: ['name'],
  data () {
    return {
      na: this.name
    }
  },
  methods: {
    handleBack () {
      this.$router.back()// 返回上一个页面
    }
  }
}

</script>
