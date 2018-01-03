
// 需要权限访问的完整路由表
// 获取权限后和该表匹配的则被加入到正式路由中。
// path 页面跳转地址
// permission字段内容从后台获取，代表该页内部按钮级别权限
import Home from '../components/common/LayoutParent'
export const asyncRouterF = [
    {
        path: '/system',
        id: '002',
        component: Home,
        meta: {
            title:'系统设置',
        },
        redirect: '/system/userinfo',
        children: []
    },
    {
        path: '/baseinfo',
        id: '003',
        component: Home,
        meta: {
            title:'基础资料',
        },
        redirect: '/baseinfo/areamanage',
        children: []
    },
    {
        path: '/accesscontrol',
        id: '001',
        component: Home,
        meta: {
            title:'门禁管理',
        },
        redirect: '/accesscontrol/accesslist',
        children: []
    },
    {
        path: '/service',
        id: '004',
        component: Home,
        redirect: '/service/iconmanage',
        
        meta: {
            title: '服务管理',
        },
        children: []
    }
]
export const asyncRouterC = [
    {
        path: '/system/userinfo',
        id: '002001003',
        meta:{
            title:'个人资料',
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../components/modules/System/authoManage/rolemanage/info.vue')), 'userinfo'),
    },
    {
        path: '/system/basesetting',
        id: '',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../components/modules/System/paramManage/basesetting.vue')), 'basesetting'),
    },
    {
        path: '/system/apppub',
        id: '',
        meta:{
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../components/modules/System/paramManage/apppub.vue')), 'apppub'),
    },
    {
        path: '/system/role',
        id: '002001001',
        meta:{
            title:'角色管理',
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../components/modules/System/authoManage/rolemanage/rolemanage.vue')), 'role'),
    },
    {
        path: '/system/role/roledetail',
        id: '002001001001',
        meta:{
            title: '详情',
            permission:[],
            notAlive: true
        },
        component: r => require.ensure([], () => r(require('../components/modules/System/authoManage/rolemanage/rolemanage_detail.vue')), 'roledetail'),
    },
    {
        path: '/system/role/rolework',
        id: '002001001002',
        meta:{
            title: '员工',
            permission:[],
            notAlive: true
        },
        component: r => require.ensure([], () => r(require('../components/modules/System/authoManage/rolemanage/role_work.vue')), 'rolework'),
    },
    {
        path: '/system/usermanage',
        id: '002001002',
        meta:{
            title:'用户管理',
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../components/modules/System/authoManage/usermanage/usermanage.vue')), 'usermanage'),
    },
    {
        path: '/system/usermanage/userrole',
        id: '002001002001',
        meta:{
            title:'用户角色',
            permission:[],
            notAlive: true
        },
        component: r => require.ensure([], () => r(require('../components/modules/System/authoManage/usermanage/userrole.vue')), 'userrole'),
    },
    {
        path: '/accesscontrol/accesslist',
        id: '001001001',
        meta:{
            title: '小区门管理',
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../components/modules/Accesscontrol/accesslist.vue')), 'accesslist'),
    },
    {
        path: '/accesscontrol/accesslist/lookover',
        id: '001001001001',
        component: r => require.ensure([], () => r(require('../components/modules/Accesscontrol/lookover.vue')), 'lookover'),
        meta: {
            title: '查看',
            notAlive: true
        }
    },
    {
        path: '/accesscontrol/accesslist/redactlist',
        id: '001001001002',
        component: r => require.ensure([], () => r(require('../components/modules/Accesscontrol/redactlist.vue')), 'redactlist'),
        meta: {
            title: '编辑',
            notAlive: true
        }
    },
    {
        path: '/accesscontrol/usercard',
        id: '001001002',
        meta:{
            title: '用户卡管理',
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../components/modules/Accesscontrol/usercard.vue')), 'usercard'),
    },
    {
        path: '/accesscontrol/bound',
        id: '001001003',
        meta:{
            title: '绑卡授权',
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../components/modules/Accesscontrol/bound.vue')), 'bound'),
    },
    {
        path: '/accesscontrol/authorecord',
        id: '001001004',
        meta:{
            title: '访客授权',
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../components/modules/Accesscontrol/authorecord.vue')), 'authorecord'),
    },
    {
        path: '/accesscontrol/openlog',
        id: '001001005',
        meta:{
            title: '开门日志',
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../components/modules/Accesscontrol/openlog.vue')), 'openlog'),
    },
    {
        path: '/baseinfo/areamanage',
        id: '003001002',
        meta: {
            title: '区域管理',
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../components/modules/Baseinfo/areaManage/area.vue')), 'area'),
    },
    {
        path: '/baseinfo/vallagemanage',
        id: '003001003',
        meta: {
            title: '小区管理',
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../components/modules/Baseinfo/vallageManage/vallage.vue')), 'vallage'),
    },
    {
        path: '/baseinfo/orgmanage',
        id: '003001001',
        meta: {
            title: '机构管理',
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../components/modules/Baseinfo/orgManage/organization.vue')), 'organization'),
    },
    {
        path: '/service/iconmanage',
        id: '004001001',
        meta:{
            title: "图标管理",
            permission:[]
        },
        component: r => require.ensure([], () => r(require('../components/modules/Service/serviceManage/iconmanage.vue')), 'iconmanage'),
    },

    {
        id: '001001',
        meta: {
            title: '公共门管理'
        }
    },
    {
        id: '002001',
        meta: {
            title: '系统管理'
        }
    },
    {
        id: '003001',
        meta: {
            title: '组织机构'
        }
    },
    {
        id: '004001',
        meta: {
            title: '服务管理'
        }
    }
]

