'use strict'
import roledata from '../../../../../store/data/permission'

export default {
  data(){
    return {
      types: 'secend',
      typename : '新增',
      formdata1: {
        rolename: '',
        roleproduct: ''
      },
      treeBox: '',// 中间件
      chooseBox: '',// 中间件
      datas: roledata,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created () {
    this.datas = JSON.parse(JSON.stringify(this.datas))
  },
  methods: {
    togo (event) {
      var _this = this
      if (event.index === '0') {
        setTimeout(function () {
          _this.$router.push('/system/role')
        }, 0)
      }
    },
    checkbtn (val) {
      let keyarr = this.$refs.tree.getCheckedKeys()
      this.chooseBox = val
      if(val.length==0){
        var removeByValue = function (arr, val) {
          for(var i=0; i<arr.length; i++) {
            if(arr[i] == val) {
              arr.splice(i, 1);
              break;
            }
          }
        }
        removeByValue(keyarr,this.treeBox.id)
      }else{
        keyarr.push(this.treeBox.id)
      }
      this.$refs.tree.setCheckedKeys(keyarr)
    },
    checkChange (c, s) {
      if(!c.btns)return
      if(s && c.choose.length==0) {
        var newarr = c.btns.map(b=>{
          let mybtn = b.name
          return mybtn
        })
        c.choose = newarr// 已选择（编辑角色）
      }else if((!s && this.chooseBox.length>0) || (!s && !this.chooseBox)){
        c.choose = []
      }
    },
    chooseview (c,s,v) {
      this.treeBox = c
    },
    // 获取角色详情
    getroledetail (id) {
      this.typename = '编辑'
      this.$api.request('post',this.$api.settings.roledetail,{roleId:id},function(res){
        this.formdata1.rolename = res.role.name
        this.formdata1.roleproduct = res.role.desc
        let keyarr = this.$refs.tree.getCheckedKeys()
        if(res.auth && res.auth.length>0){
          let getids = function(data){
            data.forEach(item => {
              if(item.children && item.children.length>0){
                getids(item.children)
              }else{
                keyarr.push(item.id)
              }
            })
          }
          getids(res.auth)
          this.$refs.tree.setCheckedKeys(keyarr)
        }
      }.bind(this))
    },
    // 创建修改角色
    submitroleautho () {
      let result = []
      let box = this.$refs.tree.getCheckedKeys()
      if(box.length>0){
        box.forEach(item => {
          let len = item.length/3
          for(var i=1;i<=len;i++){
            let pid = item.substring(0,i*3)
            if(box.indexOf(pid)<0)box.push(pid)
          }
        })
        if(!this.formdata1.rolename){
          this.$message.error('请输入角色名')
          return
        }else if(!this.formdata1.roleproduct){
          this.$message.error('请输入角色描述')
          return
        }
        let postdata = {
          role:{
            name: this.formdata1.rolename,
            desc: this.formdata1.roleproduct
          },
          ids: box
        }
        if(this.typename=='编辑'){
          postdata.role.id = this.$route.query.role
        }
        this.$api.request('post',this.$api.settings.addrole,postdata,function(res){
          // console.log(res)
          if(res.status === 1){
            this.$message.info(res.msg)
            this.$router.push({
              path: '/system/role',
              query: {
                refresh: true
              }
            })
          }
        }.bind(this))
      }else{
        this.$message.error('请至少选择一个权限')
      }
    },
    renderContent(h, { node, data, store }) {
      if(data.btns && data.btns.length>0){
        var setchildrenbtn = function(subbtn,boxs){
          let box = []
          subbtn.forEach(btn => {
            if(btn.btns && btn.btns.length>0){
              setchildrenbtn(btn.btns,box)
            }
            if(boxs){
              boxs.push(<el-checkbox label={btn.name}></el-checkbox>)
            }else{
              box.push(<el-checkbox label={btn.name}></el-checkbox>)
            }
          })
          return box
        } 
        return (
          <span style="position:relative;">
              <span>{node.label}</span>
              {/* <el-checkbox-group style="margin:0 100px;" v-model={data.choose} on-change={this.checkbtn}>
                <div style="width:auto;">
                  {
                    setchildrenbtn(data.btns)
                  }
                </div>
              </el-checkbox-group> */}
          </span>)
      }else{
        return (
          <span>
          <span style="margin-right:40px;">
            <span>{node.label}</span>
          </span>
          </span>
        )
      }
    }
  },
  mounted () {
    this.types = 'secend'
    if(this.$route.query.role){
      this.getroledetail(this.$route.query.role)
    }
  }
}