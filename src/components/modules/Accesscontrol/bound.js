'use script';
import commonCity from '../../common/comomCity'
export default {
    data() {
        return {
            accessList: [],
            formInline: {
                cardNo: '',
                bindingPhoneNo: '',
                bindStatus: '',
                userName: '',
                startTime: '',
                endTime: '',
                roomName: '',
                communityIds: ''
            },
            cardDetails: {},
            pages: {
                total: 0,
                current: '',
                pageSize: 10,
                pageNo: 1,
                totalPage: '',
                totalData: ''
            },
            cityData: [],
            cityTemporary: [],
            currentPage4: 1,
            activeName2: 'first',
            showAll: false,
            dialog: false,
            loading: true,
            dialogDetails: '',
            formLabelWidth: '140px',
            dialogDetails: false
        }
    },
    components: {
        'v-city': commonCity
    },
    methods: {
        ievent(val) {
            this.cityTemporary = JSON.parse(JSON.stringify(val));
        },
        dialogConfirm() {
            this.cityData = this.cityTemporary;
            let a = this.R.filter(n => n)(this.cityData.map((item, index) => item.id)).join(',')
                // console.log(a)
            this.formInline.communityIds = a
            this.dialog = false;
            this.doorList()
        },
        //搜索
        search() {
            this.doorList()
        },
        //分页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.loading = true;
            this.pages.pageSize = val;
            this.pages.pageNo = 1;
            this.doorList();
            this.$nextTick(function() {
                this.currentPage4 = 1;
            })
        },
        //分页
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.loading = true;
            this.pages.pageNo = val;
            this.doorList(val);
        },
        lookOver(row) {
            // console.log(row)
            this.dialogDetails = true;
            this.cardDetails.areaName = row.areaName;
            this.cardDetails.owneraccount = row.customerUsername;
            this.cardDetails.userName = row.customerName;
            this.cardDetails.entranceCard = row.cardNo;
            this.cardDetails.bindingPhoneNo = row.phone;
            this.cardDetails.cardTime = row.createDate;
            this.cardDetails.staff = row.employeeName;
            this.cardDetails.Operationnote = row.employeeComment;
            this.cardDetails.bindStatus = row.state;
            this.cardDetails.bindStatuserror = row.errorStr;
        },
        handleClose(val) {
            console.log(val)
            let operationId = sessionStorage.getItem('USER_ID')
            this.$confirm('您好，您确定要解绑吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                var postdata = {
                    id: val.id,
                    unbindType: '2',
                    operationId: operationId
                }
                this.$api.request('post', this.$api.settings.unbundle, postdata, function(res) {
                    // console.log(res)
                    if (res) {
                        this.doorList()
                        this.$message({
                            message: '解绑成功！',
                            type: 'success'
                        })
                    }
                }.bind(this))
            }).catch(() => {})
        },
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        unfoldPack() {
            if (this.showAll == false) {
                this.showAll = true;
            } else {
                this.showAll = false
            }
        },
        //绑卡列表接口
        doorList(page) {
            this.loading = true;
            var postdata = {
                pageSize: this.pages.pageSize,
                pageNo: page ? page : 1
            }
            this.formInline.cardNo === '' ? '' : postdata.cardNo = this.formInline.cardNo
            this.formInline.bindingPhoneNo === '' ? '' : postdata.bindingPhoneNo = this.formInline.bindingPhoneNo
            this.formInline.bindStatus === '' ? '' : postdata.bindStatus = this.formInline.bindStatus
            this.formInline.userName === '' ? '' : postdata.userName = this.formInline.userName
            this.formInline.startTime === '' ? '' : postdata.startTime = this.formatDate(this.formInline.startTime)
            this.formInline.endTime === '' ? '' : postdata.endTime = this.formatDate(this.formInline.endTime)
            this.formInline.roomName === '' ? '' : postdata.roomName = this.formInline.roomName
            this.formInline.communityIds === '' ? '' : postdata.communityIds = this.formInline.communityIds

            this.$api.request('post', this.$api.settings.cardmanagement, postdata, function(res) {
                // console.log(res)
                if (res) {
                    this.loading = false;
                    this.accessList = res.data;
                    this.pages.total = res.total;
                }
            }.bind(this));
        },
    },
    created() {
        this.doorList();
    },
    filters: {
        bindingState(val) {
            switch (val) {
                case 0:
                    return "绑定成功";
                    break;
                case 1:
                    return "解绑";
                    break;
                case 2:
                    return "绑定失败";
                    break;
                default:
                    break;
            }
        }
    }
}