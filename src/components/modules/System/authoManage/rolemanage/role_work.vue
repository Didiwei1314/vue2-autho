<template>
  <div class="accessmanage">
    <el-tabs value="first" type="card">
        <el-tab-pane label="管理" name="first">
            <div class="ManageSearch">
                <el-form :inline="true" :model="formdata">
                    <el-form-item label="账号">
                        <el-input v-model="formdata.account" placeholder="输入用户账号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="formdata.name" placeholder="输入用户姓名"></el-input>
                    </el-form-item>
                    <el-form-item class="Chunks">
                        <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
    </el-tabs>
    <el-table 
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectedchange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="username"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号">
      </el-table-column>
       <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleterole(scope.row)"
            type="text"
            size="small"
            v-if="isAuth('002001001003001')">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="button"
      class="m-t"
      size="small"
      @click="deleterole()"
      v-if="isAuth('002001001003002')">
      批量删除
    </el-button>
    <el-pagination class="m-t f-r"
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog
      title="取消权限"
      :visible.sync="showdio">
      <template>
        {{deleteTips}}
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showdio = false">取 消</el-button>
        <el-button type="primary" @click="delrolestall">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return {
      formdata: {
        name: '',
        account: ''
      },
      tableData: [],
      roleId: '',
      page: 1,
      size: 10,
      total: 0,
      roleids: '',
      currentPage: 1,
      loading: false,
      showdio: false,
      deleteTips: '确定删除该员工吗？',
      loading: true
    }
  },
  methods: {
    getStafflist (name, username) {
      var data = {
        pageNo: this.page,
        pageSize: this.size,
        roleId: this.roleId
      }
      if (name)data.name = name
      if (username)data.username = username
      this.$api.request('post', this.$api.settings.rolestaff, data, function (res) {
        this.total = res.total
        this.tableData = res.data
        this.loading = false
      }.bind(this))
    },
    search () {
      this.getStafflist(this.formdata.name, this.formdata.account)
    },
    deleterole (info) {
      if(!info){
        if(this.roleids){
          this.deleteTips = '确定删除这些员工吗?'
        }else{
          this.$message('请至少选择一个员工')
          return;
        }
      }else{
        this.deleteTips = '确定删除该员工吗？'
        this.roleids = info.id
      }
      this.showdio = true
    },
    delrolestall(){
      var updatedata = {
        ids: this.roleids,
        authStaus: '4'
      }
      this.$api.request('post', this.$api.settings.roleupdate, updatedata, function (res) {
        if (res.code === '0101') {
          this.showdio = false
          this.getStafflist()
        }
      }.bind(this))
    },
    selectedchange (selection) {
      var innerids = ''
      selection.forEach((item, index) => {
        innerids += item.id + ','
      })
      this.roleids = innerids.substring(0, innerids.length - 1)
    },
    // 分页
    sizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.size = val
      this.getStafflist()
    },
    currentChange (val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      this.getStafflist()
    },
  },
  mounted () {
    var roleid = sessionStorage.getItem('role')
    if(!roleid){
      this.roleId = this.$route.query.role
      sessionStorage.setItem('role',this.roleId)
    } else{
      this.roleId = roleid
    }
    this.getStafflist();
  },
  destroyed (){
    sessionStorage.removeItem('role')
  }
}
</script>

