<template>
    <sm-popup class="detailPopup" :pppConfig='pppConfig'>
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
                    <label for=""></label>
                    <a :href="'tel:' + 1312">{{shopDetail.tel}}</a>
                </li>
                <li>
                    <a >{{shopDetail.address}}</a>
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
            })
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/sass/popup/shopDetail.scss';
</style>
