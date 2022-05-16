<template>
    <div class="sticky">
        <ul><li><router-link to="/films/nowplaying" active-class="kerwin-active" class="link">正在热映</router-link></li>
        <li><router-link to="/films/comingsoon" active-class="kerwin-active" class="link">即将上映</router-link></li>
        </ul></div>
</template>
<style scoped lang='scss'>
ul{
    display: flex;
    height: 2.77rem;
    line-height: 2.77rem;
    li{
        flex:1;
        text-align: center;

    }
}

.kerwin-active{
    color:red;
    border-bottom: 2px solid red;
}

div.sticky{
      position: -webkit-sticky;
        position: sticky;
        top: 0%;
        padding: 5px;
        background-color:white;
    }
</style>
