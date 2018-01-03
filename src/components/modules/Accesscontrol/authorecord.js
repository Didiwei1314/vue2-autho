'use strrict';
import commonCity from '../../common/comomCity'
export default {
    data() {
        return {
            accessList: [{}],
            formInline: {
                gustName: '',
                gustAccountNo: '',
                startTime: '',
                endTime: '',
                gustPhoneNo: '',
                status: '',
                commynityIds: ''
            },
            pages: {
                total: 0,
                current: '',
                pageSize: 10,
                pageNo: 1,
                totalPage: '',
                totalData: ''
            },
            impowerDetails: {},
            cityData: [],
            cityTemporary: [],
            currentPage4: 1,
            activeName2: 'first',
            showAll: false,
            dialogDetails: '',
            formLabelWidth: '140px',
            dialog: false,
            loading: true,
            dialogDetails: '',
            formLabelWidth: '160px',
            dialogDetails: false
        }
    },
    components: {
        'v-city': commonCity
    },
    methods: {
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
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.loading = true;
            this.pages.pageNo = val;
            this.doorList(val);
        },
        //小区选择
        ievent(val) {
            this.cityTemporary = JSON.parse(JSON.stringify(val));
        },
        dialogConfirm() {
            this.cityData = this.cityTemporary;
            this.dialog = false;
            let a = this.R.filter(n => n)(this.cityData.map((item, index) => item.id)).join(',')
            this.formInline.commynityIds = a
            this.doorList()
        },
        //查看
        lookOver(row) {
            this.dialogDetails = true;
            console.log(row);
            this.impowerDetails.idNumber = row.idNumber;
            this.impowerDetails.phone = row.phone;
            this.impowerDetails.areaName = row.areaName;
            this.impowerDetails.communityName = row.communityName;
            this.impowerDetails.customerUsername = row.customerUsername;
            this.impowerDetails.customerName = row.customerName;
            this.impowerDetails.userName = row.userName;
            this.impowerDetails.createDate = row.createDate;
            this.impowerDetails.startDate = row.startDate;
            this.impowerDetails.endDate = row.endDate;
            this.impowerDetails.state = row.state;
            this.impowerDetails.sex = row.sex;
            this.impowerDetails.wxName = row.wxName;
            this.impowerDetails.idType = row.idType;
            this.impowerDetails.cardNo = row.cardNo;
            this.impowerDetails.mark = row.mark;
            this.impowerDetails.reason = row.reason;
            this.impowerDetails.audiTime = row.audiTime;
            this.impowerDetails.authcode = row.authcode;
            this.impowerDetails.doorXml = row.doorXml;
            this.impowerDetails.id = row.id;
        },
        handleClose(val) {
            // console.log(val)
            this.$confirm('您好，您确定要执行此操作吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                var postdata = {
                    id: val.id
                }
                this.$api.request('post', this.$api.settings.theAudit, postdata, function(res) {
                    // console.log(res)
                    if (res) {
                        this.doorList()
                        this.$message({
                            message: '反审核成功！',
                            type: 'success'
                        })
                    }
                }.bind(this))
            }).catch(() => {})
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        unfoldPack() {
            if (this.showAll == false) {
                this.showAll = true;
            } else {
                this.showAll = false
            }
        },
        //访客授权记录
        doorList(page) {
            this.loading = true;
            var postdata = {
                pageSize: this.pages.pageSize,
                pageNo: page ? page : 1
            }
            this.formInline.gustName === '' ? '' : postdata.gustName = this.formInline.gustName
            this.formInline.gustAccountNo === '' ? '' : postdata.gustAccountNo = this.formInline.gustAccountNo
            this.formInline.startTime === '' ? '' : postdata.startTime = this.formatDate(this.formInline.startTime)
            this.formInline.endTime === '' ? '' : postdata.endTime = this.formatDate(this.formInline.endTime)
            this.formInline.gustPhoneNo === '' ? '' : postdata.gustPhoneNo = this.formInline.gustPhoneNo
            this.formInline.status === '' ? '' : postdata.status = this.formInline.status
            this.formInline.commynityIds === '' ? '' : postdata.commynityIds = this.formInline.commynityIds

            this.$api.request('post', this.$api.settings.visitorrecord, postdata, function(res) {
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
        this.doorList()
    },
    filters: {
        auditState(val) {
            switch (val) {
                case 0:
                    return "待审核";
                    break;
                case 1:
                    return "通过";
                    break;
                case 2:
                    return "不通过";
                    break;
                case 3:
                    return "已取消";
                    break;
                default:
                    break;
            }
        },
        IDNumberType(val) {
            switch (val) {
                case 'SFZ':
                    return "身份证";
                    break;
                case 'JZZ':
                    return "居住证";
                    break;
                case 'JSZ':
                    return "驾驶证";
                    break;
                case 'GOTXZ':
                    return "港澳通行证";
                    break;
                case 'GOJMHXZ':
                    return "港澳居民回乡证";
                    break;
                case 'HZ':
                    return "护照";
                    break;
                default:
                    break;
            }
        }
    }
}