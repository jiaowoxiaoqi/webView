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
            <ul class="entryShopGrounp" v-if='entryTakeAway.length>0'>
                <li class="title">录入外卖/茶歇</li>
                <li class="entryShop" v-for="(item,index) in entryTakeAway" :key="index">
                    <div>
                        <h3>类型{{item.value}}</h3>
                    </div>
                    <div>
                        <span>餐厅：{{item.name}}</span>
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
                <div class="footerRight" @click='submitShop'>
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
                isSubmitData: false
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
                        this.entryTakeAway = this.$store.state.shopInfo.entryTakeAway
                        break;
                }
            });
        },
        methods: {
            closePopup () {
                let popupConfig = {
                    isOpen: false,
                    formMoudel: 'Popup'
                }
                this.Bus.$emit('openStaginShop', popupConfig);
            },
            submitShop () { // 提交shop-1
                if(this.isSubmitData){
                    this.toast({
                        message: '正在提交ing..请勿重复操作',
                        duration: 800,
                    });
                    return;
                }
                this.isSubmitData = true
                this.postShops()
            },
            postShops: async function() { // 提交shop-2
                let pass = localStorage.getItem('channel') // 进入ishop渠道channel/link
                let submitMsg = this.$store.state.userConfig.ishopSubmitMsg
                let formMudel = sessionStorage.getItem('mudelType') // 来自哪个模块
                this.selectedShops.unshift.apply(this.selectedShops, this.entryShops)
                let params = {
                    cityId: this.params.cityId,
                    hospitalId: this.params.hospitalId,
                    itemType: 5,
                    shops: formMudel=='MeiCan'?this.selectedShops:this.entryTakeAway,
                    channel: pass
                }
                const res = await this.axios.post(this.api.postMyShops, params)
                if(res){this.isSubmitData=false}
                if (res.status) {
                    this.destroyCache()
                    if(pass=='app'&& submitMsg){
                        this.messageBox({
                            message: submitMsg,
                            confirmButtonText: '确定',
                            closeOnClickModal: false
                        }).then(action => {
                            this.$router.push('/recommended')
                        })
                    }else{
                        this.$router.push('/recommended')
                    }
                } else {
                    this.toast({
                        message: res.msg,
                        position: 'bottom',
                        duration: 2500
                    })
                }
            },
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/sass/popupStyle/stagingShop.scss';
</style>
