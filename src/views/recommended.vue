<template>
 <div class="recommend">
    <!-- 我的推荐/头部 -->
    <sm-header :smhConfig='venuesmHdConfig' :smhTxt='venuesmHdTxt' :smhlEvent='backPage'></sm-header>
    <!-- 我的推荐/下拉 -->
    <sm-topBar :itemtype='params.itemType'></sm-topBar>
    <!-- 我推荐的餐厅 -->
    <sm-scroll class="recommendContent" v-if="!isEmptyShopData&&formMoudel=='MeiCan'">
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
    </sm-scroll>
    <!-- 我推荐的外卖/茶歇 -->
    <sm-scroll class="recommendContent" v-if="!isEmptyShopData&&formMoudel=='TakeAway'">
        <div class="editListRow" v-if="shopData.customed.length>0">
            <label>已录入外卖/茶歇</label>
        </div>
        <ul class="list">
            <li v-for="(item,index) in shopData.customed" :key="index">
            <div class="itemInner">
                <!-- //状态暂不展示 -->
                <div class='itemStatus' v-if="item.shopStatusTxt || item.failResaon">
                <span :class="['status',{
                    'color-blue':item.shopStatusTxt=='审核中',
                    'clolor-red':item.shopStatusTxt=='审核未通过',
                    'color-green':item.shopStatusTxt=='审核通过',
                    'color-orangeYellow':item.shopStatusTxt=='商户拓展中',
                    'color-vermilion':item.shopStatusTxt=='商户拓展失败'
                }]">{{item.shopStatusTxt}}</span><span class='info color-gray' v-if="item.failResaon">原因:{{item.failResaon}}</span>
                </div>
                <div class='itemContent flexColumn'>
                <label class="type">外卖类型：<span v-if="item.mealType==1">外卖</span><span v-if="item.mealType==2">茶歇</span></label>
                <label class="title">
                    <span class="th">餐厅名称：</span><span class="tt">{{item.name}}</span>
                </label>
                </div>
            </div>
            <!--v-if="Iftrue"-->
            <!-- <span class="color"  @click="changeMyshop(shop,index,'shop')">删&nbsp;除</span> -->
            <!--<span >已上架</span>-->
            </li>
        </ul>
    </sm-scroll>
    <!-- 餐厅为空 -->
    <div class="recommendContent" v-if="isEmptyShopData&&formMoudel=='MeiCan'">
      <div class="addcontent smMgTop_84">
        <img src="../assets/images/icon_6.png" title="未选择餐厅，请选择">
        <p>您还未添加任何餐厅</p>
        <p>请点击右下角的“添加”按钮去添加吧</p>
      </div>
    </div>
    <!-- 外卖/茶歇为空 -->
    <div class="recommendContent" v-if="isEmptyShopData&&formMoudel=='TakeAway'">
        <div class="addcontent smMgTop_84">
            <img src="../assets/images/icon_20.png" title="未选择外卖，请选择">
            <p>您还未添加任何外卖/茶歇，</p>
            <p>请点击右下角的添加按钮去添加吧！</p>
        </div>
    </div>
    <!-- 添加按钮 -->
    <add-button :btnImgUrl='btnImg' :btnHandle='goPage'></add-button>
    <!-- 商铺详情 -->
    <detailPopup></detailPopup>
 </div>
</template>

<script>
    export default {
        data() {
            return {
                venuesmHdConfig: {
                    left_show: true,
                    left_icon_show: true,
                    left_title_show: false,
                    center_show: true,
                    center_inner_show: false,
                    center_title_show: true,
                    right_show: false,
                },
                venuesmHdTxt: {
                    smhCtTxt: '我推荐的餐厅',
                },
                btnImg: {
                    imgUrl: require('@/assets/images/addShops_01 .png'),
                    imgAlt: '添加外卖'
                },
                formMoudel: sessionStorage.getItem('mudelType'),
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
            'smHeader': (resolve) => {
                require(['@/components/sm_header/sm_header'], resolve);
            },
            'smTopBar': (res) => {
                require(['@/components/I_tabBar/tabBar'], res);
            },
            'smScroll': (resolve) => {
                require(['@/components/sm_scroll/sm_scroll'], resolve);
            },
            'addButton': (res) => {
                require(['@/components/I_button/addButton'], res);
            },
            'detailPopup': (res) => {
                require(['./popup/shopDetail'], res);
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
            // 返回上页
            backPage () {
                this.$router.push('/chooseMudel')
            },
            // 获取我推荐的商店
            queryMyShops: async function() {
                switch (this.formMoudel) {
                    case "MeiCan":
                        this.params.itemType=5
                        this.btnImg={
                            imgUrl: require('@/assets/images/addShops_01 .png'),
                            imgAlt: '添加外卖'
                        }
                        break;
                    case "TakeAway":
                        this.params.itemType=7
                        this.btnImg={
                            imgUrl: require('@/assets/images/addTakeaway_01 .png'),
                            imgAlt: '添加外卖'
                        }
                        break;
                }
                let params = this.params
                const res = await this.axios.post(this.api.queryMyShops, params)
                if(res.status) {
                    this.isEmptyShopData = res.data.customed.length <= 0 && res.data.selected.length <= 0 ;
                    this.shopData = res.data;
                }
            },
            // 查看餐厅详情
            changeStuted (item) {
                let stuted = true
                this.Bus.$emit('changeStuted', stuted);
                this.Bus.$emit('shopItem',item)
            },
            // but事件
            goPage () {
                this.$router.push('/selectAddres')
            }
        }
    }
</script>

<style lang="scss">
 @import '~@/assets/sass/recommended.scss';

</style>
