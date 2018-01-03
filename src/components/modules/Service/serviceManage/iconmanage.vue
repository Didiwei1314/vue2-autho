<template>
  <div>
    <div class="searchCss">
      <!-- 搜索 -->
      <el-form :inline="true" :model="formLbel">
            <el-form-item label="图标名称">
                <el-input v-model.trim="formLbel.name" placeholder="输入图标名称"></el-input>
            </el-form-item>
            <el-form-item label="分类">
            <el-select v-model="formLbel.type">
                <el-option label="全部" value=""></el-option>
                <el-option label="管理首页图标" value="1"></el-option>
                <el-option label="生活页图标" value="2"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="formLbel.status">
                <el-option label="全部" value=""></el-option>
                <el-option label="启用" value="0"></el-option>
                <el-option label="禁用" value="1"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="plus" @click="addList">新增</el-button>
            </el-form-item>
        </el-form>
    </div>
       <el-table
            v-loading="loading"
            element-loading-text="给我一点时间"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            ref="multipleTable"
            :data="accessList"
            size="'small'"
            slot="empty"
            style="width: 100%">
            <el-table-column
            prop="name"
            label="图标名称">
            </el-table-column>
            <el-table-column
            <el-table-column
            prop="type"
            label="分类">
              <template slot-scope="scope">
                    <div>
                        {{scope.row.type | businessType}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
            prop="sort"
            label="显示顺序">
            </el-table-column>
            <el-table-column
            prop="state"
            label="状态">
                <template slot-scope="scope">
                    <el-tooltip placement="top">
                        <div slot="content">
                            {{scope.row.state === 0 ? '禁用' : '启用'}}
                        </div>
                        <el-button size='small' type="success">
                            {{scope.row.state | businessstate}}
                        </el-button>
                    </el-tooltip>
                </template>  
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="redactList(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog title="增加" :visible.sync="dialogAdd"  size="50%">
            <el-form :model="formIntaglineAdd">
                <el-form-item label="图标名称">
                    <p><el-input v-model="formIntaglineAdd.name"></el-input></p>
                </el-form-item>
               <el-form-item label="图标">
                    <el-upload
                        class="upload-demo"
                        :action="$api.settings.imgUpload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        multiple
                        :limit="3"
                        list-type="picture"
                        :on-exceed="handleExceed"
                        :before-upload="beforeAvatarUpload"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="formIntaglineAdd.type" size="100%">
                        <el-option label="生活页图标" value="1"></el-option>
                        <el-option label="管理首页图标" value="0"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="显示顺序">
                <el-input v-model="formIntaglineAdd.sort" type='number' min='1'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAdd = false">取 消</el-button>
                <el-button type="primary" >确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="dialogCompile"  size="50%">
             <el-form :model="formIntagline">
                <el-form-item label="图标名称">
                    <el-input v-model="formIntagline.name" disabled></el-input>
                </el-form-item>
               <el-form-item label="图标">
                    <el-upload
                        class="upload-demoe"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        list-type="picture"
                        :before-upload="beforeAvatarUpload"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="formIntagline.type" size="100%">
                        <el-option label="生活页图标" value="2"></el-option>
                        <el-option label="管理首页图标" value="1"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="显示顺序">
                <el-input v-model="formIntagline.sort" type='number' min='1' disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCompile = false">取 消</el-button>
                <el-button type="primary" >确 定</el-button>
            </div>
        </el-dialog>
        <div class="PageRight">
            <el-pagination
            @size-change="handletagSizeChange"
            @current-change="handletagCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20,]"
            :page-size="this.pages.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.pages.total">
            </el-pagination>
       </div>
   </div>
</template>
<script>
import iconm from './iconmanage'
export default iconm
</script>
<style lang="scss" scoped>
  .searchCss{
    margin: 20px 0;
  }
 .PageRight {
    float: right;
    margin-top: 30px;
 }
</style>

