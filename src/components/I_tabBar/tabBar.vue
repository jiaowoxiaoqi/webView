<template>
  <div class="dropdownFilter">
    <div class="dFilterDownGrounp">
      <div class="dFilterDown" @click="lookFilterList('city')">
        <span :model="city.txt">{{city.txt}}</span>
        <i class="iconfont icon-arrow-down" v-if='isCityShow'></i>
        <i class="iconfont icon-arrow-up1" v-else></i>
      </div>
      <div class="dFilterDown lastAfter" @click="lookFilterList('hospitail')">
        <span :model="hospitail">{{hospitail}}</span>
        <i class="iconfont icon-arrow-down" v-if='isHospitail'></i>
        <i class="iconfont icon-arrow-up1" v-else></i>
      </div>
    </div>
    <div class="filterContent" v-if="isHospitail">
      <ul class="filterList">
        <li v-for="item in hospitalList " :key="item.name" @click="closeFilter(item,'hospitail')">{{item.name}}</li>
      </ul>
    </div>
    <div class="filterContent" v-if="isCityShow">
      <ul class="filterList">
        <li v-for="item in cityList " :key="item.txt" @click="closeFilter(item,'city')">{{item.txt}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['itemtype'],
    data() {
      return {
        city: {txt:'我的城市'},
        hospitail:"我的医院",

        isHospitail: false,
        isCityShow: false,

        lookNum: 1,

        hospitalList: [{name:"全部"}],
        cityList: [{txt:"全部"}],
      }
    },
    methods: {
      lookFilterList(type) {//展示我的城市/我的医院对应下拉列表
        this.isCityShow = false
        this.isHospitail = false
        if(this.lookNum==1){
          switch (type) {
            case 'city':
              this.isCityShow = true
              this.isHospitail = false
              this.cityList = [{txt:"全部"}]
              this.hospitail = "我的医院"
              this.getCity()
              break;
            case 'hospitail':
              this.isCityShow = false
              this.isHospitail = true
              this.hospitalList = [{name:"全部"}]
              this.getHospital()
              break;
          }
          this.lookNum=0
        }else if(this.lookNum==0){
          switch (type) {
            case 'city':
              this.isCityShow = false
              break;
            case 'hospitail':
              this.isHospitail = false
              break;
          }
          this.lookNum=1
        }
        
      },
      getCity: async function() {//获取我的城市列表
        let params = {
          itemType:this.itemtype
        }
        const res = await this.axios.post(this.api.queryMyCity, params)
        if(res.status&&res.data.length>0){
          this.mergeArray(this.cityList,res.data,'ct')
        }
      },
      getHospital: async function() {//获取我的医院列表

        let params = {
          itemType:this.itemtype,
          cityId: this.city.pingRegionId
        }
        const res = await this.axios.post(this.api.queryMyHospitals, params)
        if(res.status&&res.data.length>0){
          this.mergeArray(this.hospitalList,res.data,'hp')
        }
      },
      closeFilter(item,type) {//选择对应城市/医院存储在session，以及Bus传递
        if(type=="city"){
          this.city = item
          this.isCityShow = false
          let paramsCityId = {
            cityId:  item.pingRegionId
          }
          sessionStorage.removeItem('cityId')
          sessionStorage.removeItem('city')
          this.Bus.$emit("paramsCityId", paramsCityId)
        }else{
          this.hospitail = item.name
          this.isHospitail = false
          let paramsHpId = {
            hospitalId:  item.rowId
          }
          sessionStorage.removeItem('hospitalId')
          sessionStorage.removeItem('hospital')
          this.Bus.$emit("paramsHpId", paramsHpId)
        }
        this.lookNum=1
      },
      mergeArray:function (arr1, arr2,type){ //mergeArray 数组去重合并
        for (var i = 0 ; i < arr1.length ; i ++ ){
          for(var j = 0 ; j < arr2.length ; j ++ ){
            if (type=="hp"&&arr1[i].recommendId === arr2[j].recommendId){
              arr1.splice(i,1);
            }else if(type=="ct"&&arr1[i].pingRegionId === arr2[j].pingRegionId) {
              arr1.splice(i,1);
            }
          }
        }
        for(var i = 0; i <arr2.length; i++){
          arr1.push(arr2[i]);
        }
        return arr1;
      }
    },
  }
</script>

<style lang="less">
    .dropdownFilter{
        .dFilterDownGrounp{
            position: fixed;
            top: .44rem;
            right: 0;
            left: 0;
            height: .40rem;
            width: 100%;
            line-height: .40rem;
            background: #fff;
            color: rgb(51, 51, 51);
            align-items: center;
            box-sizing: border-box;
            display: flex;
            font-size: .14rem;
            .dFilterDown{
                width: 50%;
                height: .40rem;
                line-height: .40rem;
                align-items: center;
                justify-content: center;
                display: flex;
                text-align: center;
                position: relative;
                &::after{
                    content: '';
                    width: .01rem;
                    height: 60%;
                    border-left: 1px solid  #888;
                    position: absolute;
                    top: 20%;
                    right: 0;
                }
                span{
                    float: left;
                    max-width: 80%;
                    text-align: center;
                    white-space: nowrap;
                    overflow: scroll;
                    margin-right: .04rem;

                }
                i{
                    float: left;
                }
            }
            .lastAfter{
                &::after{
                    content: '';
                    width: .01rem;
                    height: 60%;
                    border: 0 none;
                    position: absolute;
                    right: 0;
                }
            }
        }
        .filterContent{
            background: rgba(0, 0, 0, 0.3);
            position: fixed;
            top: .85rem;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 2;
            .filterList{
                box-sizing: border-box;
                padding: 0 .15rem;
                width: 100%;
                max-height: 80%;
                background: #fff;
                overflow: scroll;
                height: auto;
                li {
                    height: .35rem;
                    line-height: .35rem;
                    border-bottom: 1px solid #DDD;
                    font-size: 13px;
                    text-align: left;
                    overflow: -webkit-paged-x;
                }
            }
        }
    }
</style>
