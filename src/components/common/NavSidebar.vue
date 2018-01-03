<template>
    <el-submenu v-if="item.ismenu && !item.isButton" :index="navIndex"> 
        <!-- 创建父级菜单 -->
        <template slot="title"><i v-if="item.icon" class="item.icon"></i>{{ item.name }}</template>
        <!-- 创建子菜单 -->
        <nav-sidebar v-for="(subItem,i) in item.children" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem" ></nav-sidebar>
    </el-submenu>
    <el-menu-item :class="{'is-active':$route.fullPath===item.path || $route.fullPath.indexOf(item.path)===0}" v-else :index="item.path" :route="{path: item.path}"><i v-if="item.icon" class="item.icon"></i>{{ item.name }}</el-menu-item>
</template>

<script>
    export default {
        name: 'NavSidebar',
        props: ['item','navIndex']
    }
</script>
<style>
  #navsiderbar.el-menu{
    -webkit-transition: none !important;
    -moz-transition: none !important;
    transition: none !important;
    background-color: #0062a7;
    position: fixed;
    width: 200px;
    z-index: 1000;
  }
  #navsiderbar>li{
    border-bottom:1px solid #1b82d0;
  }
  #navsiderbar li,#navsiderbar .el-submenu__title{
    color:#fff;
  }
  #navsiderbar .el-menu-item:hover{
    background:#1c8de0;
  }
  #navsiderbar .el-submenu .el-menu-item:hover, .el-submenu__title:hover{
    background:#1c8de0;
  }
  #navsiderbar .el-submenu .el-menu{
    background:#0062a7; 
  }
  #navsiderbar .el-menu-item, .el-submenu__title{
    height: 44px;
    line-height:44px;
  }
  #navsiderbar .el-menu-item.is-active{
    background:#1c8de0;
  }
</style>


