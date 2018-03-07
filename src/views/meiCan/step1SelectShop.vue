<template>
 <div class="selectShopPage">
    <sm-header 
        :smhConfig='sshopHdConfig' 
        :smhTxt='sshopHdTxt'
        :smhcSearchEvent ='searchEvent'
        :smhcIconEvent ='searchIconEvent' 
        :smhlEvent='backPage'>
    </sm-header>
    <sm-scroll ref="scroll" class="sshopContent"
        :data="shopList"
        :scrollbar="scrollbar"
        :pullDownRefresh="pulldown"
        :pullUpLoad="pullUpLoad"
        @pullingDown="onloadData"
        @pullingUp="onPullingUp">
        <div :class="['shopInfo',{'smBg_gray2':item.isDead}]" v-for="(item,index) in shopList" :key="index" @click='openShopDeta(item)'>
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
    <p class="prompt">如餐厅不在列表内，请<span class="color-blue" @click='goEntryShop'>手工录入</span></p>
    <sm-footer class="footerConter">
        <div class="footerInner">
            <div class="footerLeft" @click="openStagingShop">
                <img src="../../assets/images/addShops_01 .png" alt="">
                <div class="cartHint">
                    <p>已推荐餐厅<span class="color-blue">{{selectToal}}</span>个</p>
                    <p>还能推荐<span class="color-orangeYellow">{{oddToal}}</span>个</p>
                </div>
            </div>
            <div class="footerRight" @click='submitShop'>
                提&nbsp;&nbsp;交
            </div>
        </div>
    </sm-footer>
    <detail-popup></detail-popup>
    <stagin-shop></stagin-shop>
 </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import detailPopup from '../popup/shopDetail'
