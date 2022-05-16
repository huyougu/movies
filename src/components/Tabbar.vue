<template>
<footer>
    <ul>
    <!--声明式导航   自定义class名称
    新写法
     <router-link to="/films" custom v-slot="{navigate,isActive}"
    <li @click="navigate" :class="isActive?'kerwinactive':'' ">电影</li>

    -->
    <li>
      <router-link to="/films" active-class="kerwin-active" trg="li" class="link"><span class="iconfont icon-faxian"></span>
      <li>电影</li>
      </router-link>
    </li>
    <li>
      <router-link to="/cinemas"  active-class="kerwin-active" class="link"><span class="iconfont icon-sousuo"></span>  <li>影院</li></router-link>
    </li>
    <li>
      <router-link to="/center"  active-class="kerwin-active" class="link"> <span class="iconfont icon-shouye"></span>  <li>中心</li></router-link>
    </li>
  </ul>
  </footer>
</template>
<style lang="scss" scoped>

  footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2.72rem;;
    background: white;
    z-index: 100;
    ul{
      display: flex;

      li{
        flex:1;
        text-align: center;
        display:flex;
        flex-direction:column;
      }
    }
  }
   .kerwin-active{
    color: red
  }
</style>
