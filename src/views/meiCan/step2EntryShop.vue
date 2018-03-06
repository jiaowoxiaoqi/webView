<template>
 <div class="entryShopPage">
    <sm-header :smhConfig='sshopHdConfig' :smhTxt='sshopHdTxt' :smhlEvent='backPage'></sm-header>
    <sm-scroll ref="scroll" class="eshopContent">
        <div class="grounp" v-for="(item,index) in entryShops.shops" :key="index">
            <div class='contentTitle'>
              <h3>{{entryShops.tag+(index+1)}}</h3><span @click='deleteGroup(index)' v-if='index!=0&&!item.recommendId'>删&nbsp;&nbsp;除</span>
            </div>
            <ul class="listGrounp" v-if='item.recommendId'>
              <li>
                <label for="">餐厅名称:</label>
                <input type="text" placeholder="请输入详细名称,如:全聚德（闸北店)/必填" v-model="item.name" readonly="readonly" />
                <i class="iconfont icon-jiantou color-gray"></i>
              </li>
              <li>
                <label for="">餐厅地址:</label>
                <input type="text" v-model="item.address" placeholder="请输入详细地址,如:(澳门路100号)/必填" readonly="readonly"/>
                <i class="iconfont icon-jiantou color-gray"></i>
              </li>
              <li>
                <label for="">餐厅电话:</label>
                <input  type="tel"  v-model="item.tel" placeholder="请输入正确格式,如:(0377-8129)/必填" readonly="readonly"/>
                <i class="iconfont icon-jiantou color-gray"></i>
              </li>
            </ul>
            <ul class="listGrounp" v-if='!item.recommendId'>
              <li>
                <label for="">餐厅名称:</label>
                <input type="text" placeholder="请输入详细名称,如:全聚德（闸北店)/必填" v-model="item.name" />
                <i class="iconfont icon-jiantou color-gray"></i>
              </li>
              <li>
                <label for="">餐厅地址:</label>
                <input type="text" placeholder="请输入详细地址,如:(澳门路100号)/必填" v-model="item.address"  />
                <i class="iconfont icon-jiantou color-gray"></i>
              </li>
              <li>
                <label for="">餐厅电话:</label>
                <input  type="tel" placeholder="请输入正确格式,如:(0377-8129)/必填"  v-model="item.tel"  />
                <i class="iconfont icon-jiantou color-gray"></i>
              </li>
            </ul>
        </div>
        <span class="refer" @click='cacheShops'>保存</span>
        <p class="prompt">您最多可推荐{{maxEntryShop}}家餐厅</p>
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
 </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
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
                center_inner_show: false,
                center_title_show: true,
                right_show: true,
                right_title_show: true,
                right_icon_show: false,
            },
            sshopHdTxt:{
                smhCtTxt: '自定义餐厅',
                smhRgTxt: '上线基本规则'
            },
            btnImg: {
                imgUrl: require('@/assets/images/addShops_01 .png'),
                imgAlt: '添加外卖'
            },
            entryShops: { // 推荐餐厅信息--录入餐厅模板
                groom: true,
                select: 1,
                sum: 1,
                itemType: 5,
                tag: '推荐餐厅',
                shops: [{
                    shopId: null,
                    "rowId": 0,
                    "recommendType": 2,
                    "name": "",
                    "imgThumbnail": "",
                    "priceAvgVal": 0,
                    "regionVal": "",
                    "categoryVal": "",
                    "tel": "",
                    "address": "",
                    "checked": false,
                }]
            }, 
            isSubmitData: false, // 提交状态
            selectedShops: this.$store.state.shopInfo.selectedShops, // 选择的商户
            enteredShops: this.$store.state.shopInfo.entryShops, // 手工录入的商户
            maxEntryShop: this.$store.state.userConfig.maxEntryShop // 最大手工录入商户数
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
        staginShop
    },
    created () {
        this.initEntryShop()
    },
    methods: {
        ...mapMutations([
            'setIsQueryMyShop',
            'setEntryShops',
            'setSelectShops'
        ]),
        backPage () { // 返回上页
            this.setIsQueryMyShop(false)
            this.$router.back()
        },
        initEntryShop () { // 已录入未过期的手工推荐餐厅
            let entryShop = JSON.parse(sessionStorage.getItem('enteredShop'))
            if (entryShop&&entryShop.length>0) {
                this.entryShops.shops = entryShop
                this.setEntryShops(this.entryShops.shops)
            }
        },
        deleteGroup: function(index) { // 刪除手工錄入信息
            if (this.entryShops.shops.length > 1) {
                this.entryShops.shops.splice(index, 1);
                this.setEntryShops(this.entryShops.shops)
            }
        },
        cacheShops() { // 添加至stagingShop缓存手工录入信息
            let newShops2 = []
            for (var i = 0, length = this.entryShops.shops.length; i < length; i++) {
                if(this.entryShops.shops[i].name !="" && this.entryShops.shops[i].tel !="" && this.entryShops.shops[i].address != ""){
                    newShops2.push(this.entryShops.shops[i])
                }
            }
            if(newShops2.length!=this.entryShops.shops.length){
                this.messageBox({
                    message: `存在未填写项，请填写完毕再保存`,
                    closeOnClickModal: false,
                    confirmButtonText: '确定'
                })
            }else{
                this.setEntryShops(newShops2)
                this.toast({
                    message: '保存成功',
                    duration: 2000,
                });
            }
        },
        addEntryShop () { // 添加录入餐厅模板
            if (this.entryShops.shops.length < this.maxEntryShop) {
                let item = {
                    shopId: null,
                    RecommendType: 2,
                    name: "",
                    address: "",
                    "rowId": 0,
                    "imgThumbnail": "",
                    "priceAvgVal": 0,
                    "regionVal": "",
                    "categoryVal": "",
                    "tel": "",
                    "checked": false,
                }
                this.entryShops.shops.push(item)
            } else {
                this.toast({
                    message: '最多可推荐'+this.maxEntryShop+'家餐厅',
                    duration: 5000,
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
            
            if (this.enteredShops.length!=this.entryShops.shops.length) {
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
        postShops: async function() { // 提交shop-2
            let pass = localStorage.getItem('channel') // 进入ishop渠道channel/link
            let submitMsg = this.$store.state.userConfig.ishopSubmitMsg
            this.selectedShops.unshift.apply(this.selectedShops, this.enteredShops)
            let params = {
                cityId: sessionStorage.getItem('pingRegionId'),
                hospitalId: sessionStorage.getItem('hospitalId'),
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
        openStagingShop () { // 查看我选择的商户
            let popupConfig = {
                isOpen: true,
                formMoudel: sessionStorage.getItem('mudelType')
            }
            this.Bus.$emit('openStaginShop', popupConfig);
        },
        destroyCache () { // 提交后清除缓存商户
            sessionStorage.removeItem('enteredShop')
            sessionStorage.removeItem('selectedShop')
            this.setSelectShops([])
            this.setEntryShops([])
        }
    }
}
</script>

<style lang="scss">
    @import '~@/assets/sass/meicanStyle/step2EntryShop.scss';
</style>