<template>
    <div>
       <van-list
  v-model="loading"
  :finished="finished"
  finished-text="我是有底线的"
  @load="onLoad"
  :immediate-check='false'
>
            <van-cell v-for="data in datalist" :key="data.filmId" @click="handleChangepage(data.filmId)">
              <img :src="data.poster" alt="">
                <div>
                  <div class="title">{{data.name}}</div>
                  <div class="content">
                    <div :class="data.grade?'':'hidden'">观众评分:
                    <span style="color:red">
                      {{data.grade}}
                    </span>
                  </div>
                  <div class="actors">
                   主演:  {{data.actors|actorsFilter}}
                  </div>
                  <div>
                    {{data.nation}} | {{data.runtime}}分钟
                  </div>
                  </div>
                </div>
            </van-cell >
        </van-list>
    </div>
</template>
<script>
import axios from 'axios'
import http from '@/util/http'
// 编程式导航
import Vue from 'vue'
Vue.filter('actorsFilter', (data) => {
  console.log(data.map(item => item.name))
  if (data == undefined) {
    return '暂无主演'
  }
  return data.map(item => item.name).join(' ')
}
)
export default {
  mounted () {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=9849170`,
      headers: {
        'X-Host': ' mall.film-ticket.film.list'
      }
    }).then(res => {
      console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  methods: {
    onLoad () {
      // 长度匹配，禁用懒加载
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }
      console.log('到底了')
      this.current++
      axios({
        url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=9849170`,
        headers: {
          'X-Host': ' mall.film-ticket.film.list',
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"1649154371332086871326721"}'
        }
      }).then(res => {
        console.log(res.data.data.films)
        this.datalist = [...this.datalist, ...res.data.data.films],
        this.loading = false
      })
    },
    handleChangepage (id) {
      // location.href='#/detail'//编程式导航利用BOM跳转
      this.$router.push(`/detail/${id}`)// vue路由指定编程式跳转方式可根据判断跳转方式
    }
  }

}
</script>
<style scoped lang="scss">
.van-list{
  .van-cell{
    overflow: hidden;//清除浮动避免对后面的节点造成影响
    padding: .9375rem;
    img{
      float:left;
      width:4.125rem;

    }
    .title{
      font-size: 1rem;
    }
    .content{
      font-size: .8125rem;
      color: gray;
       .actors{
     overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 12.5rem;
    }
    }

  }
}
.hidden{
  visibility: hidden;
}
</style>
