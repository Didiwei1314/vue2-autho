'use scrict'
import types from './mutation-types'
import api from '../api/index'
import axios from 'axios'
import Cookies from '../utils/Cookie'
// import permissiono from './data/permission'

export default {
    //获取权限列表
    resetRoutesAll: ({commit}, routes) => {
        let name = Cookies.get('name')
        let userid = Cookies.get('userId')
        let sessonid = Cookies.get('sessonId')
        let token = Cookies.get('token')
        if(userid && token)commit(types.SET_USERINFO, {name: name,USER_ID:userid,HOPSON_SESSION_ID:sessonid,TOKEN: token})
        commit(types.RESET_ROUTERALL, routes)
    },
    //登录
    signin: ({commit}, data) => {
        return new Promise((resolve, reject) => {
            api.request('post',api.settings.login, data, function(res){
                res.name = data.username
                // res.authList = JSON.stringify(permissiono)
                // console.log(JSON.parse(res.authList))
                commit(types.SET_ROUTERALL, res.authList)
                commit(types.SET_USERINFO, res)
                resolve(res)
            })
        })
    },
    //退出
    logout: ({commit}) => {
        commit(types.LOGOUT)
    }
}
