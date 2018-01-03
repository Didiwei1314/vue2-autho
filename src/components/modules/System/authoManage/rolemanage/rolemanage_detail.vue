<template>
  <div class="accessmanage">
    <el-tabs v-model="types" type="card" @tab-click="togo">
        <el-tab-pane label="管理"></el-tab-pane>
        <el-tab-pane :label="typename" name="secend">
            <div class="ManageSearch">
                <el-form :inline="true" :model="formdata1">
                    <el-form-item label="角色名">
                        <el-input v-model="formdata1.rolename" placeholder="输入角色名"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="formdata1.roleproduct" placeholder="输入角色描述"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-tree
              :data="datas"
              :props="defaultProps"
              show-checkbox
              node-key="id"
              default-expand-all
              ref="tree"
              :expand-on-click-node="false"
              @node-click="chooseview"
              @check-change="checkChange"
              :render-content="renderContent">
            </el-tree>
            <el-button class="submit" type="primary" @click="submitroleautho">确定</el-button>
        </el-tab-pane> 
    </el-tabs>
  </div>
</template>
<script>
  import roleMamageJs from './rolemanage_detail'
  export default roleMamageJs
</script>
<style>
   .el-tree{
     border: 0;
   }
   .submit{
       margin: 20px 40px;
   }
   .el-tree-node__content{
       height: auto;
   }
</style>


