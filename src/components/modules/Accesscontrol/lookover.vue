<template>
    <div class="amap-page-container">
      <div class="listView">
          <table>
            <tr>
              <th>门禁编号</th>
              <td>{{infoLsit.id}}</td>
            </tr>
            <tr>
              <th>门禁名称</th>
              <td>{{infoLsit.msDoorName}}</td>
            </tr>
            <tr>
              <th>门禁别名</th>
              <td>{{infoLsit.doorName}}</td>
            </tr>
            <tr>
              <th>类型</th>
              <td>{{infoLsit.doorType == 1 ? '大门' :'单元门'}}</td>
            </tr>
            <tr>
              <th>楼层</th>
              <td>{{infoLsit.floorType == 1 ? '地上' :'地下'}}</td>
            </tr>
            <tr>
              <th>小区</th>
              <td>{{infoLsit.communityName}}</td>
            </tr>
            <tr>
              <th>楼栋</th>
              <td>{{infoLsit.buidShowName}}</td>
            </tr>
             <tr>
              <th>二维码</th>
              <td>
                <img :src="'http://file.aihsh.cn/'+ infoLsit.qrcode" id="myImage" alt="请生成二维码" />
                <p>02珠江华景家园</p>
              </td>
            </tr>
          </table>
      </div>
      <div class="g-wraper">
        <div class="m-part" v-if="infoLsit.msDoorNo">
          <mapDrag :issearch="[false,infoLsit.position]" class="mapbox"></mapDrag>
        </div>
      </div>
    </div>
  </template>

  <style lang="scss" scoped>
    .amap-demo {
      height: 350px;
      width: 100%;
      margin: 0 auto;
    }
    .g-wraper{ margin: 0 auto; color: #666; font-size: 16px; line-height: 30px; }
    .m-part{ margin-bottom: 30px; }
    .m-part::after{ content: ''; display: block; clear: both; }
    .m-part .title{ font-size: 30px; line-height: 60px; margin-bottom: 10px; color: #333; }
    .m-part .mapbox{ width: 970px; height: 500px; margin-bottom: 20px; float: left; margin-left: 50px;}
    .m-part .info{ margin: 0; padding: 0; list-style: none; line-height: 30px; margin-left: 820px; }
    .listView{
      width: 90%;
      margin: 20px auto;

      table{
        display: table-row-group;
        vertical-align: middle;
        border-color: inherit;

        tr{
          display: table-row;
          vertical-align: inherit;
          border-color: inherit;
          

          th,td{
            background-color: #f9f9f9;
            line-height: 16px;
            padding: 10px;
            width: 160px;
            vertical-align: top;
            border-top: 1px solid #dddddd;
          }
          td{
            width: 90%;

            img{
                max-width: 400px;
            }
            p{
              max-width: 280px;
              line-height: 20px;
              text-align: center;
              font-size: 24px;
              color: rgba(41, 36, 36, 0.97);
              margin-top: 20px;
            }
          }
        }
      }
    }
  </style>

<script>
import acesslistJs from './accesslist'
import mapDrag from '../../common/map.vue'
    export default {
      name: 'amap-page',
      components: {
        mapDrag
      },
      data() {
        return {
          dragData: {
            lng: null,
            lat: null,
            address: null,
            nearestJunction: null,
            nearestRoad: null,
            nearestPOI: null
          },
          infoLsit:{
            msDoorNo:null,
            msDoorName:'',
            doorName:'',
            doorType:'',
            floorType:'',
            communityName:'',
            buildName:'',
            qrcode:'',
            position: ''
          }
        };
      },
      mounted(){
          // this.infoLsit = this.Iteminfo('get');
          // console.log(this.infoLsit)
          // var data = {
          //   id: this.$route.query.build
          // }
          // this.$api.request('post',this.$api.settings.buildinginfo,data,function(res){
          //   console.log(res);
            // this.infoLsit.msDoorNo = res.msDoorNo;
            // this.infoLsit.msDoorName = res.msDoorName;
            // this.infoLsit.doorName = res.doorName;
            // this.infoLsit.doorType = res.doorType;
            // this.infoLsit.floorType = res.floorType;
            // this.infoLsit.communityName = res.communityName;
            // this.infoLsit.buildName = res.buildName;
            // this.infoLsit.qrcode = res.qrcode;
          // }.bind(this));
          this.infoLsit = this.Iteminfo('get');
          console.log(this.infoLsit)
          var data = {
            id: this.$route.query.build
          }
      },
      methods: {
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
        submitposi() {
          console.log(this.dragData)
        }
      }
    };
</script>