'use strict'
export default {
    install(Vue, options) {
        // 存列表信息
        Vue.prototype.Iteminfo = function(type, info) {
            if (type === 'set') {
                sessionStorage.setItem('subIteminfo', JSON.stringify(info));
            } else if (type === 'get') {
                let info = sessionStorage.getItem('subIteminfo');
                return JSON.parse(info);
            } else if (type === 'remove') {
                sessionStorage.removeItem('subIteminfo');
            } else {
                console.warnng('存取详情信息类型错误（get或set）')
            }
        }
        Vue.prototype.getUrlParams =  function(name, url) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
            if (url.indexOf('?')>=0) {
                var r = url.split('?')[1].match(reg)
            } else {
                var r = window.location.search.substr(1).match(reg)
            }
            if (r != null) return unescape(r[2])
        }
        Vue.prototype.formatDate = function(date) {
            if (date == null || date === '' || date === 'null' || date === 'undefined' || date === undefined) return date;
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        }
        Vue.prototype.uuid = function() {
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
        },
        Vue.prototype.isAuth = function (id, id2) {
            if(id){
                let btn = this.$route.meta.permission.filter(item => {
                    return item.id === (id || id2)
                })
                if(btn.length>0){
                    return true
                }else{
                    return false
                }
            }
        }
    }
}