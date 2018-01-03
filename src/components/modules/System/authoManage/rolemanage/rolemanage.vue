<template>
  <div class="accessmanage">
    <el-tabs v-model="types" type="card" @tab-click="togo">
        <el-tab-pane label="管理" name="first">
            <div class="ManageSearch">
                <el-form :inline="true" :model="formdata">
                    <el-form-item label="角色名">
                        <el-input v-model="formdata.rolename" placeholder="输入角色名"></el-input>
                    </el-form-item>
                    <el-form-item class="Chunks">
                        <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
        <el-tab-pane label="新增" name="secend" v-if="isAuth('002001001001')"></el-tab-pane> 
    </el-tabs>
    <el-table 
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
        label="角色"
        width="200">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="角色描述">
      </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
          <el-button
          @click.native.prevent="editor(scope.$index, scope.row)"
          type="text"
          size="small"
          v-if="isAuth('002001001002')">
          编辑
        </el-button>
          <el-button
          @click.native.prevent="worker(scope.$index, scope.row)"
          type="text"
          size="small"
          v-if="isAuth('002001001003')">
          员工
        </el-button>
        <el-button
          @click.native.prevent="deleterole(scope.$index, scope.row)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-button
      type="button"
      class="m-t"
      size="small"
      @click="deleterole">
      批量删除
    </el-button>
    <!-- 分页 -->
    <el-pagination class="m-t f-r"
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total">
    </el-pagination>
  </div>
</template>
<script>
import roleMJs from './rolemanage'
export default roleMJs
</script>

