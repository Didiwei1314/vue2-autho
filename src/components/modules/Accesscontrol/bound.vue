<template>
  <div>
    <div class="accessmanage">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="管理" name="first">
            <div class="ManageSearch">
                <el-form :inline="true" :model="formInline">
                    <el-form-item label="门禁卡号">
                        <el-input v-model.trim="formInline.cardNo"></el-input>
                    </el-form-item>
                    <el-form-item label="绑定手机卡号">
                        <el-input v-model.trim="formInline.bindingPhoneNo"></el-input>
                    </el-form-item>
                    <el-collapse-transition>
                        <div v-if="showAll">
                        <el-form-item label="绑定状态">
                            <el-select v-model="formInline.bindStatus">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="绑定成功" value="0"></el-option>
                                <el-option label="解绑" value="1"></el-option>
                                <el-option label="绑定失败" value="2"></el-option>
                                <!-- <el-option label="未绑定" value="3"></el-option> -->
                            </el-select>
                        </el-form-item>
                        <el-form-item label="业主账号">
                            <el-input v-model.trim="formInline.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="绑定开始时间">
                            <el-date-picker
                                v-model="formInline.startTime"
                                type="date"
                                placeholder="选择开始时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="绑定结束时间">
                            <el-date-picker
                                v-model="formInline.endTime"
                                type="date"
                                placeholder="选择结束时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="房间号">
                            <el-input v-model.trim="formInline.roomName"></el-input>
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
        size="'small'"
        slot="empty"
        style="width: 100%">
        <el-table-column
        prop="phone"
        label="绑定手机号码">
            <template slot-scope="scope">
                <div slot="content">
                    {{scope.row.phone == null ? '' : scope.row.phone.substring(0, 3) + '****' + scope.row.phone.substring(7) }}
                </div>
            </template>
        </el-table-column>
        <el-table-column
        prop="cardNo"
        label="门禁卡号">
        </el-table-column>
        <el-table-column
        prop="areaName"
        label="门卡所在区域">
        </el-table-column>
        <el-table-column
        prop="communityName"
        label="门卡所在小区">
        </el-table-column>
        <el-table-column
        prop="rommNumber"
        label="房间号">
            <template slot-scope="scope">
                <el-tooltip placement="top">
                    <div slot="content" style="max-width:300px;">
                        {{ scope.row.rommNumber }}
                    </div>
                    <el-tag size="medium" style="dispaly:block;max-width:100px;" v-show="scope.row.rommNumber === null ? false : true">{{ scope.row.rommNumber }}</el-tag>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column
        prop="customerUsername"
        label="业主账号">
            <template slot-scope="scope">
                <div slot="content">
                    {{scope.row.customerUsername == null ? '' : scope.row.customerUsername.substring(0, 3) + '****' + scope.row.customerUsername.substring(7) }}
                </div>
            </template>
        </el-table-column>
        <el-table-column
        prop="customerName"
        label="业主姓名">
        <template slot-scope="scope">
            <div>
                {{scope.row.customerName == null || '' ? scope.row.wxName : scope.row.customerName }}                    
            </div>
        </template>
        </el-table-column>
        <el-table-column
         sortable
        prop="createDate"
        label="绑卡时间">
         <template slot-scope="scope">
            <div>
                {{scope.row.createDate == null? '' : M(scope.row.createDate).format('YYYY-MM-DD HH:mm:ss')}}                  
            </div>
        </template>
        </el-table-column>
        <el-table-column
        prop="state"
        label="绑卡状态">
         <template slot-scope="scope">
            <div>
                <el-button size="mini" type="success"> {{scope.row.state | bindingState }}</el-button>                  
            </div>
        </template>
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
            <el-button type="text" size="small" v-if="isAuth('001001003001')" @click="lookOver(scope.row)">查看绑定详情</el-button>
            <el-button type="text" size="small" v-if="isAuth('001001003002')" @click="handleClose(scope.row)">{{ scope.row.state == 0 ? '解绑' : ''}}</el-button>
        </template>
        </el-table-column>
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
        <el-form-item label="门卡所在小区 :" :label-width="formLabelWidth">
            <p>{{this.cardDetails.areaName}}</p>
        </el-form-item>
        <el-form-item label="业主账号 :" :label-width="formLabelWidth">
            <p>{{this.cardDetails.entranceCard}}</p>
        </el-form-item>
        <el-form-item label="业主姓名 :" :label-width="formLabelWidth">
           <p>{{this.cardDetails.userName}}</p>
        </el-form-item>
        <el-form-item label="门禁卡号 :" :label-width="formLabelWidth">
            <p>{{this.cardDetails.entranceCard}}</p>
        </el-form-item>
        <el-form-item label="绑定手机号码 :" :label-width="formLabelWidth">
            <p>{{this.cardDetails.bindingPhoneNo}}</p>
        </el-form-item>
        <el-form-item label="绑卡时间 :" :label-width="formLabelWidth">
            <p>{{M(this.cardDetails.cardTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
        </el-form-item>
        <el-form-item label="员工 :" :label-width="formLabelWidth">
            <p>{{this.cardDetails.staff}}</p>
        </el-form-item>
        <el-form-item label="操作备注 :" :label-width="formLabelWidth">
            <p>{{this.cardDetails.Operationnote}}</p>
        </el-form-item>
        <el-form-item label="绑定状态 :" :label-width="formLabelWidth">
            <p>{{this.cardDetails.bindStatus | bindingState}}</p>
        </el-form-item>
        <el-form-item label="绑定失败错误提示 :" :label-width="formLabelWidth">
            <p>{{this.cardDetails.bindStatuserror}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDetails = false">关 闭</el-button>
      </div>
    </el-dialog>
    <div class="DeriveLft">
        <!-- <el-button type="primary" icon="el-icon-download">导出数据</el-button> -->
    </div>
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
import boundJs from './bound'
export default boundJs
</script>


