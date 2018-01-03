'use strict'
export default{
  data () {
    return {
      types: 'first',
      currentPage: 1,
      showdio: false,
      page: 1,
      size: 10,
      total: 0,
      formdata: {
        name: '',
        account: ''
      },
      tableData: [],
      dialogVisible: false,
      radio: '',
      roleids: '',
      region: '',
      loading: true
    }
  },
  methods: {
    editor (index, data) {
      console.log(index, data)
    },
    search () {
      this.getUserlist(this.formdata.name, this.formdata.account)
    },
    selectedchange (selection) {
      var innerids = ''
      selection.forEach((item, index) => {
        innerids += item.id + ','
      })
      this.roleids = innerids.substring(0, innerids.length - 1)
    },
    getUserlist (name, username) {
      var data = {
        pageNo: this.page,
        pageSize: this.size
      }
      if (name)data.name = name
      if (username)data.username = username
      this.$api.request('post', this.$api.settings.rolestaff, data, function (res) {
        // console.log(res)
        this.total = res.total
        this.tableData = res.data
        this.loading = false
      }.bind(this))
    },
    updaterole () {
      if (!this.radio) {
        this.$message('请选择一个权限')
        return
      }
      var updatedata = {
        ids: this.roleids,
        authStaus: this.radio
      }
      this.$api.request('post', this.$api.settings.roleupdate, updatedata, function (res) {
        if (res.status === 1) {
          this.showdio = false
          this.getUserlist()
          this.$message('修改成功')
        } else {
          this.$message('修改失败')
        }
      }.bind(this))
    },
    // 分页
    sizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.size = val
      this.getUserlist()
    },
    currentChange (val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      this.getUserlist()
    },
    // 模态框
    modaledit (row) {
      console.log(row)
      if (row) {
        this.roleids = row.id
        this.radio = row.authStatus ? row.authStatus.toString() : ''
      }
      this.showdio = true
    },
    roleuser (row) {
      this.$router.push({
        path: '/system/usermanage/userrole',
        query: {
          user: row.id
        }
      })
    }
  },
  mounted () {
    this.getUserlist()
  }
}
