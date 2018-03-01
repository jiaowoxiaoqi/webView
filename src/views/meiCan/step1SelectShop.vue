<template>
 <div class="selectShopPage">
    <sm-header :smhConfig='sshopHdConfig' :smhTxt='sshopHdTxt' :smhlEvent='backPage'>
        
    </sm-header>
    <sm-scroll ref="scroll" class="sshopContent"
        :data="shopList"
        :scrollbar="scrollbar"
        :pullDownRefresh="pulldown"
        :pullUpLoad="pullUpLoad"
        @pullingDown="onloadData"
        @pullingUp="onPullingUp">
        <div class="shopInfo" v-for="(item,index) in shopList" :key="index" @click='changeStuted(item)'>
            <!--<img :src="item.imgThumbnail" v-if="item.imgThumbnail">-->
            <img v-bind:src='item.imgThumbnail' class="shopImg">
            <div class="shopContent">
                <div class="shopTitle">
                    <h3>{{item.name}}</h3>
                </div>
                <div class="shopPriceAvgVal">
                    <span v-if="item.priceAvgVal">￥{{item.priceAvgVal}}/ 人</span>
                </div>
                <div class="shopPriceArea">
                    <span class="cyan">{{item.regionVal}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="cyan">{{item.categoryVal}}</span>
                </div>
            </div>
            <i :class="['iconfont icon-duihaocheckmark17 color-gray',{'selectStatus':item.checked}]" @click.stop='selectShop(item,index)'></i>
        </div>
    </sm-scroll>
    <detail-popup></detail-popup>
 </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import detailPopup from '../popup/shopDetail'
export default {
    data() {
        return {
            sshopHdConfig:{
                left_show: true,
                left_icon_show: true,
                left_title_show: false,
                center_show: true,
                center_inner_show: true,
                center_title_show: false,
                right_show: true,
                right_title_show: true,
                right_icon_show: false,
            },
            sshopHdTxt:{
                smhCtPlaceholder: '请输入搜索信息',
                smhCtVal: '',
                smhRgTxt: '上线基本规则'
            },
            pulldown: { // 下拉加载配置
                threshold: 90,
                stop: 40
            },
            pullUpLoad: {
                threshold: 50 // 上拉加载距离
            },
            scrollbar: false, // 禁用滚动条
            shopList: [], // 获取的商户列表
            closeGetShopList: false, // 是否禁用请求商户列表
            params: { // 获取餐库餐厅传入参数
                cityId: sessionStorage.getItem('pingRegionId'),
                hospitalId: sessionStorage.getItem('hospitalId'),
                PageIndex: 1,
                PageSize: 20,
                keyword: '',
                distance: this.$store.state.userConfig.ishopParam.distance,
                maxPriceAvg: this.$store.state.userConfig.ishopParam.maxPriceAvg,
                minPriceAvg: this.$store.state.userConfig.ishopParam.minPriceAvg,
            },
            selectedShops: [] // 选择的商户
            // maxSelectShop: 
        }
    },
    components: {
        'smHeader': (resolve) => {
            require(['@/components/sm_header/sm_header'], resolve);
        },
        'smScroll': (resolve) => {
            require(['@/components/sm_scroll/sm_scroll'], resolve);
        },
        detailPopup
    },
    created () {
        console.log(this.$store.state.userConfig.isShowItem5)
        this.queryShops('Refresh')
    },
    methods: {
        backPage () {
            this.$router.back()
        },
        onloadData () {
            this.queryShops('Refresh')
        },
        onPullingUp () {
            if(this.closeGetShopList) {
                this.$refs.scroll.forceUpdate()
                this.toast({
                    message: '已无更多商户信息',
                    position: 'bottom',
                    duration: 2500
                })
                return;
            }
            this.queryShops('PullingUp')
        },
        queryShops: async function(type) { //获取商户列表
            if(type=='Refresh') {
                this.params.PageIndex = 1
                this.closeGetShopList = false
            }else{
                this.params.PageIndex ++
            }
            let params = this.params
            const res = await this.axios.post(this.api.queryShops, params)
            console.log(res)
            if (res.status){
                // this.shopList=this.shopList.concat(res.data)
                if(type=='Refresh') {
                    this.shopList = res.data
                }else{
                    res.data.forEach((item)=> {
                        this.shopList.push(item)
                    })
                }
                if(res.data.length<20) {
                    this.closeGetShopList = true
                }
            }
            
        },
        changeStuted (item) { // 查看餐厅详情
            let stuted = true
            this.Bus.$emit('changeStuted', stuted);
            this.Bus.$emit('shopItem',item)
        },
        selectShop (item,index) {
            let isActiveSelect = item.recommendId?false:true // 是否为首次选择的餐厅
            let isRepeat = false // 是否存在于选择的商户列表里
            this.selectedShops.forEach((sShop) => {
                if(sShop.shopId == item.shopId){
                    isRepeat = true
                }
            })
            if(!isRepeat&&isActiveSelect) { // 做不存在处理
                if(this.selectedShops.length >= this.$store.state.userConfig.maxSelectShop){//勾选列表内容是否超出规则限制？messageBox:push
                    this.messageBox({
                        message: `您已达到选择餐厅上限`,
                        confirmButtonText: '确认'
                    })
                }else {
                    item.checked=true;
                    item.recommendType = 1;
                    this.selectedShops.push(item)
                }               
            }
            if(isRepeat&&isActiveSelect&&item.checked) { // 首次选择的可删除
                item.checked = false
                for(let i=0,L=this.selectedShops.length;i<L;i++){
                    if(item.shopId == this.selectedShops[i].shopId) {
                        this.selectedShops.splice(i,1)
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss">
    @import '~@/assets/sass/meicanStyle/step1SelectShop.scss';
</style>