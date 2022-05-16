import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/Films.vue'
import NowPlaying from '@/views/films/NowPlaying.vue'
import Comingsoon from '@/views/films/Comingsoon.vue'
import Cinemas from '@/views/Cinemas.vue'
import Center from '@/views/Center.vue'
import About from '@/views/About.vue'
import Detail from '@/views/Detail.vue'
import City from '@/views/City.vue'
// import Order from '@/views/Order.vue'
import Login from '@/views/Login.vue'
import search from '@/views/Search.vue'
import { Search } from 'vant'
Vue.use(VueRouter)

const routes = [{
  path: '/films',
  component: Films,
  // 嵌套路由
  children: [{
    path: '/films/nowplaying',
    component: NowPlaying
  },
  {
    path: '/films/comingsoon',
    component: Comingsoon
  },
  {
    path: '/films',
    redirect: '/films/nowplaying'
  }
  ]
},
{
  path: '/detail/:myid', // 动态二级路由
  component: Detail
},
{
  path: '/cinemas',
  component: Cinemas
},

{
  path: '/center',
  component: Center,
  meta: {
    ispjhrequire: true // 路由源
  }
},
{
  path: '/login',
  component: Login
},
{
  path: '/city',
  component: City
},
{
  path: '/search',
  component: search
},
{
  path: '/order',
  component: () =>
    import('@/views/Order.vue'),
  meta: {
    ispjhrequire: true
  }
},
{
  path: '/about',
  component: About
},
{
  path: '*', // 通配符
  redirect: '/films' // 路由重定向默认路由指向
}
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.fullPath) // 路由全局拦截
  if (to.meta.ispjhrequire) {
    // 判断本地储存是否token
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
