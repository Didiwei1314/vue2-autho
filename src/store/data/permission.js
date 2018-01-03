export default [
    {
      "id": "001",
      "url": "",
      "ismenu": true,
      "name": "门禁管理",
      "status": 1,
      "children": [
        {
          "id": "001001",
          "url": "",
          "ismenu": true,
          "name": "公共门管理",
          "status": 1,
          "children": [
            {
              "id": "001001001",
              "name": "小区门管理",
              "url": "/admin/interface/door/list",
              "ismenu": false,
              "status": 1,
              "isButton": true,
              "choose": [],
              "children": [
                {
                  "id": "001001001001",
                  "name": "查看",
                  "url": "/admin/interface/door/info",
                  "ismenu": false,
                  "status": 1
                },
                {
                  "id": "001001001002",
                  "name": "编辑",
                  "url": "/admin/interface/door/edit",
                  "ismenu": false,
                  "status": 1
                },
                {
                  "id": "001001001003",
                  "name": "时段",
                  "url": "/admin/interface/door/edit",
                  "ismenu": false,
                  "status": 1
                },
                {
                  "id": "001001001004",
                  "name": "禁用",
                  "url": "/admin/interface/door/edit",
                  "ismenu": false,
                  "status": 1
                },
                {
                  "id": "001001001005",
                  "name": "解禁",
                  "url": "/admin/interface/door/edit",
                  "ismenu": false,
                  "status": 1
                },
                {
                  "id": "001001001006",
                  "name": "生成二维码",
                  "url": "/admin/interface/qr/creatQrCode",
                  "ismenu": false,
                  "status": 1
                },
                {
                  "id": "001001001007",
                  "name": "批量导出二维码",
                  "url": "/front/interface/door/download",
                  "ismenu": false,
                  "status": 1
                },
                {
                  "id": "001001001008",
                  "name": "门标签列表",
                  "url": "/admin/interface/word/getAllWord",
                  "ismenu": false,
                  "status": 1
                },
                {
                  "id": "001001001009",
                  "name": "增加门标签",
                  "url": "/admin/interface/word/save",
                  "ismenu": false,
                  "status": 1
                },
                {
                  "id": "001001001010",
                  "name": "修改门标签",
                  "url": "/admin/interface/word/update",
                  "ismenu": false,
                  "status": 1
                },
                {
                  "id": "001001001011",
                  "name": "删除门标签",
                  "url": "/admin/interface/word/del",
                  "ismenu": false,
                  "status": 1
                }
              ]
            },
            {
              "id": "001001002",
              "name": "用户卡管理",
              "url": "/admin/interface/cardno/list",
              "ismenu": false,
              "status": 1,
              "choose": [],
              "isButton": true,
              "children": [
                {
                  "id": "001001002001",
                  "name": "查看",
                  "url": "",
                  "ismenu": false,
                  "status": 1
                }
              ]
            },
            {
              "id": "001001003",
              "name": "绑卡管理",
              "url": "/admin/interface/entranceguard/list",
              "ismenu": false,
              "status": 1,
              "choose": [],
              "isButton": true,
              "children": [
                {
                  "id": "001001003001",
                  "name": "查看绑定详情",
                  "url": "",
                  "ismenu": false,
                  "status": 1
                },
                {
                  "id": "001001003002",
                  "name": "解绑",
                  "url": "/admin/interface/entranceguard/list",
                  "ismenu": false,
                  "status": 1
                }
              ]
            },
            {
              "id": "001001004",
              "name": "访客授权记录",
              "url": "/admin/interface/gusetauth/list",
              "ismenu": false,
              "status": 1,
              "choose": [],
              "isButton": true,
              "children": [
                {
                  "id": "001001004001",
                  "name": "查看",
                  "url": "",
                  "ismenu": false,
                  "status": 1
                },
                {
                  "id": "001001004002",
                  "name": "反审核",
                  "url": "/admin/interface/gusetauth/update/check",
                  "ismenu": false,
                  "status": 1
                }
              ]
            },
            {
              "id": "001001005",
              "name": "开门日志",
              "url": "/admin/interface/openlog/list",
              "ismenu": false,
              "status": 1,
              "choose": [],
              "isButton": true,
              "children": [
                {
                  "id": "001001005001",
                  "name": "查看",
                  "url": "",
                  "ismenu": false,
                  "status": 1
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "002",
      "name": "系统设置",
      "ismenu": true,
      "status": 1,
      "url": "",
      "children": [
        {
          "id": "002001",
          "ismenu": true,
          "status": 1,
          "url": "",
          "name": "系统管理",
          "children": [
            {
              "id": "002001001",
              "name": "角色管理",
              "ismenu": false,
              "url": "/front/interface/employee/role/list",
              "status": 1,
              "choose": [],
              "isButton": true,
              "children": [
                {
                  "id": "002001001001",
                  "name": "添加角色",
                  "url": "/admin/interface/employee/role/add",
                  "ismenu": false,
                  "status": 1
                },
                {
                  "id": "002001001002",
                  "name": "编辑角色",
                  "url": "/admin/interface/employee/role/add",
                  "ismenu": false,
                  "status": 1
                },
                {
                  "id": "002001001003",
                  "name": "员工",
                  "url": "/admin/interface/auth/list",
                  "ismenu": false,
                  "status": 1,
                  "isButton":true,
                  "children":[
                    {
                      "id": "002001001003001",
                      "ismenu": false,
                      "url": "/admin/interface/employee/user/del",
                      "name": "删除",
                      "status": 1
                    },
                    {
                      "id": "002001001003002",
                      "ismenu": false,
                      "url": "/admin/interface/employee/user/del",
                      "name": "批量删除",
                      "status": 1
                    }
                  ]
                }
              ]
            },
            {
              "id": "002001002",
              "ismenu": false,
              "name": "用户管理",
              "url": "/admin/interface/auth/list",
              "isButton": true,
              "choose": [],
              "status": 1,
              "children": [
                {
                  "id": "002001002001",
                  "ismenu": false,
                  "url": "/front/interface/employee/user/addUser",
                  "name": "角色",
                  "status": 1
                }
              ]
            },
            {
              "id": "002001003",
              "ismenu": false,
              "url": "/front/interface/employee/getInfo",
              "name": "个人资料",
              "isButton": true,
              "choose": [],
              "status": 1,
              "children": [
                {
                  "id": "002001003001",
                  "ismenu": false,
                  "name": "保存资料",
                  "url": "/admin/interface/employee/updateEmp",
                  "status": 1
                },
                {
                  "id": "002001003002",
                  "ismenu": false,
                  "name": "保存密码",
                  "url": "/admin/interface/login/edit/password",
                  "status": 1
                }
              ]
            }
          ]
        }
      ]
    }
    // {
    //   "id": "003",
    //   "ismenu": true,
    //   "status": 1,
    //   "children": [
    //     {
    //       "id": "003001",
    //       "ismenu": true,
    //       "status": 1,
    //       "children": [
    //         {
    //           "id": "003001001",
    //           "isButton": true,
    //           "ismenu": false,
    //           "status": 1,
    //           "children": [
                
    //           ],
    //           choose: []
    //         },
    //         {
    //           "id": "003001002",
    //           "ismenu": false,
    //           "isButton": true,
    //           "status": 1,
    //           "children": [
                
    //           ],
    //           choose: []
    //         },
    //         {
    //           "id": "003001003",
    //           "ismenu": false,
    //           "isButton": true,
    //           "status": 1,
    //           "children": [
                
    //           ],
    //           choose: []
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   "id": "004",
    //   "ismenu": true,
    //   "status": 1,
    //   "children": [
    //     {
    //       "id": "004001",
    //       "ismenu": true,
    //       "status": 1,
    //       "children":[
    //         {
    //           "id": "004001001",
    //           "isButton": true,
    //           "ismenu": false,
    //           "status": 1,
    //           "children": [

    //           ],
    //           choose: []
    //         }
    //       ]
    //     }
    //   ]
    // }
  ]