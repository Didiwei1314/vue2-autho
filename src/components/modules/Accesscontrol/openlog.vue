<template>
  <div>
    <div class="accessmanage">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="管理" name="first">
            <div class="ManageSearch">
                <el-form :inline="true" :model="formInline">
                    <el-form-item label="姓名">
                        <el-input v-model.trim="formInline.name"></el-input>
                    </el-form-item>
                    <el-form-item label="卡号或者授权码">
                        <el-input v-model.trim="formInline.authedNo"></el-input>
                    </el-form-item>
					<el-form-item label="创建开始时间">
                          <el-date-picker
                            v-model="formInline.startTime"
                            type="date"
                            placeholder="选择开始时间">
                          </el-date-picker>
                      </el-form-item>
                      <el-collapse-transition>
                        <div  v-if="showAll">
                        <el-form-item label="创建结束时间">
                            <el-date-picker
                                v-model="formInline.endTime"
                                type="date"
                                placeholder="选择结束时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="开门类型">
                            <el-select v-model="formInline.type">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="业主开门" value="0"></el-option>
                                <el-option label="访客开门" value="1"></el-option>
                                <el-option label="扫码开门" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        </div>
                    </el-collapse-transition>
                    <div class="estateBox">
                      <el-button type="primary" @click="dialog = true" style="display:block;float:left;">点击选择小区</el-button>
                      <div style="float:left;margin-left:20px;">
                            <p style="font-size:16px;margin-bottom:5px;">当前选中的小区：</p>
                            <div style="width:600px;">
                                <span v-for="itims in cityData" style="display:inline-block;line-height: 24px;" :key="itims.label">
                                    {{R.has('children')(itims) ? "" : itims.label.replace(/\[小区\]/g,"")+','}}
                                </span>
                            </div>
                      </div>
                    </div>
                    <div class="clear"></div>
                    <div style="margin-top:16px;">
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search">搜索</el-button>
                            <el-button type="info" @click="unfoldPack">{{this.showAll ? "更少选项" : "更多选项"}}</el-button>
                        </el-form-item>
                    </div>
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
        :default-sort = "{prop: 'date', order: 'descending'}"
        size="'small'"
        slot="empty"
        style="width: 100%">
        <el-table-column
        prop="areaName"
        label="区域">
        </el-table-column>
        <el-table-column
        prop="communityName"
        label="小区">
        </el-table-column>
        <el-table-column
        prop="customerName"
        label="姓名">
        </el-table-column>
        <el-table-column
        prop="createDate"
        label="创建时间"
        sortable>
        <template slot-scope="scope">
            <div>
                {{scope.row.createDate == null? '' : M(scope.row.createDate).format('YYYY-MM-DD HH:mm:ss')}}                    
            </div>
        </template>
        </el-table-column>
        <el-table-column
        prop="doorName"
        label="门名称">
        </el-table-column>
        <el-table-column
        prop="code"
        label="卡号或者授权码">
            <template slot-scope="scope">
                <el-tooltip placement="top">
                    <div slot="content">
                        授权码: {{ scope.row.code }}
                    </div>
                    <el-tag size="medium" v-show="scope.row.code === null ? false : true">{{ scope.row.code }}</el-tag>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
            <el-button type="text" size="small" v-if="isAuth('001001005001')" @click="lookOver(scope.row)">查看</el-button>
        </template>
        </el-table-column>;
    </el-table>
    <el-dialog title="选择小区" :visible.sync="dialog">
        <div>
            <v-city @ievent = "ievent"></v-city>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="dialogConfirm">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="dialogDetails">
      <el-form>
        <el-form-item label="小区 :" :label-width="formLabelWidth">
            <p>{{this.openDetails.areaName}}</p>
        </el-form-item>
        <el-form-item label="姓名 :" :label-width="formLabelWidth">
            <p>{{this.openDetails.customerName}}</p>
        </el-form-item>
        <el-form-item label="开门类型 :" :label-width="formLabelWidth">
           <p>{{this.openDetails.openType | opendoorState }}</p>
        </el-form-item>
        <el-form-item label="创建时间 :" :label-width="formLabelWidth">
            <p>{{  M(this.openDetails.createDate).format('YYYY-MM-DD HH:mm:ss') }}</p>
        </el-form-item>
        <el-form-item label="门名称 :" :label-width="formLabelWidth">
            <p>{{this.openDetails.doorName}}</p>
        </el-form-item>
        <el-form-item label="卡号或者授权码 :" :label-width="formLabelWidth">
            <p>{{this.openDetails.code}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDetails = false">关 闭</el-button>
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
  </div>
</template>
<script>
import openlogJs from './openlog'
export default openlogJs
</script>

