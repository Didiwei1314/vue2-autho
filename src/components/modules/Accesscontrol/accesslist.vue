<template>
<div class="accessmanage">
    <a id="downqrcode" href="" download=""></a>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="管理" name="first" >
            <div class="ManageSearch">
                <el-form :inline="true" :model="formInline">
                    <el-form-item label="门禁名称">
                        <el-input v-model.trim="formInline.keywords" placeholder="输入门禁名称"></el-input>
                    </el-form-item>
                    <el-form-item label="小区名称">
                        <el-input v-model.trim="formInline.commuityName" placeholder="输入小区"></el-input>
                    </el-form-item>
                    <el-form-item label="楼栋名称">
                            <el-input v-model.trim="formInline.buildName" placeholder="输入楼栋"></el-input>
                        </el-form-item>
                        <el-collapse-transition>
                            <div  v-if="showAll">
                                <el-form-item label="编辑状态">
                                    <el-select v-model="formInline.editStatus">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="尚未编辑" value="1"></el-option>
                                        <el-option label="已编辑" value="2"></el-option>
                                    </el-select>
                                    </el-form-item>
                                    <el-form-item label="禁用">
                                    <el-select v-model="formInline.forbidStatus">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="是" value="2"></el-option>
                                        <el-option label="否" value="1"></el-option>
                                    </el-select>
                                    </el-form-item>
                                    <el-form-item label="类型">
                                    <el-select v-model="formInline.doorType">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="大门" value="1"></el-option>
                                        <el-option label="单元门" value="2"></el-option>
                                        <el-option label="地库" value="3"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                    </el-collapse-transition>
                    <el-form-item class="Chunks">
                        <el-button type="primary" icon="search" @click="search">搜索</el-button>
                        <!-- <el-button type="primary" icon="share"@click="">数据同步</el-button> -->
                        <el-button type="info" @click="unfoldPack">{{this.showAll ? "更少选项" : "更多选项"}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
        <!-- 标签 -->
        <el-tab-pane label="门标签" name="second" v-if="isAuth('001001001008')">
            <el-form :inline="true" :model="formLbel">
                    <el-form-item label="标签名称">
                        <el-input v-model.trim="formLbel.keyword" placeholder="输入标签名称"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                    <el-select v-model="formLbel.Status">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="可用" value="1"></el-option>
                        <el-option label="不可用" value="0"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="search" @click="tagSearch">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-if="isAuth('001001001009')" icon="plus" @click="adddialogForm = true ">增加标签</el-button>
                    </el-form-item>
                </el-form>
        </el-tab-pane>
    </el-tabs>
   <!-- 管理列表 -->
   <div class="ManageLists" v-show="willShow">
        <el-table
            v-loading="loading2"
            element-loading-text="给我一点时间"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            @selection-change="handleSelectionChange"
            ref="multipleTable"
            :data="accessList"
            size="'small'"
            slot="empty"
            style="width: 100%">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="id"
            label="编号">
            </el-table-column>
            <el-table-column
            prop="msDoorName"
            label="门禁名称">
            </el-table-column>
            <el-table-column
            prop="doorName"
            label="门禁别名">
            </el-table-column>
            <el-table-column
            prop="doorType"
            label="类型">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.doorType | doorFilter}}
                    </div>
                </template>   
            </el-table-column>
            <el-table-column
            prop="floorType"
            label="楼层">
            <template slot-scope="scope">
                <div>
                    {{scope.row.floorType | floorFilter}}
                </div>
                </template>  
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
            prop="buidShowName"
            label="楼栋">
            </el-table-column>
            <el-table-column
            prop="status"
            label="禁用">
                <template slot-scope="scope">
                    <div slot="content">
                        {{ scope.row.status | isUsable}}
                    </div>
                </template>   
            </el-table-column>
            <el-table-column
            prop="doorName"
            label="编辑">
            <template slot-scope="scope">
                    <div slot="content">
                        {{ scope.row.floorType === null ? '否' : '是'}}
                    </div>
                </template> 
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small" v-if="isAuth('001001001001')" @click="lookOver(scope.row)">查看</el-button>
                <el-button type="text" size="small" v-if="isAuth('001001001002')" @click="redactList(scope.row)">编辑</el-button>
                <el-button type="text" size="small" v-if="isAuth('001001001003')"  @click="openPeriod(scope.row)">时段</el-button>
                <el-button type="text" size="small" v-if="isAuth('001001001004','001001001005')"  @click="forbiddenPresent(scope.row)">{{scope.row.status | forbiddenNo}}</el-button>
                <el-button type="text" size="small" v-if="isAuth('001001001006')"  @click="generateCode(scope.row)">生成二维码</el-button>
                <!-- <el-button type="text" size="small" v-for="btn in $route.meta.permission" :key="btn.id">{{btn.name}}</el-button> -->
            </template>
            </el-table-column>;
        </el-table>
        <div class="DeriveLft">
        <el-button type="primary"  v-if="isAuth('001001001007')" icon="el-icon-download"  @click="handleDownload">批量导出二维码</el-button>
        </div>
        <el-dialog
            title="请选择开放时间"
            :visible.sync="centerDialogVisible"
            width="10%"
            center>
            <el-checkbox v-model="checkAll" class="m-b"  @change="checkAllChange(checkAll)">全选</el-checkbox>
            <div v-for="(times, index) in opentimes" :key="times.endTime">
                <el-checkbox-group class="m-b" v-model="times.checklist" @change="setcheckbox(index, times.checklist)">
                    <el-checkbox v-for="(item,indexsub) in times.date" :label="item.label" :key="indexsub" :disabled="item.disabled"></el-checkbox>
                    <i class="settime" @click="removeTimesdate(index, times.checklist)" :class="{'el-icon-circle-close': index!=0}"></i>
                </el-checkbox-group>
                <div class="freezingTime">
                    <el-form :inline="true">
                        <el-form-item label="开始时间">
                            <el-time-select
                                v-model="times.startTime"
                                :editable=false
                                :picker-options="{
                                    start: '00:00',
                                    end: '24:00'
                                }"
                                placeholder="选择时间">
                            </el-time-select>
                        </el-form-item>
                        <el-form-item label="结束时间">
                            <el-time-select
                                v-model="times.endTime"
                                :editable=false
                                :picker-options="{
                                    start: '00:00',
                                    end: '24:00',
                                    minTime: times.startTime
                                }"
                                placeholder="选择时间">
                            </el-time-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <el-button @click="addTimesdate()">增加时间段</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </span>
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
   <!-- 标签管理 -->
   <div class="LabelManage" v-show="!willShow">
       <el-table
            v-loading="loading"
            element-loading-text="给我一点时间"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            ref="multipleTable"
            :data="labelaccessList"
            size="'small'"
            slot="empty"
            style="width: 100%">
            <el-table-column
            prop="id"
            label="标签ID">
            </el-table-column>
            <el-table-column
            prop="keyWord"
            label="标签">
            </el-table-column>
            <el-table-column
            prop="rank"
            label="等级">
            </el-table-column>
            <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
                <div>
                    {{scope.row.status | isUsable}}
                </div>
                </template>  
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small" v-if="isAuth('001001001010')" @click="revamp(scope.row)">修改</el-button>
                <el-button type="text" size="small" v-if="isAuth('001001001011')" @click="remove(scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog title="修改" :visible.sync="dialogamendForm">
            <el-form :model="amendForm">
                <el-form-item label="标签名称">
                <el-input v-model="amendForm.amendtagName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="标签等级">
                <el-input v-model="amendForm.amendgrade" auto-complete="off" type='number' min='1'></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="amendForm.editStatus" size="100%">
                        <el-option label="可用" value="1"></el-option>
                        <el-option label="不可用" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogamendForm = false">取 消</el-button>
                <el-button type="primary" @click="revampConfirm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="增加标签" :visible.sync="adddialogForm" size="40%">
            <el-form :model="formIntagline">
                <el-form-item label="标签名称">
                <el-input v-model="formIntagline.tagName" placeholder="输入标签名"></el-input>
                </el-form-item>
                <el-form-item label="标签等级">
                <el-input v-model="formIntagline.tagGrade" placeholder="输入标签等级" type='number' min='1'></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formIntagline.editStatus" size="100%">
                        <el-option label="可用" value="1"></el-option>
                        <el-option label="不可用" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="adddialogForm = false">取 消</el-button>
                <el-button type="primary" @click="AddTags">确 定</el-button>
            </div>
        </el-dialog>
        <div class="PageLeft">
           注：等级越高优先展示，仅展示5个门标签
        </div>
        <div class="PageRight">
            <el-pagination
            @size-change="handletagSizeChange"
            @current-change="handletagCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20,]"
            :page-size="this.tagpages.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.tagpages.total">
            </el-pagination>
        </div>
   </div>
  </div>
</template>
<script>
import acesslistJs from './accesslist'
export default acesslistJs
</script>
<style>
 .settime{cursor: pointer;}
 .PageLeft{margin-top:20px;float: left; }
</style>




