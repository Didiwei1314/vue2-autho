'use strict'
export default{
  data () {
    return {
      rolename: '',
      userid: '',
      tableData: [],
      page: 1,
      size: 10,
      total: 0,
      currentPage: 1,
    }
  },
  methods: {
    search () {
      this.getList(this.rolename)
    },
    tableRowClassName (row, rowIndex) {
      if(row.iscontain == 0 || row.iscontain == null){
        return ''
      }else{
        return 'roleChoosed'
      }
    },
    getList (val) {
      let postdata = {
        employeeId: this.userid,
        pageNo: this.page,
        pageSize: this.size
      }
      if(val)postdata.name = val
      this.$api.request('post',this.$api.settings.userrolelist,postdata,function(res){
        this.tableData = res.data
        this.total = res.total
      }.bind(this))
    },
    selectedchange (select) {
      var arr = select.filter(item => {
        return item.iscontain != '0' && item.iscontain != null
      })
      select = arr
    },
    // 删除角色
    deleterole (row, index) {
      // {"delList": [{"employeeId":1,"roleId":"2"} ]}
      let postdata = {
        delList: [
          {
            employeeId: this.userid,
            roleId: row.id
          }
        ]
      }
      console.log(row,index)
      if(row && index>=0){

      }else{

      }
      // return
      this.$api.request('post',this.$api.settings.delroleuser,postdata,function(res){
        if(res.status == 1){
          this.$message.info('删除成功！')
          this.getList()
        }
      }.bind(this))
    },
    // 增加角色
    addrole (row, index) {
      let postdata = {
        employeeId: this.userid,
        roleId: row.id
      }
      this.$api.request('post',this.$api.settings.addroleroemploy,postdata,function(res){
        if(res.status == 1){
          this.$message.info('添加成功！')
          this.getList()
        }
      }.bind(this))
    },
    // 分页
    sizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.size = val
      this.getList()
    },
    currentChange (val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      this.getList()
    }
  },
  mounted () {
    this.userid = this.$route.query.user
    this.getList()
  }
}