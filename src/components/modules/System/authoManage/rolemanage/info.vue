<template>
  <div class="accessmanage">
    <el-tabs v-model="types" type="card" @tab-click="a">
        <el-tab-pane label="个人资料" name="first">
            <div class="ManageSearch">
                <el-form :inline="true" :model="formdata1" :rules="rules1" ref="formdata1">
                    <el-form-item label="用户名">
                        <el-input v-model="formdata1.username"  disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="formdata1.name" placeholder="输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input v-model="formdata1.phone" placeholder="输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码">
                        <el-input v-model="formdata1.tel" placeholder="输入电话号码"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input v-model="formdata1.email" placeholder="输入电子邮箱"></el-input>
                    </el-form-item>
                    <el-form-item class="Chunks">
                        <el-button type="primary" icon="edit" @click="amendGetInfo('formdata1')">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
            <div class="ManageSearch">
                <el-form :inline="true" :model="formdata2"  :rules="rules2" ref="formdata2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="原密码" prop="oldpwd">
                        <el-input v-model="formdata2.oldpwd" placeholder="输入原密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newpwd">
                        <el-input v-model="formdata2.newpwd" placeholder="必须为字母加数字的组合" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirm">
                        <el-input v-model="formdata2.confirm" placeholder="确认密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item class="Chunks">
                        <el-button type="primary" icon="edit" @click="submitForm('formdata2')">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane> 
    </el-tabs>
  </div>
</template>
<script>
export default {
  data(){
      var checkoldpwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('原密码不能为空'));
        }else{
            callback();
        }
      };
      var validatePass = (rule, value, callback) => {
      var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formdata2.confirm !== '') {
            this.$refs.formdata2.validateField('confirm');
          }
          if(!reg.test(this.formdata2.newpwd)) {
              callback(new Error('密码必须为字母加数字的组合'));
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formdata2.newpwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatephone = (rule, value, callback) => {
        var reg = new RegExp('^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$');
        if(value === ''){
          callback(new Error('请输入手机号码'));
        }
        if(!reg.test(this.formdata1.phone)) {
              callback(new Error('请输入正确的手机号码！'));
          }
          callback();
      };
    return {
      types: 'first',
      c:'1',
      formdata1:{
        username: '',
        name: '',
        phone: '',
        tel: '',
        email: ''
      },
      formdata2:{
        oldpwd: '',
        newpwd: '',
        confirm: ''
      },
      rules2: {
          oldpwd: [
            { validator: checkoldpwd, trigger: 'blur' }
          ],
          newpwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          confirm: [
            { validator: validatePass2, trigger: 'blur' }
          ]
      },
      rules1: {
          name: [
            { required: true, message: '请输入姓名'}
          ],
          phone: [
            { validator: validatephone, trigger: 'blur', required: true}
          ],
          email:[
            { required: true, message: '请输入邮箱地址'},
            { type: 'email', message: '请输入正确的邮箱地址' }
          ]
      }
    }
  },
  mounted(){
      this.getInfo()
  },
  methods: {
    a(){

    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let postdata = {
                    passwordLast: this.formdata2.oldpwd,
                    password: this.formdata2.newpwd,
                    passwordConfirm:this.formdata2.confirm
                };
                this.$api.request('post', this.$api.settings.recomposepaw, postdata, function(res) {
                  // console.log(res)
                  this.formdata2.oldpwd = ''
                  this.formdata2.newpwd = ''
                  this.formdata2.confirm = ''
                }.bind(this));
          } else {
            this.$message.error('输入有误，请检查！');
            return false;
          }
        });
      },
      // 个人信息
      getInfo (){
        let userID = this.$store.state.userinfo.userId
        let postdata = {
              id:userID
          };
          this.$api.request('post', this.$api.settings.infoPersonal, postdata, function(res) {
            // console.log(res)
              this.formdata1.username = res.username
              this.formdata1.name = res.name
              this.formdata1.phone = res.mobile
              this.formdata1.tel = res.tel
              this.formdata1.email = res.email
          }.bind(this));
      }, 
      // 修改用户资料
      amendGetInfo (formName){
        let userID = sessionStorage.getItem('USER_ID')
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let postdata = {
                    id:userID,
                    username:this.formdata1.username,
                    name:this.formdata1.name,
                    mobile:this.formdata1.phone,
                    tel:this.formdata1.tel,
                    email:this.formdata1.email
                };
                this.$api.request('post', this.$api.settings.amendPersonal, postdata, function(res) {
                  // console.log(res)
                    this.$message({
                      showClose: true,
                      message: '修改成功!',
                      type: 'success'
                    });
                }.bind(this));
          }else{
            this.$message.error('输入有误，请检查！');
            return false;
          }
        })
      }
  }
}
</script>
<style scoped>
  .ManageSearch{
    width: 800px;
  }
</style>


