'use strict'
import types from './mutation-types'
import Cookies from '../utils/Cookie'

export default {
    [types.SET_USERINFO]: (state, info) => {
        state.userinfo.name = info.name
        if(info.name){
            state.userinfo.name = info.name
            Cookies.set('name',info.name)
        }
        if(info.USER_ID){
            state.userinfo.userId = info.USER_ID
            Cookies.set('userId',info.USER_ID)
        }
        if(info.HOPSON_SESSION_ID){
            state.userinfo.sessonid = info.HOPSON_SESSION_ID
            Cookies.set('sessonId',info.HOPSON_SESSION_ID)
        }
        if(info.TOKEN){
            state.userinfo.token = info.TOKEN
            Cookies.set('token',info.TOKEN)
        }
    },
    [types.SET_ROUTERALL]: (state, routes) => {
        sessionStorage.setItem('autholist',routes)
    },
    [types.RESET_ROUTERALL]: (state, routes) => {
        state.asyncRouterlist = routes
    },
    [types.LOGOUT]: (state) => {
        Cookies.del('userId')
        Cookies.del('sessonId')
        Cookies.del('token')
    }
}