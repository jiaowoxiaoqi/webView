<template>
    <sm-popup class="selectlPopup" :pppConfig='pppConfig' :popupHd='pppHd'>
        <div class="searchHospital" v-if='hospitalData.length>0'>
            <div class="searchContent">
                <i class="iconfont icon-buoumaotubiao13 color-gray" @click="searchHospital"></i>
                <form action="javascript:return true;" class="smMgLf_8">
                    <input class="selectInput" type="search" placeholder="请输入医院名称" v-model="searchInput" @change="searchHospital">
                </form>
            </div>
        </div>
        <!-- 选择省份/城市 -->
        <sm-scroll class="popupContent" v-if="listData.length>0">
            <ul class="listGrounp">
                <li class="listItem" v-for='(item,index) in listData' :key='index' @click="selectItem(item)">
                    {{item.txt}}
                </li>
            </ul>
        </sm-scroll>
        <!-- 选择医院 -->
        <sm-scroll ref="scroll" class="popupContent hospitalContent" v-if="hospitalData.length>0"
            :data="hospitalData"
            :scrollbar="scrollbar"
            :pullDownRefresh="pulldown"
            :pullUpLoad="pullUpLoad"
            @pullingDown="onloadData"
            @pullingUp="onPullingUp">
            <div class="hospital" v-for='(item,index) in hospitalData' :key='index' @click="selectItem(item)">
                {{item.name}}
            </div>
        </sm-scroll>
    </sm-popup>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
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
                    title: ''
                },
                pulldown: { // 下拉加载配置
                    threshold: 90,
                    stop: 40
                },
                pullUpLoad: {
                    threshold: 50 // 上拉加载距离
                },
                scrollbar: false, // 禁用滚动条
                listData: [], // 省份/城市数据
                hospitalData: [], // 医院数据
                hospitalPage: 1, // 初始查询医院page
                searchInput: '', // 搜索医院信息
                closeGetHospital: false // 是否阻止获取医院请求
            }

        },
        components: {
            'smPopup': (resolve) => {
                require(['@/components/sm_popup/popup'], resolve);
            },
            'smScroll': (resolve) => {
                require(['@/components/sm_scroll/sm_scroll'], resolve);
            },
        },
        created () {
            this.popupInit()
        },
        methods: {
            searchHospital () {
                this.getHospitalList('Refresh',this.searchInput)
            },
            onloadData () {
                this.getHospitalList('Refresh')
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
                this.Bus.$on('isOpenPopup', (popupConfig) => {
                    this.pppConfig.show = popupConfig.isOpen
                    this.listData = this.hospitalData = []
                    switch (popupConfig.type) {
                        case 'Province':
                            this.pppHd.title = "选择省份"
                            this.getProvinceList()
                            break;
                        case 'City':
                            this.pppHd.title = "选择城市"
                            this.getCityList()
                            break;
                        case 'Hospital':
                            this.pppHd.title = "选择医院"
                            this.getHospitalList('Refresh')
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
    @import '~@/assets/sass/popupStyle/selectPopup.scss';
</style>
