<template>
    <div class="FormsList">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="门禁编号" prop="msDoorNo">
                <el-input v-model="ruleForm.msDoorNo" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="门禁名称" prop="msDoorName">
                <el-input v-model="ruleForm.msDoorName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="小区" prop="communityName">
                <el-input v-model="ruleForm.communityName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="楼栋" prop="buildName">
                <el-input v-model="ruleForm.buidShowName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="doorType">
                <el-select v-model="ruleForm.doorType" placeholder="请选择类型">
                <el-option label="大门" :value="1"></el-option>
                <el-option label="单元门" :value="2"></el-option>
                <el-option label="车库门" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="楼层" prop="floorType">
                <el-select v-model="ruleForm.floorType" placeholder="请选择楼层">
                <el-option label="地上" :value="1"></el-option>
                <el-option label="地下" :value="2"></el-option>
                </el-select>
            </el-form-item>
                <el-form-item label="门禁别名" prop="doorName">
                <el-input v-model="ruleForm.doorName"></el-input>
            </el-form-item>
            <el-form-item label="位置">
                <mapDrag @drag="dragMap" class="mapbox" :issearch="[true,ruleForm.position]"></mapDrag>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="abroGate">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
  </template>

  <style lang="scss" scoped>
      .FormsList{
          width: 50%;
          margin: 40px auto;
      }
  </style>

<script>
import mapDrag from '../../common/map.vue'
  export default {
    components: {
        mapDrag
    },
    data() {
      return {
        ruleForm: {
          doorName: '',
          doorType: '',
          msDoorNo: '',
          floorType: '',
          communityName: '',
          buildName: '',
          msDoorName:'',
          position: ''
        },
        rules: {
          doorName: [
            { required: true, message: '请输入门禁别名'},
            { min: 1, max: 10, message: '门禁别名的长度应在 1 到 10 个字之间'}
          ],
          doorType: [
            { required: true, message: '请选择门类型'}
          ],
          floorType: [
            { required: true, message: '请选择楼层'}
          ]
        },
        dragData: {
          lng: null,
          lat: null,
          address: null,
          nearestJunction: null,
          nearestRoad: null,
          nearestPOI: null
        }
      };
    },
    methods: {
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.dragData.address){
              this.ruleForm.position = JSON.stringify({
                address: this.dragData.address,
                lng: this.dragData.lng,
                lat: this.dragData.lat
              })
            }
            this.$api.request('post',this.$api.settings.editbuilding,this.ruleForm,function(res){
              // console.log(res)
              if(res){
                 _this.$message({
                    message: '保存成功！',
                    type: 'success'
                });
                _this.Iteminfo('set',_this.ruleForm)
                _this.$router.push({
                  path: '/accesscontrol/accesslist',
                  query: {
                    refresh: true
                  }
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      abroGate() {
        this.$router.go(-1);
      },
      dragMap (data) {
        console.log(data)
        this.dragData = {
          lng: data.position.lng,
          lat: data.position.lat,
          address: data.address
          // nearestJunction: data.nearestJunction,
          // nearestRoad: data.nearestRoad,
          // nearestPOI: data.nearestPOI
        }
      },
      getbulidinginfo(){
         var data = {
           id: this.$route.query.build
         }
         this.$api.request('post',this.$api.settings.buildinginfo,data,function(res){
           console.log(res)
           this.ruleForm = res;
         }.bind(this))
      },
      submitposi() {
        console.log(this.dragData)
      }
    },
    mounted(){
      this.ruleForm = this.Iteminfo('get');
    },
    activated(){
      // this.getbulidinginfo();
      this.ruleForm = this.Iteminfo('get');
      console.log(this.ruleForm)
    }
  }
</script>