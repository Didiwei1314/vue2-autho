'use strict';
export default {
    data() {
        return {
            a: '1',
            accessList: [{
                onecardNum: '135164812565132',
                addressName: '王小五',
                addressPhone: '110521661554',
                accessNum: '125489AD',
                vallage: '珠江帝景',
                building: 22,
                accessName: 'AB0020',
                room: '2210'
            }],
            pages: {
                total: 0,
                current: '',
                pageSize: 10,
                pageNo: 1,
                totalPage: '',
                totalData: ''
            },
            detail: {},
            formInline: {
                doorName: '',
                commuityName: '',
                cardNo: ''
            },
            currentPage4: 1,
            activeName2: 'first',
            showAll: false,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            loading: true
        }
    },
    methods: {
        search() {
            this.doorList()
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pages.pageSize = val;
            this.doorList();
            this.$nextTick(function() {
                this.currentPage4 = 1;
            })
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pages.pageNo = val;
            this.doorList(val);
        },
        lookOver(info) {
            // console.log(info)
            this.dialogFormVisible = true;
            this.detail.cardNo = info.cardNo;
            this.detail.customerName = info.customerName;
            this.detail.customerPhone = info.customerPhone;
            this.detail.msDoorId = info.msDoorId;
            this.detail.doorName = info.doorName;
            this.detail.communityName = info.communityName;
            this.detail.buildName = info.buildName;
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
        doorList(page) {
            this.loading = true;
            var postdata = {
                pageSize: this.pages.pageSize,
                pageNo: page ? page : 1
            }
            this.formInline.doorName === '' ? '' : postdata.doorName = this.formInline.doorName
            this.formInline.commuityName === '' ? '' : postdata.commuityName= this.formInline.commuityName
            this.formInline.cardNo === '' ? '' : postdata.cardNo =  this.formInline.cardNo
            this.formInline.customerName === '' ? '' : postdata.customerName = this.formInline.customerName
            this.formInline.customerPhone === '' ? '' : postdata.customerPhone = this.formInline.customerPhone

            this.$api.request('post', this.$api.settings.userstuck, postdata, function(res) {
                if (res) {
                    this.loading = false;
                    this.accessList = res.data;
                    this.pages.total = res.total;
                }
            }.bind(this));
        }
    },
    mounted() {
        this.doorList();
    }
}