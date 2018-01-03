import CryptoJS from '../../../utils/aes'
import totree from '../../../utils/totree'
const weekdats = [
    { "label": "星期一", "disabled": false },
    { "label": "星期二", "disabled": false },
    { "label": "星期三", "disabled": false },
    { "label": "星期四", "disabled": false },
    { "label": "星期五", "disabled": false },
    { "label": "星期六", "disabled": false },
    { "label": "星期日", "disabled": false }
]
export default {
    data() {
        return {
            accessList: [],
            labelaccessList: [{
                status: 0
            }],
            datatotal: 0,
            formInline: {},
            formIntagline: {},
            amendForm: {
                amendtagName: '',
                amendgrade: '',
                editStatus: ''
            },
            formLbel: {},
            pages: {
                total: 0,
                current: '',
                pageSize: 10,
                pageNo: 1,
                totalPage: '',
                totalData: ''
            },
            tagpages: {
                total: 0,
                current: '',
                pageSize: 10,
                pageNo: 1,
                totalPage: '',
                totalData: ''
            },
            listID: '',
            communityIds: '',
            ids: '',
            tagId: '',
            branchIds: '',
            currentPage4: 1,
            activeName2: 'first',
            showAll: false,
            willShow: true,
            centerDialogVisible: false,
            checkAll: false,
            opentimes: [{
                endTime: '',
                startTime: '',
                date: JSON.parse(JSON.stringify(weekdats)),
                checklist: [],
                week: []
            }],
            isIndeterminate: true,
            loading: true,
            loading2: true,
            dialogamendForm: false,
            adddialogForm: false,
            multipleSelection: []
        }
    },
    methods: {
        // 搜索
        search() {
            this.getList()
        },
        // 分页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pages.pageSize = val
            this.pages.pageNo = 1
            this.getList()
            this.$nextTick(function() {
                this.currentPage4 = 1
            })
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pages.pageNo = val
            this.getList(val)
        },
        // 编辑
        redactList(val) {
            this.$router.push({
                path: '/accesscontrol/accesslist/redactlist'
            })
            this.Iteminfo('set', val)
        },
        // 查看
        lookOver(val) {
            this.$router.push({
                path: '/accesscontrol/accesslist/lookover'
            })
            this.Iteminfo('set', val)
        },
        // 开放时段时间
        openPeriod(val) {
            console.log(val)
            if (val.week && val.week.indexOf('[') >= 0) {
                var timesinfo = JSON.parse(val.week)
                timesinfo.forEach(item => {
                    item.date = JSON.parse(JSON.stringify(weekdats))
                    var disabledcheckbox = this.R.difference(item.checklist, item.week)
                        // console.log(disabledcheckbox)
                    disabledcheckbox.forEach(list => {
                        item.date.forEach(times => {
                            if (times.label === list) {
                                times.disabled = true
                            }
                        })
                    })
                })
                this.opentimes = timesinfo
            } else if (val.week === null || (val.week && val.week.indexOf('[') < 0)) {
                this.opentimes = [{
                    endTime: '',
                    startTime: '',
                    date: JSON.parse(JSON.stringify(weekdats)),
                    checklist: [],
                    week: []
                }]
            }
            this.listID = val.id
            this.centerDialogVisible = true
        },
        // 开放时段的周是否全选
        checkAllChange(val) {
            if (val) {
                this.opentimes = this.opentimes.splice(0, 1)
                this.opentimes[0].checklist = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
                this.opentimes[0].date = JSON.parse(JSON.stringify(weekdats))
            } else {
                this.opentimes[0].checklist = []
            }
        },
        setcheckbox(index, val) {
            this.opentimes.forEach((times, timeindex) => {
                if (timeindex === index) {
                    return;
                } else {
                    var newdate = this.R.symmetricDifference(times.checklist, val)
                    times.date.forEach(item => {
                        newdate.forEach(list => {
                            if (item.label === list) {
                                var ishave = this.R.indexOf(list)(times.checklist)
                                if (ishave < 0) {
                                    times.checklist.push(list)
                                    item.disabled = true
                                } else {
                                    this.removeByValue(times.checklist, list)
                                    item.disabled = false
                                }
                            }
                        })
                    })
                }
            })
        },
        removeByValue(arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    arr.splice(i, 1);
                    break;
                }
            }
        },
        removeTimesdate(index, val) {
            var box = []
            var thisweek = this.opentimes[index].date
            thisweek.forEach(item => {
                if (!item.disabled) {
                    box.push(item.label)
                }
            })
            var resultchange = this.R.intersection(val, box)
            this.opentimes.forEach((times, timeindex) => {
                if (timeindex === index) {
                    return;
                } else {
                    times.date.forEach(item => {
                        resultchange.forEach(list => {
                            if (item.label === list) {
                                this.removeByValue(times.checklist, list)
                                item.disabled = false
                            }
                        })
                    })
                }
            })
            this.opentimes.splice(index, 1)
        },
        addTimesdate(type) {
            var newtimes = JSON.parse(JSON.stringify(this.opentimes[this.opentimes.length - 1]))
            if (newtimes.checklist.length == 0) {
                this.$message('请先选择星期')
                return
            } else if (newtimes.checklist.length == 7) {
                return;
            } else {
                newtimes.checklist.forEach(element => {
                    newtimes.date.forEach(item => {
                        if (element == item.label) {
                            item.disabled = true
                        }
                    })
                })
                this.opentimes.push(newtimes)
            }
        },
        // 开放时段确定
        handleConfirm(val) {
            var isok = this.opentimes.every((val, index) => {
                return val.endTime && val.startTime
            })
            if (!isok) {
                this.$message('请填写完整日期')
                return;
            }
            var resulpostdata = []
            this.opentimes.forEach((times, index) => {
                var box = []
                times.date.forEach(item => {
                    if (!item.disabled) {
                        box.push(item.label)
                    }
                })
                times.week = this.R.intersection(box, times.checklist)
                resulpostdata.push({
                    week: times.week,
                    startTime: times.startTime,
                    endTime: times.endTime,
                    checklist: times.checklist
                })
            })
            var postdata = {
                id: this.listID,
                week: resulpostdata
            }
            this.$api.request('post', this.$api.settings.editbuilding, postdata, function(res) {
                // console.log(res)
                if (res) {
                    this.centerDialogVisible = false
                        // console.log(this.pages.pageNo)
                    this.getList()
                }
            }.bind(this))
        },
        // 禁用
        forbiddenPresent(val) {
            let status = val.status
            let sendstatus
            if (status === 2) {
                sendstatus = 1
            } else {
                sendstatus = 2
            }
            this.$confirm('您好，您确定要执行此操作吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                var postdata = {
                    id: val.id,
                    status: sendstatus
                }
                this.$api.request('post', this.$api.settings.editbuilding, postdata, function(res) {
                    // console.log(res);
                    this.getList()
                }.bind(this))
            }).catch(() => {})
        },
        handleClick(tab, event, index) {
            // console.log(tab)
            if (tab.index == 0) {
                this.willShow = true
            } else {
                this.willShow = false
            }
        },
        // 展开更多
        unfoldPack() {
            if (this.showAll === false) {
                this.showAll = true
            } else {
                this.showAll = false
            }
        },
        // 列表接口
        getList() {
            this.loading2 = true
            var postdata = {
                pageSize: this.pages.pageSize,
                pageNo: this.pages.pageNo,
                communityIds: this.communityIds
            }
            this.formInline.keywords === '' ? '' : postdata.keywords = this.formInline.keywords
            this.formInline.commuityName === '' ? '' : postdata.commuityName = this.formInline.commuityName
            this.formInline.buildName === '' ? '' : postdata.buildName = this.formInline.buildName
            this.formInline.editStatus === '' ? '' : postdata.editStatus = this.formInline.editStatus
            this.formInline.forbidStatus === '' ? '' : postdata.forbidStatus = this.formInline.forbidStatus
            this.formInline.doorType === '' ? '' : postdata.doorType = this.formInline.doorType
            this.$api.request('post', this.$api.settings.doorlist, postdata, function(res) {
                //console.log(res)
                if (res) {
                    this.loading2 = false
                    this.accessList = res.data
                    this.pages.total = res.total
                }
            }.bind(this))
        },
        // 标签列表
        tagList(page) {
            this.loading = true
            var postdata = {
                pageSize: this.tagpages.pageSize,
                pageNo: page ? page : 1
            }
            this.formLbel.keyword === '' ? '' : postdata.keyword = this.formLbel.keyword
            this.formLbel.Status === '' ? '' : postdata.status = this.formLbel.Status
            this.$api.request('post', this.$api.settings.tagList, postdata, function(res) {
                // console.log(res)
                if (res) {
                    this.loading = false
                    this.labelaccessList = res.data
                    this.tagpages.total = res.total
                }
            }.bind(this))
        },
        // 标签分页
        handletagSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.tagpages.pageSize = val
            this.tagpages.pageNo = 1
            this.tagList()
        },
        handletagCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.tagpages.pageNo = val
            this.tagList(val)
        },
        // 标签修改
        revamp(val) {
            // console.log(val)
            this.tagId = val.id
            this.dialogamendForm = true
            this.amendForm.editStatus = val.status
            this.amendForm.amendtagName = val.keyWord
            this.amendForm.amendgrade = val.rank
        },
        // 标签修改确定
        revampConfirm() {
            if (this.amendForm.amendtagName === '') {
                this.$message({
                    message: '标签名称不能为空！',
                    type: 'warning'
                })
            } else if (this.amendForm.amendgrade === '') {
                this.$message({
                    message: '标签等级不能为空！',
                    type: 'warning'
                })
            } else {
                var postdata = {
                    keyword: this.amendForm.amendtagName,
                    rank: this.amendForm.amendgrade,
                    status: this.amendForm.editStatus,
                    id: this.tagId
                }
                this.$api.request('post', this.$api.settings.revampTag, postdata, function(res) {
                    this.dialogamendForm = false
                    this.tagList()
                }.bind(this))
            }
        },
        // 标签删除
        remove(val) {
            // console.log(val)
            this.$confirm('此操作将删除该条, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var postdata = {
                    id: val.id,
                    status: 2
                }
                this.$api.request('post', this.$api.settings.delTag, postdata, function(res) {
                    // console.log(res) 
                    this.tagList()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }.bind(this))
            }).catch(() => {})
        },
        // 增加标签 
        AddTags() {
            if (this.formIntagline.tagName == null) {
                this.$message({
                    message: '标签名称不能为空！',
                    type: 'warning'
                })
            } else if (this.formIntagline.tagGrade == null) {
                this.$message({
                    message: '标签等级不能为空！',
                    type: 'warning'
                })
            } else if (this.formIntagline.editStatus == null) {
                this.$message({
                    message: '状态不能为空！',
                    type: 'warning'
                })
            } else {
                var postdata = {
                    keyword: this.formIntagline.tagName,
                    rank: this.formIntagline.tagGrade,
                    status: this.formIntagline.editStatus
                }
                this.$api.request('post', this.$api.settings.addTag, postdata, function(res) {
                    this.adddialogForm = false
                    this.formIntagline.tagName = ''
                    this.formIntagline.tagGrade = ''
                    this.formIntagline.editStatus = ''
                    this.tagList()
                }.bind(this))
            }
        },
        // 搜索标签
        tagSearch() {
            this.tagList()
        },
        // 生成二维码接口
        generateCode(info) {
            // console.log(info);        
            var postdata = {
                type: '1',
                logoName: 'logo.png',
                doorID: info.msDoorNo,
                communityID: info.commuityId,
                doorName: info.msDoorName
            }
            this.$api.request('post', this.$api.settings.codecreats, postdata, function(res) {
                // console.log(res)
                if (res !== '') {
                    this.$message({
                        message: '生成二维码成功！',
                        type: 'success'
                    })
                    this.getList()
                } else {
                    this.$message.error('生成二维码失败！')
                }
            }.bind(this))
        },
        // 批量导二维码全选按钮
        handleSelectionChange(val) {
            // console.log(val);
            this.multipleSelection = val
            var ids = ''
            val.map(function(value, index, array) {
                if (ids === '') {
                    ids = ids + value.id
                } else {
                    ids = ids + ',' + value.id
                }
            })
            this.ids = ids
        },
        // 导出二维码
        handleDownload() {
            let devHost = this.$api.settings.exportqrcodes
            var postdata = {
                ids: this.ids
            }
            var key = CryptoJS.enc.Utf8.parse('y2W89L6BkRAFljhN')
            var iv = CryptoJS.enc.Utf8.parse('dMitHORyqbeYVE0o')
            var source = JSON.stringify(postdata)
            var password = CryptoJS.enc.Utf8.parse(source)
            var encrypted = CryptoJS.AES.encrypt(password, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString() // CryptoJS.pad.Pkcs7
            if (this.multipleSelection.length) {
                let a = this.R.filter(n => n)(this.multipleSelection.map((item, index) => {
                    if (!item.floorType || !item.qrcode) {
                        return {
                            code: !item.floorType ? 1 : !item.qrcode ? 2 : '',
                            id: item.id,
                            index: index
                        }
                    } else {
                        return '';
                    }
                }))
                if (a.length) {
                    let { code, id } = a[0]
                    if (code == 1) {
                        this.$message({
                            message: '请您先编辑编号为' + id + '的信息!',
                            type: 'warning'
                        })
                    } else if (code == 2) {
                        this.$message({
                            message: '请先生成编号为' + id + '的二维码!',
                            type: 'warning'
                        })
                    }
                } else {
                    let ifrbefore = document.getElementById('downqrcode')
                    ifrbefore.href = devHost + '?param=' + encrypted.replace(/\+/g, "%2B")
                    ifrbefore.click()
                }
                // let ifrbefore = document.getElementById('downqrcode')
                // ifrbefore.href = devHost + '?param=' + encrypted.replace(/\+/g, "%2B")
                // ifrbefore.click()
            } else {
                this.$message({
                    message: '请至少选择一条',
                    type: 'warning'
                })
            }
        },
        estateHousing() {
            var postdata = {}
            this.$api.request('post', this.$api.settings.organization, postdata, function(res) {
                let toreeDate = totree.init(res, 0, ['parentId', 'id', 'name'])
                    // console.log(toreeDate)
                let arr = this.branchIds
                var result = []
                arr.forEach(function(item) {
                    trees(toreeDate, item)
                        // console.log(item)
                })

                function trees(arr, id) {
                    if (id) {
                        arr.forEach(item => {
                            if (id == item.id) {
                                result.push(item.id)
                                trees(item.children)
                            } else {
                                if (item.children) trees(item.children, id)
                            }
                        })
                    } else {
                        if (arr) {
                            arr.forEach(item => {
                                result.push(item.id)
                                trees(item.children)
                            })
                        }
                    }
                }

                function unique3(array) {
                    var r = [];
                    for (var i = 0, l = array.length; i < l; i++) {
                        for (var j = i + 1; j < l; j++)
                            if (array[i] === array[j]) j = ++i;
                        r.push(array[i]);
                    }
                    return r;
                }
                this.communityIds = unique3(result).join(',')
                this.getList()
                // console.log(this.communityIds)
            }.bind(this))
        }
    },
    activated() {
        if(this.$route.query.refresh){
            this.getList()
        }
    },
    mounted(){
        this.estateHousing()
        this.getList()
        let branchid = sessionStorage.getItem('branchIds')
        this.tagList()
        if(branchid)this.branchIds = branchid.split(',')
    },
    filters: {
        doorFilter(val) {
            switch (val) {
                case 1:
                    return '大门'
                    break
                case 2:
                    return '单元门'
                    break
                case 3:
                    return '车库'
                    break
                default:
                    break;
            }
        },
        floorFilter(val) {
            switch (val) {
                case 1:
                    return '地上'
                    break;
                case 2:
                    return '地下'
                    break;
                default:
                    break;
            }
        },
        forbiddenNo(val) {
            switch (val) {
                case 1:
                    return '禁用'
                    break;
                case 2:
                    return '解禁'
                    break;
                case null:
                    return '解禁'
                    break;
                default:
                    break;
            }
        },
        isUsable(val) {
            switch (val) {
                case '0':
                    return "不可用";
                    break;
                case '1':
                    return "可用";
                    break;
                case 2:
                    return "是";
                    break;
                case null:
                    return "否";
                    break;
                case 1:
                    return "否";
                    break;
                default:
                    break;
            }
        }
    }
}