<template>
  <div id="map-container">
      <div class="m-map">
        <div class="search" v-if="placeSearch">
          <input type="text" placeholder="请输入关键字" v-model="searchKey">
          <button type="button" @click="handleSearch">搜索</button>
          <button type="button" @click="personalPicker">地图选点</button>
          <div id="js-result" v-show="searchKey" class="result"></div>
        </div>
        <div id="js-container" class="map"></div>
        <ul class="info">
            <!-- <li><span>经度：</span>{{ this.dragData.lng }}</li>
            <li><span>纬度：</span>{{ this.dragData.lat }}</li> -->
            <li><span>地址：</span>{{ pos.address }}</li>
            <!-- <li><span>最近的路口：</span>{{this.dragData.nearestJunction }}</li>
            <li><span>最近的路：</span>{{ this.dragData.nearestRoad }}</li>
            <li><span>最近的POI：</span>{{ this.dragData.nearestPOI }}</li> -->
            <!-- <li><button @click="submitposi" :disabled="!dragData.address">上传位置</button></li> -->
          </ul>
      </div>
  </div>
</template>
<script>
 import remoteLoad from '../../utils/remoteLoad.js'
import { MapKey, MapCityName } from '../../utils/config'
export default {
  props: ['lat', 'lng'],
      data () {
        return {
          searchKey: '',
          placeSearch: null,
          // dragStatus: false,
          AMapUI: null,
          AMap: null,
          posPick: '',
          map: '',
          pos: {
            address:''
          }
        }
      },
      props:['issearch'],
      watch: {
        searchKey () {
          if (this.searchKey === '') {
            this.placeSearch.clear()
          }
        }
      },
      methods: {
        // 搜索
        handleSearch () {
          if (this.searchKey) {
            this.placeSearch.search(this.searchKey)
          }
        },
        // 实例化地图
        initMap () {
          // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
          var _this = this;
          let AMapUI = this.AMapUI = window.AMapUI
          let AMap = this.AMap = window.AMap
          AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
            _this.posPick = PositionPicker;
            let mapConfig = {
              zoom: 16,
              cityName: MapCityName
            }
            if (this.lat && this.lng) {
              mapConfig.center = [this.lng, this.lat]
            }
            let map = new AMap.Map('js-container', mapConfig)
            this.addMarker(map);
            _this.map = map;
            // 加载地图搜索插件
            if(this.issearch[0]){
              AMap.service('AMap.PlaceSearch', () => {
                this.placeSearch = new AMap.PlaceSearch({
                  pageSize: 5,
                  pageIndex: 1,
                  citylimit: true,
                  city: MapCityName,
                  map: map,
                  autoFitView: true,
                  panel: 'js-result'
                }).on('listElementClick',function(a){
                  let data = {
                    address: a.data.name+a.data.address,
                    position: {
                      lat: a.data.location.lat,
                      lng: a.data.location.lng
                    }
                  };
                  _this.$emit('drag', data)
                  _this.pos = data;
                  _this.searchKey = null;
                })
              })
            }
            // 启用工具条
            AMap.plugin(['AMap.ToolBar'], function () {
              map.addControl(new AMap.ToolBar({
                position: 'RB'
              }))
            })
          })
        },
        personalPicker(){
          // 创建地图拖拽
            let positionPicker = new this.posPick({
              mode: 'dragMarker', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
              map: this.map // 依赖地图对象
            })
            // 拖拽完成发送自定义 drag 事件
            positionPicker.on('success', positionResult => {
                this.$emit('drag', positionResult)
                this.pos.address = positionResult.address;
            })
            // 启动拖放
            positionPicker.start();
        },
        addMarker(map) {
          if(this.issearch[1] && this.issearch[1].indexOf('{')>-1){
            var posi = JSON.parse(this.issearch[1])
            this.pos = posi;
            var position = [posi.lng,posi.lat]
          }else{
            return;
          }
          var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
          map.clearMap();
          map.setZoomAndCenter(14, position);
          var marker = new AMap.Marker({
              map: map,
              position: position
          });
           marker.content = posi.address;
          //鼠标点击marker弹出自定义的信息窗体
          AMap.event.addListener(marker, 'click', function() {
            // console.log(marker)
            // console.log(marker.getPosition())
            // console.log(marker.getMap())
             infoWindow.setContent(marker.content);
             infoWindow.open(map, marker.getPosition());
              // infoWindow.open(map, marker.getPosition());
          });
        }
      },
      async created () {
        // 已载入高德地图API，则直接初始化地图
        if (window.AMap && window.AMapUI) {
          this.initMap()
        // 未载入高德地图API，则先载入API再初始化
        } else {
          await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`)
          await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
          this.initMap();
        }
      }
    }
</script>
<style lang="scss" scoped>
  .m-map{ min-width: 500px; min-height: 300px; position: relative; }
  .m-map .map{ width: 100%; height: 100%; }
  .m-map .search{ position: absolute; top: 10px; left: 10px; width: 360px; z-index: 1; }
  .m-map .search input{ width: 180px; border: 1px solid #ccc; line-height: 20px; padding: 5px; outline: none; }
  .m-map .search button{ line-height: 26px; background: #fff; border: 1px solid #ccc; text-align: center; }
  .m-map .result{ max-height: 300px; overflow: auto; margin-top: 10px; }
  #js-container{height: 350px;}
  .info li{font-weight: 600;font-size: 20px;}
</style>


