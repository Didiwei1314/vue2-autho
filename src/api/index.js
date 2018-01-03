import Vue from 'vue'
import request from './request'
import settings from './settings'

Vue.prototype.$api = {
  request,
  settings
}
export default{
  request,
  settings
}
