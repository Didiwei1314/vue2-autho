<template>
  <div>
    <navbar-header/>
    <navbar-top/>
    <main>
      <!-- 左侧导航 -->
      <div class="main-left">
        <el-menu id="navsiderbar" router :default-active="defaultnav" menu-trigger="click" @select="selectMenu" @open="openMenue">
          <nav-sidebar v-for="(item, n) in sideNavList" :item="item" :navIndex="n.toString()" :key="n"></nav-sidebar>
        </el-menu>
      </div>
       <el-col :span="24" class="breadcrumb-container">
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in breadList" :key="item.name" :to="{ path: item.path }">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      <!-- 右侧主内容区 -->
      <div  class="main-right">
        <keep-alive>
          <router-view v-if="!$route.meta.notAlive"></router-view>
        </keep-alive>
        <router-view v-if="$route.meta.notAlive"></router-view>
      </div>
    </main>
    <!-- 底部Ipc -->
    <div class="main-bottom">
      <p>Copyright © 2015 广州合生星景商务有限公司（合生创展集团附属机构）粤ICP备15089941号.3</p>
    </div>
  </div>
</template>

<script>
    import NavbarHeader from './NavbarHeader.vue'
    import NavbarTop from './NavbarTop.vue'
    import NavSidebar from './NavSidebar.vue'
    import {asyncRouterC} from '../../router/asyncRouter'

    export default {
      components:{
         NavbarHeader,
         NavbarTop,
         NavSidebar
      },
      computed: {
        sideNavList () {
          return this.$store.getters.getallrouter(this.$route.path).children
        },
        defaultnav () {
          var patharr = this.$route.path.split('/')
          if(patharr.length>=3){
            patharr = patharr.slice(0,3)
          }
          return patharr.join('/')
        },
        breadList () {
          let list = this.$route.matched
          let last = list[list.length-1].path.split('/')
          let res = []
          let box1 = []
          let box2 = []
          last.forEach(item => {
            box1.push(item)
            if(last.length>=3){
              let newpath = box1.join('/')
              if(newpath)res.push(newpath)
            }
          })
          res[0] = {
            path: list[0].path,
            name: list[0].meta.title
          }
          for(var i=1;i<res.length;i++){
            asyncRouterC.forEach(item => {
              if(res[i]===item.path){
                res[i] = {
                  path: item.path,
                  name: item.meta.title
                }
              }
            })
          }
          return res
        }
      },
      methods:{
        selectMenu(){

        },
        openMenue(index,obj){
          // console.log(index,obj)
        }
      },
        mounted () {
          // console.log(this.$store.state)
        }
    }
</script>

<style lang="scss" scoped>
  /* 主内容区 */
  main{
     display: -webkit-box;display:
     -ms-flexbox;display: flex;
      min-height: 800px;
      margin-top: 46px;
      // height:auto!important; 
      height:100%;
  }
  main .main-left{
    text-align: center;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 200px;
    flex: 0 0 200px;
    background: #0062a7;
    min-height:800px;
  }
  main .main-right{
    -webkit-box-flex:1;
    -ms-flex:1;
    flex:1;
    background-color: #fff;
    margin: 70px 20px 0 20px;
    height: 100%;
    min-height:780px;
    width: 100%;
    position: relative;
  }
  .main-bottom{
      width: 100%;
      p{
        height: 50px;
        line-height: 50px;
        background: #e9e9e9;
        text-align: center;
      }
  }
  main .el-menu{
    background-color: transparent!important;
  }
  /*  */
  .router-link{
    display:inline-block;
    width:100%;
    height:100%;
    text-align:center;
    color:#475669;
    text-decoration: none;
  }
  .is-active .router-link{
    color:#20a0ff;
    color: #fff;
  }

  /* 单选框 */
    .el-form-item .el-radio+.el-radio {
      margin-left: 30px!important;
    }
    /* 路由切换动效 */
    .fade-enter-active, .fade-leave-active {
      transition: all .5s;
    }
    .fade-enter, .fade-leave-active {
      opacity: 0;
    }

    .list-enter-active, .list-leave-active {
      transition: all 1s;
    }
    .list-enter, .list-leave-active {
      opacity: 0;
      transform: translateY(30px);
    }

  /* 导航栏菜单选中效果 */
    .isActive{
      color:#fff!important;
      background: #0786cc;
    }
     #app main .aside .is-active{
       color: #475669;
     }

    /* 卡片 */
    .el-card{
      overflow: visible!important;
    }
    /*头部标签*/ 
    .tagnav{
      margin-bottom: 15px;
      .el-tag + .el-tag {
        margin-left: 5px;
      }
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .el-tag a{
        color:#fff;
        text-decoration:none;
      }
    }
    .el-tag.active-nav{
      background-color:rgba(0, 0, 0, 0.5);
    }
    // 面包屑导航
    .breadcrumb-container{
      position: absolute;
      padding: 20px 40px 20px 220px;
    }
    .el-breadcrumb{
      line-height: 32px;
      border-radius: 8px 8px 0 0;
      padding:0 16px;
      background-image: -webkit-repeating-linear-gradient(#ccc, #fff 80px);
    }
</style>
