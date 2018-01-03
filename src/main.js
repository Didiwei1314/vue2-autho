import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/sass/common.scss'
import './assets/reset.css'
import store from './store/index'
import mixin from './mixin/mixin' // 本地数据储存
import Cookies from './utils/Cookie'
const R = require('ramda') // 数组json工具类
const M = require('moment') // 日期工具类
require('./api/')
Vue.prototype.R = R
Vue.prototype.M = M
Vue.prototype.Cookies = Cookies
Vue.use(mixin)
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
