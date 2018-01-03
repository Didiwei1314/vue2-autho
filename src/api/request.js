/**
 * Created by Administrator on 2017/5/23.
 */
import CryptoJS from '../utils/aes'
import Vue from 'vue'
import Cookes from '../utils/Cookie'
import {Message} from 'element-ui'
import store from '../store/index'

var axios = require('axios')
Vue.prototype.$axios = axios
const key = CryptoJS.enc.Utf8.parse('y2W89L6BkRAFljhN')
const iv = CryptoJS.enc.Utf8.parse('dMitHORyqbeYVE0o')

const iGetInnerText = function(testStr) {
    var resultStr = testStr.replace(/\+/g, '') // 去掉空格
    resultStr = testStr.replace(/[ ]/g, '') // 去掉空格
    resultStr = testStr.replace(/[\r\n]/g, '') // 去掉回车换行
    return resultStr
}
const uuid = function() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}
export default function(type, url, data, fn) {
    var datas
    if (type && type === 'get') {
        if (Array.isArray(data)) {
            if (data) {
                data.forEach(function(item) {
                    url += '/' + item
                })
            }
        } else {
            datas = {
                params: data
            }
        }
    } else {
        datas = data
    }
    var headers = {
        CLIENT_TYPE: 'H5'
    }
    const Token = Cookes.get('token')
    const Userid = Cookes.get('userId')
    const Sessionid = Cookes.get('sessonId')
    if (Token) headers['TOKEN'] = Token
    if (Userid) headers['USER_ID'] = Userid
    headers['HOPSON_SESSION_ID'] = Sessionid?Sessionid:uuid()
    var instance = axios.create({
        headers: headers
    })
    var dataspost = JSON.stringify(datas)
    var password = CryptoJS.enc.Utf8.parse(dataspost)
    var encrypted = CryptoJS.AES.encrypt(password, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString()
    var formData = new FormData()
    formData.append('param', encrypted)
    instance[type](url, formData).then((res) => {
        if (res.data.status === 1) {
            var data = iGetInnerText(res.data.data)
            if (data) {
                var decrypted = CryptoJS.AES.decrypt(data, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8)
                if (decrypted.indexOf('{') > -1) {
                    fn(JSON.parse(decrypted))
                        // console.log(JSON.parse(decrypted))
                } else {
                    fn(decrypted)
                }
            } else {
                fn(res.data)
            }
        } else {
            Message({
                message : res.data.msg,
                type : 'error'
            })
            if(res.data.code==='0001'){
                store.dispatch('logout')
                setTimeout(function(){
                    window.location.href=window.location.origin
                },1000)
            }
        }
    }).catch((err) => {
        // 调用全局配置错误
        if (err && err.response && err.response.status === 401) {
            Message({
                message : err.response.msg,
                type : 'error'
            })
        }
    })
}