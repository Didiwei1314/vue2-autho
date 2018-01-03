<template>
  <div class="login_bg">
      <div class="login_box">
          <div class="login_por">
            <div class="login_top"></div>
            <div class="login_center">
              <ul>
                <li class="username">
                    <el-input v-model="userData.username" size="large" placeholder="用户名"  @keyup.enter.native="login"></el-input>
                    <span></span>
                </li>
                <li class="psw">
                    <el-input v-model="userData.password" size="large" placeholder="密码" type="password"  @keyup.enter.native="login"></el-input>
                    <span></span>
                </li>
                <li class="login_btn">
                    <el-button  type="primary" size="large" @click="login" @keyup.13="login($event)">登 录</el-button>
                </li>
              </ul>
          </div>
            <div class="login_bot"></div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import store from '../../store'
import Login from '@/components/login/Login'
import routerMatch from '../../utils/matchtouter'
import Routes from '../../router/baseroute'
  export default {
    data () {
      return {
        userData:{
          username:'',
          password:''
        }
      }
    },
    methods : {
      ...mapActions({
        signin: 'signin',
        resetRoutesAll: 'resetRoutesAll'
      }),
      login(ev) {
        let username = this.userData.username;
        let password = this.userData.password;
        if (password == '' || username == '') {
            this.$message({
                message : '用户名或密码有误!',
                type : 'error'
            })
        } else {
          let postdata = {
              username: username,
              password: password
          };
          this.signin(postdata).then(resinfo => {
              let authList = JSON.parse(resinfo.authList)
              let response = routerMatch(authList)
              // this.resetRoutesAll(authList)
              store.dispatch('resetRoutesAll',authList)
              this.$router.addRoutes(response)
              this.$router.options.routes = Routes.concat(response)
              let router = this.$router.options.routes
              console.log('登录获取权限列表成功')
              // this.$router.push('/system')
              let defaultpatharr = router.filter(function(item) {
                return item.path == '/system'
              })
              var defaultpath = router[router.length-1].path
              if(defaultpatharr.length>0){
                this.$router.push('/system')
              }else{
                this.$router.push(defaultpath)
              }
          })
        }
      }
    },
    mounted(){
      
    }
  }
 </script>
 <style lang="scss" scoped>
 @import '../../assets/sass/login.scss';

.el-input__inner{
   height: 55px!important;
}
</style>
