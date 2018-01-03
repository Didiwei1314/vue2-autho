const list = [{
    'id': 1,
    'label': '门禁管理',
    'children': [{
      'id': 4,
      'label': '公共门管理',
      'children': [{
        'id': 9,
        'label': '小区门管理',
        'isbtn': true,
        'btns':[
          {
            'id': 100,
            'label': '编辑'
          },
          {
            'id': 100,
            'label': '查看'
          },
          {
            'id': 100,
            'label': '删除'
          }
        ],
        'choose':[]
      }, {
        'id': 10,
        'label': '用户卡管理'
      },{
        'id': 11,
        'label': '绑卡管理'
      },{
        'id': 12,
        'label': '访客授权记录'
      },{
        'id': 13,
        'label': '开门日志'
      }]
    }]
  }, {
    'id': 2,
    'label': '系统设置',
    'children': [{
      'id': 5,
      'label': '角色管理'
    }, {
      'id': 6,
      'label': '用户管理'
    }]
  }, {
    'id': 3,
    'label': '基础资料',
    'children': [{
      'id': 7,
      'label': '组织机构',
      'children': [
        {
          'id': 8,
          'label': '小区管理'
        },
        {
          'id': 14,
          'label': '区域管理'
        }
      ]
    }]
  }]
  export default list
