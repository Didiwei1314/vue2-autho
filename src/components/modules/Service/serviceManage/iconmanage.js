'use strict'
export default {
    data() {
        return {
            accessList: [],
            formLbel: {},
            fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
            formIntagline: {
                type: '',
                name: ''
            },
            formIntaglineAdd: {},
            currentPage4: 1,
            pages: {
                total: 0,
                current: '',
                pageSize: 10,
                pageNo: 1,
                totalPage: '',
                totalData: ''
            },
            loading: false,
            dialogAdd: false,
            dialogCompile: false
        }
    },
    methods: {
        // 搜索
        search() {
            this.businessList()
        },
        // 标签分页
        handletagSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.loading = true;
            this.pages.pageSize = val;
            this.pages.pageNo = 1;
            this.businessList();
            this.$nextTick(function() {
                this.currentPage4 = 1;
            })
        },
        handletagCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.loading = true;
            this.pages.pageNo = val;
            this.businessList(val);
        },
        businessList(page) {
            this.loading = true;
            var postdata = {
                pageSize: this.pages.pageSize,
                pageNo: page ? page : 1
            }
            this.formLbel.name === '' ? '' : postdata.name = this.formLbel.name
            this.formLbel.type === '' ? '' : postdata.type = this.formLbel.type
            this.formLbel.status === '' ? '' : postdata.status = this.formLbel.status

            this.$api.request('post', this.$api.settings.serviceList, postdata, function(res) {
                console.log(res)
                if (res) {
                    this.loading = false
                    this.accessList = res.data
                    this.pages.total = res.total
                }
            }.bind(this));
        },
        // 编辑
        redactList(val) {
            console.log(val)
            this.formIntagline.name = val.name
            this.formIntagline.sort = val.sort
            this.formIntagline.type = val.type.toString()
            this.dialogCompile = true
        },
        // 编辑确定
        EditorConfirm() {
            this.dialogCompile = false
        },
        // 新增
        addList() {
            this.dialogAdd = true
        },
        // 删除
        remove() {

        },
        // 路径
        ImgUrl() {
            console.log()
        },
        // 上传
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            console.log(files)
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeAvatarUpload(file) {
            if (!/^image\/(jpeg|png)$/.test(file.type)) {
                this.$confirm('上传图片暂时只支持JPG格式', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error',
                    callback: action => {
                        this.$refs.form.resetFields();
                        this.$emit('closeEditUpload');
                    }
                })
            }
        },
    },
    mounted() {
        this.businessList()
    },
    filters: {
        businessType(val) {
            switch (val) {
                case 1:
                    return "管理首页图标"
                    break;
                case 2:
                    return "生活页图标"
                    break;
                default:
                    break;
            }
        },
        businessstate(val) {
            switch (val) {
                case 0:
                    return "已启用"
                    break;
                case 1:
                    return "已禁用"
                    break;
                default:
                    break;
            }
        },
    }

}