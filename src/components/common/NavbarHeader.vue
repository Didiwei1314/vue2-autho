<template>
    <div class="header">
        <div class="user-info">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    当前用户 : {{this.userName}}
                </span>
                <span class="el-dropdown-closeImg"><img src="../../assets/close.png" alt=""> </span>
                <span class="el-dropdown-close" @click="handleClose">
                    退出
                </span>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import Cookies from '../../utils/Cookie'
    export default {
        data() {
            return {
                userName: '',
                dialogVisible: false
            }
        },
        mounted () {     
            this.userName = sessionStorage.getItem('username')
            let name = this.$store.state.userinfo.name || Cookies.get('name')
            this.userName = name
        },
        methods:{
            handleClose() {
                this.$confirm('您好，您确定退出当前账户吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.$store.dispatch('logout')
                    this.$router.push('/')
                }).catch(() => {
                    
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        position: fixed;
        box-sizing: border-box;
        width: 100%;
        color: #fff;
        background-color: #000;
        z-index: 10;
        line-height: 26px;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #e4e4e4;
        cursor: pointer;
        vertical-align: middle;
    }
    .el-dropdown-close{
       color:#fff;
       cursor: pointer;
    }
    .el-dropdown-closeImg{
        margin-left: 20px;
        display: inline-block;
        width: 20px;
        height:18px;
    }
    .el-dropdown-closeImg img{
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        top: 5px;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
