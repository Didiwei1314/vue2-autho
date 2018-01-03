<template>
  <div class="accessmanage">
    <el-tabs v-model="types" type="card">
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
          <!-- <el-button
          @click.native.prevent="modaledit(scope.row)"
          type="text"
          size="small">
          编辑
          </el-button> -->
          <el-button
          @click.native.prevent="roleuser(scope.row)"
          v-if="isAuth('002001002001')"
          type="text"
          size="small">
          角色
          </el-button>
          <!-- <el-button
            @click.native.prevent="deleterole(scope.$index, scope.row)"
            type="text"
            size="small">
            删除
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="button"
      class="m-t"
      size="small"
      @click="modaledit()">
      批量编辑
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
    <!-- 选择角色权限模态框 -->
    <!-- <el-dialog
      title="权限分配"
      :visible.sync="showdio">
      <template>
        <el-radio v-model="radio" label="1">小区经理</el-radio>
        <el-radio v-model="radio" label="2">运营</el-radio>
        <el-radio v-model="radio" label="3">超级管理员</el-radio>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showdio = false">取 消</el-button>
        <el-button type="primary" @click="updaterole">确 定</el-button>
      </span>
    </el-dialog> -->

  </div>
</template>
<script>
import userMJs from './usermanage'
export default userMJs
</script>

