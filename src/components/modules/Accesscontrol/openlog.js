'use strict';
import commonCity from '../../common/comomCity'
export default {
    data() {
        return {
            accessList: [{
                area: '华南区域',
                housing: '合生紫龙府',
                ownernumber: '18820001800',
                ownername: '梁焕宇',
                buildingtime: '2017-09-28 10:29:52',
                vallage: '2710004'
            }],
            formInline: {
                startTime: '',
                endTime: ''
            },
            pages: {
                total: 0,
                current: '',
                pageSize: 10,
                pageNo: 1,
                totalPage: '',
                totalData: ''
            },
            openDetails: [],
            cityData: [],
            cityTemporary: [],
            currentPage4: 1,
            activeName2: 'first',
            showAll: false,
            dialogDetails: '',
            formLabelWidth: '140px',
            endTime: '',
            startTime: '',
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
        // 搜索
        search() {
            this.doorList()
        },
        // 分页
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
        // 选择小区
        ievent(val) {
            this.cityTemporary = JSON.parse(JSON.stringify(val));
        },
        dialogConfirm() {
            this.cityData = this.cityTemporary;
            this.dialog = false;
            let a = this.R.filter(n => n)(this.cityData.map((item, index) => item.id)).join(',')
            this.formInline.communityIds = a
            this.doorList()
        },
        // 查看
        lookOver(row) {
            // console.log(row);
            this.dialogDetails = true;
            this.openDetails.areaName = row.areaName;
            this.openDetails.customerName = row.customerName;
            this.openDetails.openType = row.openType;
            this.openDetails.createDate = row.createDate;
            this.openDetails.doorName = row.doorName;
            this.openDetails.code = row.code;
            this.openDetails.wxName = row.wxName;
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
        // 开门日志
        doorList(page) {
            this.loading = true;
            var postdata = {
                pageSize: this.pages.pageSize,
                pageNo: page ? page : 1,
                startTime: this.formatDate(this.formInline.startTime)
            }
            this.formInline.name === '' ? '' : postdata.name = this.formInline.name
            this.formInline.authedNo === '' ? '' : postdata.authedNo = this.formInline.authedNo
            this.formInline.endTime === '' ? '' : postdata.endTime = this.formatDate(this.formInline.endTime)
            this.formInline.type === '' ? '' : postdata.type = this.formInline.type
            this.formInline.communityIds === '' ? '' : postdata.communityIds = this.formInline.communityIds

            this.$api.request('post', this.$api.settings.openDay, postdata, function(res) {
                // console.log(res)
                if (res) {
                    this.loading = false;
                    this.accessList = res.data;
                    this.pages.total = res.total;
                }
            }.bind(this))
        },
    },
    created() {
        let myDate = new Date();
        this.formInline.startTime === '' ? this.formInline.startTime = myDate : this.formInline.startTime
        this.doorList()
    },
    filters: {
        opendoorState(val) {
            switch (val) {
                case 0:
                    return "业主开门"
                    break;
                case 1:
                    return "访客开门"
                    break;
                case 2:
                    return "扫码开门"
                    break;
                default:
                    break;
            }
        }
    }
}