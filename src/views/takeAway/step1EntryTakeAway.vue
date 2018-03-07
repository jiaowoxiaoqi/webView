<template>
 <div class="entryShopPage">
    <sm-header :smhConfig='sshopHdConfig' :smhTxt='sshopHdTxt' :smhlEvent='backPage'></sm-header>
    <sm-scroll ref="scroll" class="eshopContent">
        <div class="grounp" v-for="(item,index) in entryTakeAway.shops" :key="index">
            <div class='contentTitle'>
              <h3>{{entryTakeAway.tag + (index+1)}}</h3><span @click='deleteGroup(index)' v-if='index!=0&&!item.recommendId'>删&nbsp;&nbsp;除</span>
            </div>
            <ul class="listGrounp" v-if='item.recommendId'>
              <li>
                <label for="">外卖类型:</label>
                <input type="text" placeholder="请选择外卖类型/必选" :value="item.value" readonly="readonly" />
                <i class="iconfont icon-jiantou color-gray"></i>
              </li>
              <li>
                <label for="">餐厅名称:</label>
                <input type="text" v-model="item.name" placeholder="请输入详细地址,如:(澳门路100号)/必填" readonly="readonly"/>
                <i class="iconfont icon-jiantou color-gray"></i>
              </li>
            </ul>
            <ul class="listGrounp" v-if='!item.recommendId'>
              <li @click='openSelectType(index)'>
                <label for="">外卖类型:</label>
                <input type="text" placeholder="请选择外卖类型/必选" :value="item.value" readonly="readonly"/>
                <i class="iconfont icon-jiantou color-gray"></i>
              </li>
              <li>
                <label for="">餐厅名称:</label>
                <input type="text" placeholder="请输入详细地址,如:(澳门路100号)/必填" v-model="item.name"  />
                <i class="iconfont icon-jiantou color-gray"></i>
              </li>
            </ul>
        </div>
        <span class="refer" @click='cacheShops'>保存</span>
        <p class="prompt">总计可推荐{{totalEntry}}家外卖/茶歇</p>
    </sm-scroll>
    <sm-footer class="footerConter">
        <div class="footerInner">
            <div class="footerLeft" @click="openStagingShop">
                <img src="../../assets/images/addShops_01 .png" alt="">
                <div class="cartHint">
                    <p>我推荐的餐厅</p>
                </div>
            </div>
            <div class="footerRight" @click='submitShop'>
                提&nbsp;&nbsp;交
            </div>
        </div>
    </sm-footer>
    <!-- 添加按钮 -->
    <add-button :btnImgUrl='btnImg' :btnHandle='addEntryShop'></add-button>
    <stagin-shop></stagin-shop>
    <select-type :listGround='selectTypeConfig'></select-type>
 </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import staginShop from '../popup/stagingShop'
