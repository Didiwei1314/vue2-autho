<template>
    <div>
      <!-- 头部导航 -->
        <header class="header" :class="{ 'header-fixed' : headerFixed }">
          <div class="Scrollbar">
            <span class="logo"><img src="../../assets/logo.png" alt=""></span>
              <el-row>
                  <el-col :span="24">
                    <el-menu :default-active="$route.matched[0].path" class="el-menu-demo" mode="horizontal" @select="tofunction">
                      <el-menu-item v-for="modul in navList" :key="modul.path" :index="modul.path"><i :class="modul.path.substr(1)" class="icon-top"></i>{{modul.name}}</el-menu-item>
                    </el-menu>
                  </el-col>
              </el-row>
          </div>
        </header>
        <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                active:true,
                headerFixed : true,
                horizontal:null,
                roleId: ''
            }
        },
        computed:{
        ...mapState({
            navList: state => state.asyncRouterlist
        }),
        onRoutes(){
            return this.$route.path
        },
        navMode(){
            if(this.layout == "left"){
                return "vertical"
            }
            if(this.layout == "top"){
                return "horizontal"
            }
        }
      },
        methods: {
          tofunction(key){
            if(key.indexOf('0')==-1)this.$router.push(key);
          }
        },
        mounted(){
          
        }
    }
</script>
<style lang="scss" scoped>

@import '../../assets/icon-live/iconfont.css';
/* 头部导航 */
header{
  z-index: 1001;
  min-width: 1200px;
  scroll-behavior: auto;
  transition: all 0.5s ease;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
}
.Scrollbar{
  background-color: #384653 !important;
  width: 100%; 
  .el-menu{
    background-color: #384653 !important;
  }
}
header.header-fixed{
  position: fixed;
  top: 26px;
  left: 0;
  right: 0;
}
.el-row{
  padding-left:200px;
}
.logo{
  float: left;
  display: block;
  width:200px;
  margin-top:10px; 
}
.el-menu--horizontal .el-menu-item{
  color:#f6f6f6;
  height: 80px;
  // line-height:80px;
  &:hover{
     background-color: rgba(0,0,0,.1);
  color:#fff;
  }
  &.is-active{
    border-bottom: 5px solid #20a0ff;
    background-color: rgba(0,0,0,.1);
  }
}
.el-menu-item [class^=el-icon-]{
  display: block;
  font-size: 16px;
  width:auto;
  position: relative;
  top: 12px;
}
.icon-top{
  display: block;
  width: 26px;
  height: 26px;
  margin: 14px auto -14px;
  background: url('../../../static/img/icons2.png');
  background-size: 100% auto;
  &.accesscontrol{
    background-position: center -100px;
  }
  &.system{
    background-position: center -2px;
  }
  &.baseinfo{
    background-position: center -34px;
  }
  &.service{
    background-position: center -68px;
  }
}
</style>
