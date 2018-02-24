<template>
 <div class="recommendMeican">
    <zy-header :zyhConfig='venueZyHdConfig' :zyhTxt='venueZyHdTxt' :zyhlEvent='backPage'></zy-header>
    <zy-topBar :itemtype='params.itemType'></zy-topBar>
    <div class="recommendContent" v-if="!isEmptyShopData">
        <div class="editListRow" v-if="shopData.selected.length>0">
            <label>已选餐厅</label>
        </div>
        <ul class="list">
            <li v-for="(item,index) in shopData.selected" :key="index" @click="changeStuted(item)">
                <div class='itemInner'>
                    <div class='itemStatus' v-if='item.shopStatusTxt||item.failResaon'>
                        <span :class="['status',{
                        'color-blue':item.shopStatusTxt=='审核中',
                        'clolor-red':item.shopStatusTxt=='审核未通过',
                        'color-green':item.shopStatusTxt=='审核通过',
                        'color-orangeYellow':item.shopStatusTxt=='商户拓展中',
                        'color-vermilion':item.shopStatusTxt=='商户拓展失败'
                        }]">{{item.shopStatusTxt}}</span><span class='info color-gray' v-if='item.failResaon'>原因:{{item.failResaon}}</span>
                    </div>
                    <div class='itemContent'>
                        <img v-bind:src ='item.imgThumbnail' class="img">
                        <div class="content">
                            <h3 class='shopTitle'>{{item.name}}</h3>
                            <div class='shopPhon'>{{item.categoryVal||'不详'}}</div>
                            <div class='shopAddres'><span>地址：</span><span class='address'>{{item.address||'不详'}}</span></div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="editListRow" v-if="shopData.customed.length>0">
            <label>手工录入餐厅</label>
        </div>
        <ul class="list">
            <li v-for="(shop,index) in shopData.customed" :key="index">
                <div class="itemInner">
                <div class='itemStatus' v-if='shop.shopStatusTxt||shop.failResaon'>
                    <span :class="['status',{
                    'color-blue':shop.shopStatusTxt=='审核中',
                    'clolor-red':shop.shopStatusTxt=='审核未通过',
                    'color-green':shop.shopStatusTxt=='审核通过',
                    'color-orangeYellow':shop.shopStatusTxt=='商户拓展中',
                    'color-vermilion':shop.shopStatusTxt=='商户拓展失败'
                    }]">{{shop.shopStatusTxt}}</span><span class='info color-gray' v-if="shop.failResaon">原因:{{shop.failResaon}}</span>
                </div>
                <div class='itemContent flexColumn'>
                    <h3>餐厅：{{shop.name}}</h3>
                    <div>电话：{{shop.tel}}</div>
                    <div>地址：{{shop.address}}</div>
                </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="recommendContent" v-else>
      <div class="addcontent">
        <img src="" title="未选择餐厅，请选择">
        <p>您还未添加任何餐厅</p>
        <p>请点击右下角的“添加”按钮去添加吧</p>
      </div>
    </div>
    <add-button></add-button>
 </div>
</template>

<script>
    export default {
        data() {
            return {
                venueZyHdConfig: {
                    left_show: true,
                    left_icon_show: true,
                    left_title_show: false,
                    center_show: true,
                    center_inner_show: false,
                    center_title_show: true,
                    right_show: false,
                    right_title_show: false,
                    right_icon_show: true,
                },
                venueZyHdTxt: {
                    zyhCtTxt: '我推荐的餐厅',
                },
                isEmptyShopData: true,
                shopData: [],
                params: {
                    "itemType":5,
                    "hospitalId": "",
                    "cityId": ""
                }
            }
        },
        components: {
            'zyHeader': (resolve) => {
                require(['@/components/zy_header/zy_header'], resolve);
            },
            'zyTopBar': (res) => {
                require(['@/components/I_tabBar/tabBar'], res);
            },
            'addButton': (res) => {
                require(['@/components/I_button/addButton'], res);
            }
        },
        created() {
            this.queryMyShops()
        },
        mounted() {
            this.Bus.$on('paramsHpId', params => {
                this.params.hospitalId  = params.hospitalId
                this.queryMyShops()
            });
            this.Bus.$on('paramsCityId', params => {
                this.params.cityId  = params.cityId
                this.params.hospitalId  = ""
                this.queryMyShops()
            });
        },
        methods: {
            backPage () {
                this.$router.back()
            },
            queryMyShops: async function() {
                let params = this.params
                const res = await this.axios.post(this.api.queryMyShops, params)
                if(res.status) {
                    this.isEmptyShopData = res.data.customed.length <= 0 && res.data.selected.length <= 0 ;
                    this.shopData = res.data;
                }
            },
            changeStuted(item){
                let stuted = true
                this.Bus.$emit('changeStuted', stuted);
                this.Bus.$emit('shopItem',item)
            },
        }
    }
</script>

<style lang="scss">
 @import '~@/assets/sass/meicanStyle/recommendedMeiCan.scss';

</style>
