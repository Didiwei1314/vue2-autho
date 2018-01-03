const baseHost = 'http://10.2.17.103:8080/' // 刘达本机测试
    // const baseHost = 'http://121.69.16.242:8080/' //沈超本机测试
    // const baseHost = 'http://dgdev.aihsh.cn/' // 开发测试
    // const baseHost = 'http://dgtest.aihsh.cn:88/' // 测试环境
    // const baseHost = 'http://dg.aihsh.cn:9090/' // 正式环境
const api = {
    login: baseHost + 'admin/interface/login/login', // 登录
    loginInfo: baseHost + 'admin/interface/login/info', // 登录信息
    permission: '../static/permission1.json',
    recomposepaw: baseHost + 'admin/interface/login/edit/password', // 修改密码
    doorlist: baseHost + 'admin/interface/door/list', // 小区门管理
    buildinginfo: baseHost + 'admin/interface/door/info', // 查看详情
    editbuilding: baseHost + 'admin/interface/door/edit', // 编辑
    userstuck: baseHost + 'admin/interface/cardno/list', // 用户卡列表
    codecreats: baseHost + 'admin/interface/qr/creatQrCode', // 生成二维码
    exportqrcodes: baseHost + 'front/interface/door/download', // 导出二维码
    organization: baseHost + 'front/interface/branch/get/all', // 公共组织架构
    cardmanagement: baseHost + 'admin/interface/entranceguard/list', // 绑卡管理列表
    unbundle: baseHost + 'admin/interface/car/updatCarStatus', // 解绑
    visitorrecord: baseHost + 'admin/interface/gusetauth/list', // 访客授权记录
    theAudit: baseHost + 'admin/interface/gusetauth/update/check', // 反审核
    openDay: baseHost + 'admin/interface/openlog/list', // 开门日志
    tagList: baseHost + 'admin/interface/word/getAllWord', // 标签列表
    addTag: baseHost + 'admin/interface/word/save', // 增加标签
    revampTag: baseHost + 'admin/interface/word/update', // 修改标签
    delTag: baseHost + 'admin/interface/word/del', // 删除标签
    // 系统设置
    rolestaff: baseHost + 'admin/interface/auth/list', // 用户列表
    roleupdate: baseHost + 'admin/interface/auth/update/auth', // 设置角色
    infoPersonal: baseHost + 'front/interface/employee/getInfo', // 个人信息
    amendPersonal: baseHost + 'admin/interface/employee/updateEmployee', // 修改用户资料
    addrole: baseHost + 'front/interface/employee/role/add', // 添加编辑角色
    roledetail: baseHost + 'front/interface/employee/role/info',//角色详情
    delrole: baseHost + 'front/interface/employee/role/del',// 删除角色
    delroleuser: baseHost + 'front/interface/employee/user/del',//删除角色员工
    allrole: baseHost + 'front/interface/employee/role/all',// 所有角色列表
    //asdfsdfd: baseHost + 'front/interface/employee/user/addUser', // 赋予角色
    addroleroemploy: baseHost + 'front/interface/employee/user/addRole',// 给用户赋予角色
    rolelist: baseHost + 'front/interface/employee/role/list',// 角色列表
    userrolelist: baseHost + 'front/interface/employee/role/list'//用户下角色列表
    
}
export default api
// window.console.log = function() {}

