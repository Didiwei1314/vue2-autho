
import {asyncRouterC, asyncRouterF} from '../router/asyncRouter'
/**
 * 根据权限匹配路由
 * @param {array} permission 权限列表（菜单列表）
 */
const routerMatch = function(permission){
    console.time('匹配权限表')
    var box = []
    let len = permission.length
    for(var i = 0; i < len; i++){
      let boxinner = []
      asyncRouterF.forEach((item, index) => {
        if(permission[i].id==item.id){
          permission[i].name = item.meta.title
          permission[i].path = item.path
          box[i] = item
        }
      })
      const setchild = function (children) {
        children.forEach(route => {
          asyncRouterC.forEach(syncroute => {
            if(route.id === syncroute.id){
                route.name = syncroute.meta.title
                route.path = syncroute.path
                if(route.path)box[i].children.push(syncroute)
                if(route.children && route.children.length>0)setchild(route.children)
                if(route.children && route.children.length>0 && route.isButton){
                  syncroute.meta.permission = route.children
                }
                // if(route.isButton && route.children && route.children.length>0){
                //   route.btns = JSON.parse(JSON.stringify(route.children))
                //   route.children = []
                //   route.choose = []
                // }
            }
          })
        })
      }
      if(permission[i].children && permission[i].children.length>0)setchild(permission[i].children)
    }
    console.timeEnd('匹配权限表')
    return box
}
export default routerMatch
