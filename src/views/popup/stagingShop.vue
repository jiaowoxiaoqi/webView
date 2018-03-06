<template>
    <sm-popup class="stagingShop" :pppConfig='pppConfig' :popupHd='pppHd' :closePopupHandle='closePopup'>
        <sm-scroll class="popupContent">
            <ul class="selectShopGrounp" v-if='selectedShops.length>0'>
                <li class="title">选择餐厅</li>
                <li class="selectShop" v-for='(shop,index) in selectedShops' :key='index'>
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
            <ul class="entryShopGrounp" v-if='entryShops.length>0'>
                <li class="title">手工录入餐厅</li>
                <li class="entryShop" v-for="(item,index) in entryShops" :key="index">
                    <div>
                        <h3>餐厅：{{item.name}}</h3>
                    </div>
                    <div>
                        <span>电话：{{item.address}}</span>
                    </div>
                    <div>
                        <span>地址：{{item.tel}}</span>
                    </div>
                </li>
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
    </sm-popup>
</template>

<script type="text/ecmascript-6">
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
            }
        },
        created () {
            this.Bus.$on('openStaginShop', (popupConfig) => {
                this.pppConfig.show = popupConfig.isOpen
                switch (popupConfig.formMoudel) {
                    case 'MeiCan':
                        this.pppHd.title = "已选择餐厅"
                        this.selectedShops = this.$store.state.shopInfo.selectedShops
                        this.entryShops = this.$store.state.shopInfo.entryShops
                        break;
                    case 'TakeAway':
                        this.pppHd.title = "已选择餐厅"
                        break;
                }
            });
        },
        // mounted () {
        //     this.Bus.$on('openStaginShop',(status)=>{
        //         this.pppConfig.show
        //     })
        // },
        methods: {
            closePopup () {
                let popupConfig = {
                    isOpen: false,
                    formMoudel: 'Popup'
                }
                this.Bus.$emit('openStaginShop', popupConfig);
            },
            onPullingUp () {
                if(this.closeGetHospital) {
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
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/sass/popupStyle/stagingShop.scss';
</style>
