'use strict'
import {asyncRouterC} from '../router/asyncRouter'
export default{
    getallrouter: (state) => (path) => {
      let moduleRoute = state.asyncRouterlist.filter(val => {
        return path.indexOf(val.path)>=0
      })
      return moduleRoute[0]
    }
}