<template>
  <div>
    <div class="accessmanage">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="管理" name="first">
            <div class="ManageSearch">
                <el-form :inline="true" :model="formInline">
                    <el-form-item label="访客姓名">
                        <el-input v-model.trim="formInline.gustName"></el-input>
                    </el-form-item>
                    <el-form-item label="业主账号">
                        <el-input v-model.trim="formInline.gustAccountNo"></el-input>
                    </el-form-item>
                    <el-collapse-transition>
                        <div  v-if="showAll">
                        <el-form-item label="拜访开始时间">
                            <el-date-picker
                                v-model="formInline.startTime"
                                type="date"
                                placeholder="选择开始时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="拜访结束时间">
                            <el-date-picker
                                v-model="formInline.endTime"
                                type="date"
                                placeholder="选择结束时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="访客电话">
                            <el-input v-model.trim="formInline.gustPhoneNo"></el-input>
                        </el-form-item>
                        <el-form-item label="审核">
                            <el-select v-model="formInline.status">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="待审核" value="0"></el-option>
                                <el-option label="通过" value="1"></el-option>
                                <el-option label="不通过" value="2"></el-option>
                                <el-option label="已取消" value="3"></el-option>
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
                    <div class="chunkBlock" style="margin-top:16px;">
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
        prop="idNumber"
        label="访客证件号码">
        </el-table-column>
        <el-table-column
        prop="phone"
        label="访客电话">
        </el-table-column>
        <el-table-column
        prop="areaName"
        label="区域">
        </el-table-column>
        <el-table-column
        prop="communityName"
        label="小区">
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
        </el-table-column>
        <el-table-column
        prop="userName"
        label="访客姓名">
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
        prop="startDate"
        label="拜访开始时间"
        sortable>
        <template slot-scope="scope">
            <div>
                {{scope.row.startDate == null? '' : M(scope.row.startDate).format('YYYY-MM-DD HH:mm:ss')}}                    
            </div>
        </template>
        </el-table-column>
        <el-table-column
        prop="endDate"
        label="拜访结束时间"
        sortable>
        <template slot-scope="scope">
            <div>
                {{scope.row.createDate == null? '' : M(scope.row.endDate).format('YYYY-MM-DD HH:mm:ss')}}                    
            </div>
        </template>
        </el-table-column>
        <el-table-column
        prop="state"
        label="审核">
          <template slot-scope="scope">
               <el-button type="success" size="mini">{{scope.row.state | auditState }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
            <el-button type="text" size="small" v-if="isAuth('001001004001')" @click="lookOver(scope.row)">查看</el-button>
            <el-button type="text" size="small" v-if="isAuth('001001004002')" @click="handleClose(scope.row)">{{ scope.row.state == 1 ? '反审核' : '' }}</el-button>
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
    <el-dialog title="查看" :visible.sync="dialogDetails" id="dialogStyle">
      <el-form>
        <el-form-item label="访客证件号码 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.idNumber}}</p>
        </el-form-item>
        <el-form-item label="访客电话 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.phone}}</p>
        </el-form-item>
        <el-form-item label="区域 :" :label-width="formLabelWidth">
           <p>{{this.impowerDetails.areaName}}</p>
        </el-form-item>
        <el-form-item label="小区 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.communityName}}</p>
        </el-form-item>
        <el-form-item label="业主账号 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.customerUsername}}</p>
        </el-form-item>
        <el-form-item label="业主姓名 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.customerName}}</p>
        </el-form-item>
        <el-form-item label="访客姓名 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.userName}}</p>
        </el-form-item>
        <el-form-item label="创建时间 :" :label-width="formLabelWidth"> 
            <p>{{ M(this.impowerDetails.createDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
        </el-form-item>
        <el-form-item label="拜访开始时间 :" :label-width="formLabelWidth">
            <p> {{M(this.impowerDetails.startDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
        </el-form-item>
        <el-form-item label="拜访结束时间 :" :label-width="formLabelWidth">
            <p>{{M(this.impowerDetails.endDate).format('YYYY-MM-DD HH:mm:ss')}}</p>
        </el-form-item>
        <el-form-item label="审核 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.state | auditState }}</p>
        </el-form-item>
        <el-form-item label="微信昵称 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.wxName}}</p>
        </el-form-item>
        <el-form-item label="证件号 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.idType | IDNumberType}}</p>
        </el-form-item>
        <el-form-item label="门Id和门名称的xml :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.id + this.impowerDetails.doorXml}}</p>
        </el-form-item>
         <el-form-item label="门禁卡卡号 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.cardNo}}</p>
        </el-form-item>
        <el-form-item label="访客授权码 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.authcode}}</p>
        </el-form-item>
        <el-form-item label="不通过原因 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.reason}}</p>
        </el-form-item>
        <el-form-item label="备注	 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.mark}}</p>
        </el-form-item>
        <el-form-item label="审核时间	 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.audiTime === null ? '' : M(this.impowerDetails.audiTime).format('YYYY-MM-DD HH:mm:ss')}}</p>
        </el-form-item>
        <el-form-item label="性别	 :" :label-width="formLabelWidth">
            <p>{{this.impowerDetails.sex}}</p>
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
import authorecordJs from './authorecord'
export default authorecordJs
</script>
<style lang="scss">
  #dialogStyle{
    .el-dialog__body{
        height: 500px;
        overflow-y: auto;

        p{
            word-wrap:break-word;
        }
    }
  }
</style>

