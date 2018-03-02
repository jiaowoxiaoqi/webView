<template>
    <sm-popup class="stagingShop" :pppConfig='pppConfig' :popupHd='pppHd'>
        <!-- 选择省份/城市 -->
        <sm-scroll class="popupContent">
            <ul class="selectShopGrounp" v-if='selectedShops.length>0'>
                <li class="title">选择餐厅</li>
                <li class="selectShop" v-for='(shop,index) in selectedShops' :key='index' @click='changeStuted(shop)'>
                    <img v-bind:src='shop.imgThumbnail' class="shopImg">
                    <div class="shopContent">
                        <div class="shopTitle">
                            <h3>{{shop.name}}</h3>
                        </div>
                        <div class="shopPriceAvgVal">
                            <span v-if="shop.priceAvgVal">￥{{shop.priceAvgVal}}/ 人</span>
                        </div>
                        <div class="shopPriceArea">
                            <span class="cyan">{{shop.regionVal}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="cyan">{{shop.categoryVal}}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="entryShopGrounp" v-if='false'>
                <li class="title">手工录入餐厅</li>
            </ul>
        </sm-scroll>
        <sm-footer class="footerContent">
            <div class="footerInner">
                <div class="footerLeft">
                    <img src="../../assets/images/addShops_01 .png" alt="">
                    <div class="cartHint">
                        <p>我的推荐餐厅</p>
                    </div>
                </div>
                <div class="footerRight">
                    提&nbsp;&nbsp;交
                </div>
            </div>
        </sm-footer>
        <detail-popup></detail-popup>
    </sm-popup>
</template>

<script type="text/ecmascript-6">
    import detailPopup from '../popup/shopDetail'
    export default {
        data() {
            return {
                pppConfig:{ // popup navheader配置显示
                    type: '',
                    show: false,
                    position: 'bottom',
                    height: '100%',
                    hideOnBlur: false,
                    showMask: false
                },
                pppHd:{ // popup navheader配置文本
                    title: '已选择餐厅'
                },
                pulldown: { // 下拉加载配置
                    threshold: 90,
                    stop: 40
                },
                pullUpLoad: {
                    threshold: 50 // 上拉加载距离
                },
                scrollbar: false, // 禁用滚动条
                selectedShops: [], // 餐厅库选择的商户
                entryShops: [], // 手工录入的商户
                entryTakeAway: [], // 手工录入的外卖/茶歇
            }

        },
        components: {
            'smPopup': (resolve) => {
                require(['@/components/sm_popup/popup'], resolve);
            },
            'smScroll': (resolve) => {
                require(['@/components/sm_scroll/sm_scroll'], resolve);
            },
            'smFooter': (resolve) => {
                require(['@/components/sm_footer/sm_footer'], resolve);
            },
            detailPopup
        },
        created () {
            this.popupInit()
        },
        // mounted () {
        //     this.Bus.$on('openStaginShop',(status)=>{
        //         this.pppConfig.show
        //     })
        // },
        methods: {
            searchHospital () {
                this.getHospitalList('Refresh',this.searchInput)
            },
            changeStuted (item) {
                this.Bus.$emit('changeStuted', true);
                this.Bus.$emit('shopItem',item)
            },
            onPullingUp () {
                if(this.closeGetHospital) {
                    console.log(this.$refs)
                    this.$refs.scroll.forceUpdate()
                    this.toast({
                        message: '已无更多医院信息',
                        position: 'bottom',
                        duration: 2500
                    })
                    return;
                }
                this.getHospitalList('Pulling')
            },
            popupInit () {
                this.Bus.$on('openStaginShop', (popupConfig) => {
                    this.Bus.$emit('changeStuted', false);
                    this.pppConfig.show = popupConfig.isOpen
                    // this.listData = this.hospitalData = []
                    switch (popupConfig.formMoudel) {
                        case 'MeiCan':
                            this.pppHd.title = "已选择餐厅"
                            this.selectedShops = this.$store.state.shopInfo.selectedShops
                            console.log(this.$store.state.shopInfo.selectedShops)
                            break;
                        case 'TakeAway':
                            this.pppHd.title = "已选择餐厅"
                            break;
                    }
                });
            },
            getProvinceList: async function () {
                let params = {
                    'regionId': "945e4101-78b8-11e6-b6c0-f80f41fdc7f8",
                    'type': 1
                }
                const res = await this.axios.post(this.api.getCityList, params)
                this.listData = res.data
            },
            getCityList: async function () {
                let params = {
                    regionId: sessionStorage.getItem("provinceId"),
                    type: 2
                }
                const res = await this.axios.post(this.api.getCityList, params)
                this.listData = res.data
            },
            getHospitalList: async function (type,searchInput) {
                
                if(type=='Refresh') {
                    this.hospitalPage = 1
                    this.closeGetHospital = false
                }else{
                    this.hospitalPage ++
                }
                let params = {
                    cityId: sessionStorage.getItem("cityId"),
                    pageSize: 20,
                    pageIndex: this.hospitalPage,
                    searchInput:searchInput?searchInput:''
                }
                const res = await this.axios.post(this.api.getHospitalList, params)
                if(type=='Refresh') {
                    this.hospitalData = res.rows
                }else{
                    res.rows.forEach((item)=> {
                        this.hospitalData.push(item)
                    })
                }
                
                if(res.rows.length<20) {
                    
                    this.closeGetHospital = true
                    
                }
            },
            selectItem (item) {
                switch (this.pppHd.title) {
                    case '选择省份':
                        sessionStorage.setItem("province", item.txt)
                        sessionStorage.setItem("provinceId", item.regionId)
                        this.Bus.$emit('selectProvince', item)
                        break;
                    case '选择城市':
                        sessionStorage.setItem("city", item.txt)
                        sessionStorage.setItem("cityId", item.regionId)
                        sessionStorage.setItem("pingRegionId", item.pingRegionId)
                        this.Bus.$emit('selectCity', item)
                        break;
                    case '选择医院':
                        sessionStorage.setItem("hospital", item.name)
                        sessionStorage.setItem("hospitalId", item.rowId)
                        this.Bus.$emit('selectHospital', item)
                        break;
                }
                this.pppConfig.show = false
            }
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/sass/popupStyle/stagingShop.scss';
</style>