import selectType from '../popup/selectTypePopup'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            sshopHdConfig:{
                left_show: true,
                left_icon_show: true,
                left_title_show: false,
                center_show: true,
                center_inner_show: false,
                center_title_show: true,
                right_show: false,
            },
            sshopHdTxt:{
                smhCtTxt: '录入外卖/茶歇',
            },
            btnImg: { // 添加按鈕信息
                imgUrl: require('@/assets/images/addTakeaway_01 .png'),
                imgAlt: '添加外卖'
            },
            selectTypeConfig:[
                {
                    txt: "外卖",
                    mealType: 1,
                    checkend: true,
                    fromItemSign: ''
                },
                {
                    txt: "茶歇",
                    mealType: 2,
                    checkend: false,
                    fromItemSign: ''
                }
            ],
            entryTakeAway: { // 推荐餐厅信息--录入餐厅模板
                take: true,
                select: 1,
                sum: 1,
                "cityId": '',
                "hospitalId": '',
                itemType: 7,
                tag: '外卖/茶歇',
                shops: [{
                    status: "true",
                    value: '外卖',
                    mealType: "1",
                    name: '',
                    "recommendType": 2,
                    "rowId": 0,
                    "shopId": '',
                    "imgThumbnail": "",
                    "priceAvgVal": 0,
                    "regionVal": "",
                    "categoryVal": "",
                    "tel": "",
                    "address": "",
                    "checked": true
                }]
            }, 
            isSubmitData: false, // 提交状态
            enteredTakeAway: this.$store.state.shopInfo.entryTakeAway, // 手工录入的商户
            totalEntry: this.$store.state.userConfig.totalEntry, // 录入总计
            waimaiEntry: this.$store.state.userConfig.waimaiEntry, // 录入外卖限制
            chaxieEntry: this.$store.state.userConfig.chaxieEntry, // 录入茶歇限制
        }
    },
    computed: {
        entryToal: function() {// 已录入的个数
            return this.entryShops.shops.length;
        },
        oddEntryToal: function() {// 还可以录入的个数
            return this.maxEntryShop-this.entryShops.shops.length;
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
        'addButton': (res) => {
            require(['@/components/I_button/addButton'], res);
        },
        staginShop,
        selectType
    },
    created () {
        this.queryMyShops()
        this.initSelectType()
        this.Bus.$on('selectType',(item=>{
            this.entryTakeAway.shops[item.fromItemSign].value = item.txt
            this.entryTakeAway.shops[item.fromItemSign].mealType = item.mealType
        }))
    },
    methods: {
        ...mapMutations([
            'setEntryTakeAway',
        ]),
        backPage () { // 返回上页
            this.$router.back()
        },
        initSelectType () { //初始化類型選項
            if(this.waimaiEntry==0){
                this.selectTypeConfig.splice(0,1)
            }
            if(this.chaxieEntry==0){
                this.selectTypeConfig.splice(1,1)
            }
        },
        openSelectType (index) { // 打开类型选择
            this.Bus.$emit('openSelectType', true);
            this.Bus.$emit('itemSign',index)
        },
        deleteGroup: function(index) { // 刪除手工錄入信息
            if (this.entryTakeAway.shops.length > 1) {
                this.entryTakeAway.shops.splice(index, 1);
                this.setEntryTakeAway(this.entryTakeAway.shops)
            }
        },
        cacheShops() { // 添加至setEntryTakeAway缓存手工录入信息
            let newTakeAway = []
            this.entryTakeAway.shops.forEach(item=>{
                if(item.name !=''){
                    newTakeAway.push(item)
                }
            })
            if(newTakeAway.length!=this.entryTakeAway.shops.length){
                this.messageBox({
                    message: `存在未填写项，请填写完毕再保存`,
                    closeOnClickModal: false,
                    confirmButtonText: '确定'
                })
            }else{
                this.setEntryTakeAway(newTakeAway)
                this.toast({
                    message: '保存成功',
                    duration: 2000,
                });
            }
        },
        addEntryShop () { // 添加录入餐厅模板
            if (this.entryTakeAway.shops.length < this.totalEntry) {
                let item = {
                    status: "true",
                    value: '外卖',
                    mealType: "1",
                    name: '',
                    "recommendType": 2,
                    "rowId": 0,
                    "shopId": '',
                    "imgThumbnail": "",
                    "priceAvgVal": 0,
                    "regionVal": "",
                    "categoryVal": "",
                    "tel": "",
                    "address": "",
                    "checked": true
                }
                this.entryTakeAway.shops.push(item)
            } else {
                this.toast({
                    message: '最多可推荐'+this.totalEntry+'家外卖/茶歇',
                    duration: 3000,
                });
            }
        },
        submitShop () { // 提交shop-1
            if(this.isSubmitData){
                this.toast({
                    message: '正在提交ing..请勿重复操作',
                    duration: 800,
                });
                return;
            }
            this.enteredTakeAway = this.$store.state.shopInfo.entryTakeAway
            if (this.enteredTakeAway.length != this.entryTakeAway.shops.length) {
                this.messageBox({
                    message: `存在未填写项，确认提交`,
                    showCancelButton: true,
                    cancelButtonText: "取消",
                    confirmButtonText: '确定'
                }).then(action => {
                    if (action == "confirm") {
                        this.isSubmitData = true
                        this.postShops()
                    }
                })
            }else{
                this.isSubmitData = true
                this.postShops()
            }
        },
        queryMyShops: async function() { // 获取我推荐的外卖/茶歇
            let params = {
                "itemType": 7,
                hospitalId: sessionStorage.getItem("hospitalId"),
                cityId: sessionStorage.getItem('pingRegionId'),
            }
            const res = await this.axios.post(this.api.queryMyShops, params)
            if (res.data.customed.length > 0) {
                let nodeData = []
                res.data.customed.forEach(item=>{
                    if(!item.isDead){
                        nodeData.push(item)
                    }
                })
                nodeData.forEach(item=>{
                    switch(item.mealType){
                        case 1:
                            item.value = "外卖"
                            break;
                        case 2:
                            item.value = "茶歇"
                            break;
                    }
                })
                this.entryTakeAway.shops = nodeData.length>0?nodeData:this.cart.shops
                this.setEntryTakeAway(this.entryTakeAway.shops)
            }
        },
        postShops: async function() { // 提交shop-2
            let type3Num = 0;
            let type4Num = 0;
            this.enteredTakeAway.forEach(item=>{
                switch(item.mealType){
                    case 1:
                        type3Num ++
                        break;
                    case 2:
                        type4Num ++
                        break;
                }
            })
            if(this.waimaiEntry>0 && this.waimaiEntry < type3Num){
                this.toast({
                    message: '最多可推荐' + waimaiEntry +'家外卖',
                    duration: 2000,
                });
                return;
            }
            console.log(this.chaxieEntry)
            if (this.chaxieEntry>0 && this.chaxieEntry < type4Num) {
                this.toast({
                    message: '最多可推荐' + this.chaxieEntry +'家茶歇',
                    duration: 2000,
                });
                return;
            }
            let pass = localStorage.getItem('channel')
            let params = {
                hospitalId:  Number(sessionStorage.getItem("hospitalId")),
                cityId: Number(sessionStorage.getItem('pingRegionId')),
                itemType: 7,
                shops: this.enteredTakeAway,
                channel: pass
            }
            const res = await this.axios.post(this.api.postMyShops, params)
            if(res){this.isSubmitData = false}
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
                    duration: 2500,
                })
            }
        },
        openStagingShop () { // 查看我选择的商户
            let popupConfig = {
                isOpen: true,
                formMoudel: sessionStorage.getItem('mudelType')
            }
            this.Bus.$emit('openStaginShop', popupConfig);
        },
        destroyCache () { // 提交后清除缓存商户
            this.setEntryTakeAway([])
        }
    }
}
</script>

<style lang="scss">
    @import '~@/assets/sass/meicanStyle/step2EntryShop.scss';
</style>