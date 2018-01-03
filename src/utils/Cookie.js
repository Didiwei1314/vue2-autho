export default {
    /**
     * 设置cookie
     * @param {string} name 
     * @param {string|number} value 
     * @param {number} day 
     */
    set(name, value, day) {
        let Days = day ? day : 0,
            exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        if(Days>0){
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
        }else{
            document.cookie = name + "=" + escape(value)
        }
    },
    /**
     * 获取cookie
     * @param {string} name 
     * @returns 
     */
    get(name) {
        let arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg)){
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    /**
     * 删除cookie
     * @param {string} name 
     */
    del(name) {
        let exp = new Date(),
            cval = this.get(name);
        exp.setTime(exp.getTime() - 1);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    }
}