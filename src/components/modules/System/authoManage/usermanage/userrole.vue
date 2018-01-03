<template>
  <div class="accessmanage">
    <el-tabs value="first" type="card">
        <el-tab-pane label="管理" name="first">
            <div class="ManageSearch">
                <el-form :inline="true">
                    <el-form-item label="账号">
                        <el-input v-model="rolename" placeholder="输入角色名"></el-input>
                    </el-form-item>
                    <el-form-item class="Chunks">
                        <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
    </el-tabs>
    <el-table 
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :row-class-name="tableRowClassName"
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
          @click.native.prevent="addrole(scope.row, scope.$index)"
          type="text"
          size="small"
          v-if="scope.row.iscontain==0 || scope.row.iscontain==null">
          增加
        </el-button>
        <el-button
          @click.native.prevent="deleterole(scope.row, scope.$index)"
          type="text"
          size="small"
          v-else>
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
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import userroleJs from './userrole'
export default userroleJs
</script>
<style>
 .roleChoosed{
   background: #dff0d8 !important;
 }
</style>


