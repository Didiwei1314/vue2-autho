import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Cookies from '../utils/Cookie'
import routerMatch from '../utils/matchtouter'
import routes from './baseroute'
Vue.use(VueRouter)

let router = new VueRouter({
  // mode: 'history',
  routes: routes
})
const routerbefore = function(bol){
  //默认进入系统设置，判断与没有系统设置路由权限，如果没有跳转到其他页面
  let defaultpatharr = router.options.routes.filter(function(item) {
    return item.path == '/system'
  })
  var defaultpath = router.options.routes[router.options.routes.length-1].path
  if(bol && defaultpatharr.length>0){
    router.replace('/system')
  }else{
    router.replace(defaultpath)
  }
  router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
      next('/')
    }
    if (Cookies.get('token')) {
        if (to.name === 'Login') {
          if(defaultpatharr.length>0){
            next('/system')
          }else{
            next(defaultpath)
          }
          
        } else {
          next()
        }
    } else {
      // 未登录状态下
      if (to.name === 'Login') {
        next()
      } else {
        next({name: 'Login'})
      }
    }
  })
}
//刷新页面从新获取权限列表
if (store.state.asyncRouterlist.length === 0 && Cookies.get('token')) {
    let permission = sessionStorage.getItem('autholist')
    if(!permission){
      routerbefore()
      store.dispatch('logout')
    }else{
      let res = JSON.parse(permission)
      let response = routerMatch(res)
      store.dispatch('resetRoutesAll',res)
      router.addRoutes(response)
      router.options.routes = router.options.routes.concat(response)
      console.log('重新获取权限列表成功')
      routerbefore(/\/login/.test(window.location.hash))
    }
    
}else{
    routerbefore()
}

export default router
