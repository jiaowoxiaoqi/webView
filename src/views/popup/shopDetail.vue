<template>
    <sm-popup class="detailPopup" :pppConfig='pppConfig' :popupHd='pppHd'>
        <div class="popupContent">
            <div class="shopInfo">
                <img class="shopImage" v-bind:src ='shopDetail.imgThumbnail'>
                <div class="shopTitle">
                    <h3>{{shopDetail.name}}</h3>
                    <span>￥{{shopDetail.priceAvgVal}}/ 人</span>
                </div>
            </div>
            <div class="shopArea">
                <span>商区：</span><span>{{shopDetail.regionVal}}</span>
                &nbsp;&nbsp;&nbsp;
                <span>菜系：</span><span>{{shopDetail.categoryVal}}</span>
            </div>
            <ul class="shopInformation">
                <li>
                    <i class="iconfont icon-phone color-blue"></i>
                    <a :href="'tel:' + 1312">{{shopDetail.tel}}</a>
                    <i class="iconfont icon-jiantou color-gray"></i>
                </li>
                <li @click='goMap()'>
                    <i class="iconfont icon-ditu color-blue"></i>
                    <a >{{shopDetail.address}}</a>
                    <i class="iconfont icon-jiantou color-gray"></i>
                </li>
            </ul>
        </div>
    </sm-popup>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                pppConfig:{
                    type: '',
                    show: false,
                    position: 'bottom',
                    height: '100%',
                    hideOnBlur: false,
                    showMask: false
                },
                pppHd:{
                    title: ''
                },
                shopDetail: {}
            }

        },
        components: {
            'smPopup': (resolve) => {
                require(['../../components/sm_popup/popup'], resolve);
            },
        },
        created () {
            this.Bus.$on('changeStuted', (stuted) => {
                this.pppConfig.show = stuted
            });
            this.Bus.$on('shopItem',(item) => {
                this.shopDetail = item
                this.pppHd.title = item.name
            })
        },
        methods: {
            goMap () {
                this.$router.push({
                    name: 'Map',
                    // query: {N: this._data.shopData.fullName, X: this._data.shopData.el, Y: this._data.shopData.nl}
                })
            }
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/sass/popupStyle/shopDetail.scss';
</style>
