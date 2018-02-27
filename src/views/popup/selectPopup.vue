<template>
    <sm-popup class="detailPopup" :pppConfig='pppConfig' :popupHd='pppHd'>
        <sm-scroll class="popupContent" v-if="listData.length>0">
            <ul class="listGrounp">
                <li class="listItem" v-for='(item,index) in listData' :key='index' @click="selectItem(item)">
                    {{item.txt}}
                </li>
            </ul>
        </sm-scroll>
        <sm-scroll class="popupContent" v-if="hospitalData.length>0">
            <div class="listItem" v-for='(item,index) in hospitalData' :key='index'>
                {{item.name}}
            </div>
        </sm-scroll>
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
                listData: [],
                hospitalData: []
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
            goMap () {
                this.$router.push({
                    name: 'Map',
                    // query: {N: this._data.shopData.fullName, X: this._data.shopData.el, Y: this._data.shopData.nl}
                })
            },
            popupInit () {
                this.Bus.$on('isOpenPopup', (popupConfig) => {
                    this.pppConfig.show = popupConfig.isOpen
                    this.listData = []
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
            getHospitalList: async function (searchInput) {
                let params = {
                    cityId: this.params.cityId,
                    pageSize: 20,
                    pageIndex: 1,
                    searchInput:searchInput?searchInput:''
                }
                const res = await this.axios.post(this.api.getHospitalList, params)
                this.hospital = res.rows
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
                        this.pppHd.title = ""
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