import staginShop from '../popup/stagingShop'
import { mapMutations } from 'vuex'
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
                right_show: this.$store.state.userConfig.ishopRuleMsg?true:false,
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
            pullUpLoad: { // 上拉加载配置
                threshold: 50 
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
            oldKeyword: '', // 上一次搜索条件
            selectedShops: this.$store.state.shopInfo.selectedShops, // 选择的商户
            entryShops: this.$store.state.shopInfo.entryShops, // 手工录入的商户
            maxSelectShop: this.$store.state.userConfig.maxSelectShop, // 最大选择条件
            isSubmitData: false, // 提交状态
            isQueryMyShop: this.$store.state.shopInfo.isQueryMyShop, // 是否获取我的推荐餐厅
        }
    },
    computed: {
        selectToal: function() {//已选择的个数
            return this.selectedShops.length;
        },
        oddToal: function() {//还可以选择的个数
            return this.maxSelectShop-this.selectedShops.length;
        },
    },
    components: {
        'smHeader': (resolve) => {
            require(['@/components/sm_header/sm_header'], resolve);
        },
        'smScroll': (resolve) => {
            require(['@/components/sm_scroll/sm_scroll'], resolve);
        },
        'smFooter': (resolve) => {
            require(['@/components/sm_footer/sm_footer'], resolve);
        },
        detailPopup,
        staginShop
    },
    created () {
        this.queryShops('Refresh')
        if(this.isQueryMyShop) {
            this.queryMyShops()
        }
    },
    methods: {
        ...mapMutations([
            'setSelectShops',
            'setEntryShops',
        ]),
        searchIconEvent () { // 搜索icon事件
            this.params.keyword = this.sshopHdTxt.smhCtVal
            this.queryShops("Refresh")
        },
        searchEvent (e) { // 搜索框事件
            let keyCode = e.keyCode
            if(keyCode=='13') {  
                e.preventDefault();     
                this.params.keyword = this.sshopHdTxt.smhCtVal
                this.queryShops("Refresh")
            }
        },
        backPage () {
            this.messageBox({
                message: '确认退出推荐餐厅？',
                confirmButtonText: '确定',
                showCancelButton: true,
                cancelButtonText: '取消',
                closeOnClickModal: false
            }).then(action => {
                if(action=='confirm'){
                    this.destroyCache()
                    this.$router.back()
                }else{
                    console.log(action)
                }
            })
        },
        onloadData () { // 下拉
            this.queryShops('Refresh')
        },
        onPullingUp () { // 上拉
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
        queryMyShops: async function() {//获取已录入数据
            let params = {
                "itemType": 5,
                "hospitalId": this.params.hospitalId
            }
            const res = await this.axios.post(this.api.queryMyShops, params)
            // 遍历得到的已录入自定义餐厅，判断isDead?false:enteredShop.push(res.data.customed[i])
            if (res.data.customed.length > 0) {
                let enteredShop = []
                let customed = res.data.customed // 已录入的自定义餐厅
                customed.forEach( item => {
                    if(!item.isDead) {
                        enteredShop.push(item)
                    }
                });
                sessionStorage.setItem('enteredShop',JSON.stringify(enteredShop)) // 存储未过期的已推荐的录入餐厅
            }
            // 遍历得到的已录入餐厅库餐厅，判断isDead?false:this.myShops.push(res.data.customed[i])
            if (res.data.selected.length > 0) {
                let selectedShop = []
                let selected = res.data.selected // 已选择的餐库餐厅
                selected.forEach(item => {
                    if(!item.isDead) {
                        selectedShop.push(item)
                    }
                });
                sessionStorage.setItem('selectedShop',JSON.stringify(selectedShop)) // 存储未过期的已选择的餐库餐厅
                this.selectedShops.unshift.apply(this.selectedShops,selectedShop)
                this.setSelectShops(this.selectedShops)
            }
            
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
            let stagingShop = this.$store.state.shopInfo.selectedShops
            if (res.status){
                if(stagingShop.length>0){
                    res.data.forEach(item=>{
                        for(let i=0,l=stagingShop.length;i<l;i++){
                            if (item.shopId==stagingShop[i].shopId){
                                item.checked = true
                            }
                        }
                    })
                }
                if(type=='Refresh') {
                    this.shopList = res.data
                }else{
                    if(this.params.keyword&&res.data.length==0){
                        this.toast({
                            message: '找不到相关信息',
                            duration: 2500
                        })
                    }else if(this.params.keyword==this.oldKeyword){
                        this.shopList=this.shopList.concat(res.data)
                    }else if(this.params.keyword!=this.oldKeyword){
                        this.shopList=res.data
                    }else{
                        this.shopList=this.shopList.concat(res.data)
                    }
                }
                if(res.data.length<20) {
                    this.closeGetShopList = true
                }
            }
            this.oldKeyword=this.params.keyword;
            
        },
        postShops: async function() { // 提交shop-2
            let pass = localStorage.getItem('channel') // 进入ishop渠道channel/link
            let submitMsg = this.$store.state.userConfig.ishopSubmitMsg
            this.selectedShops.unshift.apply(this.selectedShops, this.entryShops)
            let params = {
                cityId: this.params.cityId,
                hospitalId: this.params.hospitalId,
                itemType: 5,
                shops: this.selectedShops,
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
        selectShop (item,index) { // 选择商户
            let isActiveSelect = item.recommendId?false:true // 是否为首次选择的餐厅
            let isRepeat = false // 是否存在于选择的商户列表里
            this.selectedShops.forEach((sShop) => {
                if(sShop.shopId == item.shopId){
                    isRepeat = true
                }
            })
            if(!isRepeat&&isActiveSelect) { // 做不存在录入处理
                if(this.selectedShops.length >= this.maxSelectShop){//勾选列表内容是否超出规则限制？messageBox:push
                    this.messageBox({
                        message: `你已达到选择餐厅上限`,
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
            this.setSelectShops(this.selectedShops)
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
        openShopDeta (item) { // 查看餐厅详情
            this.Bus.$emit('openShopDeta', true);
            this.Bus.$emit('shopItem',item)
        }, 
        openStagingShop () { // 查看已选择商户
            let popupConfig = {
                isOpen: true,
                formMoudel: sessionStorage.getItem('mudelType')
            }
            this.Bus.$emit('openStaginShop', popupConfig);
        },
        goEntryShop () {// 打开手工录入页面
            this.$router.push('/entryShop')
        },
        destroyCache () {
            sessionStorage.removeItem('enteredShop')
            sessionStorage.removeItem('selectedShop')
            this.setSelectShops([])
            this.setEntryShops([])
        } 
    }
}
</script>

<style lang="scss">
    @import '~@/assets/sass/meicanStyle/step1SelectShop.scss';
</style>