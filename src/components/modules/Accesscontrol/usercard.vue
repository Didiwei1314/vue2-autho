<template>
<div class="accessmanage">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="管理" name="first">
            <div class="ManageSearch">
                <el-form :inline="true" :model="formInline">
                    <el-form-item label="一卡通账号">
                            <el-input v-model.trim="formInline.cardNo" placeholder="输入一卡通账号"></el-input>
                        </el-form-item>
                    <el-form-item label="门禁名称">
                        <el-input v-model.trim="formInline.doorName" placeholder="输入门禁名称"></el-input>
                    </el-form-item>
                    <el-collapse-transition>
                        <div  v-if="showAll">
                            <el-form-item label="小区名称">
                                <el-input v-model.trim="formInline.commuityName" placeholder="输入小区名称"></el-input>
                            </el-form-item>
                            <el-form-item label="用户姓名">
                                <el-input v-model.trim="formInline.customerName" placeholder="输入用户姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <el-input v-model.trim="formInline.customerPhone" placeholder="输入手机号"></el-input>
                            </el-form-item>
                        </div>
                    </el-collapse-transition>
                    <el-form-item class="Chunks">
                        <el-button type="primary" icon="search" @click="search">搜索</el-button>
                        <el-button type="info" @click="unfoldPack">{{this.showAll ? "更少选项" : "更多选项"}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
    </el-tabs>
   
    <el-table
        v-loading="loading"
        element-loading-text="给我一点时间"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="accessList"
        size="'small'"
        slot="empty"
        style="width: 100%">
        <el-table-column
        prop="cardNo"
        label="一卡通账号">
        </el-table-column>
        <el-table-column
        prop="customerName"
        label="用户姓名">
        </el-table-column>
        <el-table-column
        prop="customerPhone"
        label="手机号">
        <template slot-scope="scope">
                <div slot="content">
                    {{scope.row.customerPhone == null ? '' : scope.row.customerPhone.substring(0, 3) + '****' + scope.row.customerPhone.substring(7) }}
                </div>
            </template>
        </el-table-column>
        <el-table-column
        prop="msDoorId"
        label="门禁编号">
        </el-table-column>
        <el-table-column
        <el-table-column
        prop="doorName"
        label="门禁名称">
        </el-table-column>
        <el-table-column
        prop="communityName"
        label="小区">
            <template slot-scope="scope">
                <el-tooltip placement="top">
                    <div slot="content">
                        {{ scope.row.communityName }}
                    </div>
                    <el-tag size="medium" v-show="scope.row.communityName === null ? false : true">{{ scope.row.communityName }}</el-tag>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column
        prop="buildName"
        label="楼栋">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
            <el-button type="text" v-if="isAuth('001001002001')" size="small" @click="lookOver(scope.row)">查看</el-button>
        </template>
        </el-table-column>;
    </el-table>
    <el-dialog title="查看" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="一卡通账号 :" :label-width="formLabelWidth">
            <p>{{detail.cardNo}}</p>
        </el-form-item>
        <el-form-item label="用户姓名 :" :label-width="formLabelWidth">
            <p>{{detail.customerName}}</p>
        </el-form-item>
        <el-form-item label="手机号 :" :label-width="formLabelWidth">
            <p>{{detail.customerPhone}}</p>
        </el-form-item>
        <el-form-item label="门禁编号 :" :label-width="formLabelWidth">
            <p>{{detail.msDoorId}}</p>
        </el-form-item>
        <el-form-item label="门禁名称 :" :label-width="formLabelWidth">
            <p>{{detail.doorName}}</p>
        </el-form-item>
        <el-form-item label="小区 :" :label-width="formLabelWidth">
            <p>{{detail.communityName}}</p>
        </el-form-item>
        <el-form-item label="楼栋 :" :label-width="formLabelWidth">
            <p>{{detail.buildName}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
     <div class="PageRight">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="this.pages.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.pages.total">
        </el-pagination>
    </div>
  </div>
</template>
<script>
import usercardjs from './usercard'
export default usercardjs
</script>
<style lang="scss">

</style>

