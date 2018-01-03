<template>
  <div id="commont_city">
      <div class="search">
          <el-form :inline="true">
            <el-form-item label="小区">
                <el-input v-model.trim="filterText" placeholder="输入小区名"></el-input>
            </el-form-item>
            <!-- <el-button type="primary"  size="small" style="margin-top:4px;">搜索相关</el-button> -->
          </el-form>
      </div>
      <div>
          <!-- <div class="Foldbutton">
              <el-button size="mini" @click="unfoldFold">【展开】</el-button>
              <el-button size="mini" @click="unfoldFold">【折叠】</el-button>
          </div> -->
        <el-tree
            class="filter-tree"
            :data="data3"
            :props="defaultProps"
            show-checkbox
            empty-text
            node-key="id"
            :filter-node-method="filterNode"
            highlight-current
            :default-expand-all = "isOpen"
            :default-checked-keys="[5]"
            @check-change="select"
            ref="tree2">
        </el-tree>
      </div>
      <div class="checkAll">
          当前选中小区 ：
            <span v-for="itims in cityData" :key="itims">
                {{R.has('children')(itims) ? "" : itims.label.replace(/\[小区\]/g,"")+','}}
            </span>
      </div>
  </div>
</template>
<script>
import totree from '../../utils/totree'
export default {
        data () {
            return {
                filterText:'',
                isOpen:false,
                cityData:[],
                data3: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
         methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            unfoldFold() {
                this.isOpen = !this.isOpen;
            },
            select(a,b){
            //    console.log(b)
            //    console.log(a)
               if (b == true) {
                   this.cityData.push(a);
               } else {
                   var ary= this.cityData;
                    for (var i = 0; i< ary.length; i++){
                        if (ary[i].id == a.id)
                        ary.splice(i,1);
                    }
               };
               this.$emit('ievent',this.cityData);
            }
         },
         created() {
             var postdata = {}
                this.$api.request('post', this.$api.settings.organization, postdata, function(res) {
                    // console.log(res)
                   let toreeDate = totree.init(res,0,['parentId','id','name'])
                  this.data3 = toreeDate
                }.bind(this))
        },
         watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
    }
</script>
<style lang="scss" scoped>
  .checkAll{
      margin-top: 10px;
      display: block;

      span{
          display: inline-block;
          line-height: 20px;
          font-size: 14px;
          color: #04c;
      }
  }
  .Foldbutton{
      margin-bottom: 10px;
  }
  .el-form-item {
     margin-bottom: 10px;
  }
</style>


