'use strict'
export default{
  data () {
    return {
      types: 'first',
      currentPage: 1,
      chooseAll: [],
      formdata: {
        rolename: ''
      },
      pages: {
        pageSize: 10,
        pageNo: 1,
        total: 0
      },
      tableData: [{
        name: '超级管理员',
        desc: '系统内置的超级管理员角色，无法被删除和更改权限。',
        id: '3'
      }, {
        name: '运营',
        desc: '。。。',
        id: '2'
      }, {
        name: '小区经理',
        desc: '。。。',
        id: '1'
      }]
    }
  },
  methods: {
    togo (event) {
      var _this = this
      if (event.index === '1') {
        setTimeout(function () {
          _this.$router.push('/system/role/roledetail')
        }, 0)
      }
    },
    selectedchange (val) {
      this.chooseAll = val
    },
    editor (index, data) {
      this.$router.push({
        path: '/system/role/roledetail',
        query: {
          role: data.id
        }
      })
    },
    worker (index, data) {
      this.$router.push({
        path: '/system/role/rolework',
        query: {
          role: data.id
        }
      })
    },
    getList (val) {
      var postdata = {
        pageSize: this.pages.pageSize,
        pageNo: this.pages.pageNo,
      }
      if(val)postdata.name = val
      this.$api.request('post',this.$api.settings.rolelist,postdata,function(res){
        //  console.log(res)
         this.tableData = res.data
      }.bind(this))
    },
    deleterolerequest (ids, index) {
      this.$api.request('post',this.$api.settings.delrole,{ids:ids},function(res){
        if(res.status === 1){
          this.$message.info(res.msg)
          if(index){
            this.tableData.splice(index,1)
          }else{
            this.getList()
          }
        }
      }.bind(this))
    },
    deleterole (index, data) {
      this.$confirm('如果删除该角色，该角色下的所有员工将失去该角色的权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(index>=0 && data){
          this.deleterolerequest(data.id, index)
        }else if(this.chooseAll.length>0){
          let ids = ''
          this.chooseAll.forEach(id => {
            ids += id.id+','
          })
          this.deleterolerequest(ids)
        }
      }).catch(() => {})
      
    },
    search () {
      this.getList(this.formdata.rolename)
    },
    // 分页
    sizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pages.pageSize = val
      this.getList()
    },
    currentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pages.pageNo = val
      this.getList()
    }
  },
  mounted () {
    this.getList()
  },
  activated(){
    this.types = 'first'
    if(this.$route.query.refresh){
        this.getList()
    }
  }
}
