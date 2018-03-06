<template>
    <div class="selectAddresPage">
        <sm-header :smhConfig='selectHdConfig' :smhTxt='selectHdTxt' :smhlEvent='backPage'></sm-header>
        <div class="selectAddresContent smMgTop_44">
            <ul class="listGrounp">
                <li>
                    <label for="" class="sm_w2">国家</label>
                    <input type="text" placeholder="(必选)" :value="selectData.country" readonly="readonly" class="country">
                    <i class="iconfont"></i>
                </li>
                <li @click='openSelectPopup("Province")'>
                    <label for="" class="sm_w2">省份</label>
                    <input type="text" placeholder="(必选)" :value="selectData.province.txt" readonly="readonly" >
                    <i class="iconfont icon-jiantou color-gray"></i>
                </li>
                <li @click='openSelectPopup("City")'>
                    <label for="" class="sm_w2">城市</label>
                    <input type="text" placeholder="(必选)" :value="selectData.city.txt" readonly="readonly">
                    <i class="iconfont icon-jiantou color-gray"></i>
                </li>
                <li class="hospital" @click='openSelectPopup("Hospital")'>
                    <label for="" class="sm_w4">医院名称</label>
                    <input type="text" placeholder="(必选)" :value="selectData.hospital.name" readonly="readonly">
                    <i class="iconfont icon-jiantou color-gray"></i>
                </li>
            </ul>
            <span @click="jump">下&nbsp;一&nbsp;步</span>
        </div>
        <select-popup></select-popup>
    </div>
</template>

<script type="text/ecmascript-6">
import selectPopup from './popup/selectPopup'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            selectHdConfig:{
                left_show: true,
                left_icon_show: true,
                left_title_show: false,
                center_show: true,
                center_inner_show: false,
                center_title_show: true,
                right_show: false,
            },
            selectHdTxt:{
                smhCtTxt: '选择地址',
            },
            selectData: {
                country: '中国',
                province: {
                    txt: sessionStorage.getItem('province'),
                    regionId: sessionStorage.getItem('provinceId')
                },
                city: {
                    txt: sessionStorage.getItem('city'),
                    regionId: sessionStorage.getItem('cityId'),
                    pingRegionId: sessionStorage.getItem('pingRegionId')
                },
                hospital: {
                    name: sessionStorage.getItem('hospital'),
                    rowId: sessionStorage.getItem('hospitalId'), 
                }
            },
        }
    },
    components: {
        'smHeader': (resolve) => {
            require(['@/components/sm_header/sm_header'], resolve);
        },
        selectPopup
    },
    mounted () {
        this.Bus.$on('selectProvince', (item) => {
            this.selectData.province = item
        })
        this.Bus.$on('selectCity', (item) => {
            this.selectData.city = item
        })
        this.Bus.$on('selectHospital', (item) => {
            this.selectData.hospital = item
        })
    },
    methods: {
        ...mapMutations([
            'setIsQueryMyShop'
        ]),
        backPage () {
            this.$router.back()
        },
        openSelectPopup (type) {
            let popupConfig = {
                type: type,
                isOpen: true
            }
            switch (type) {
                case 'Province':
                    this.selectData.city.txt = ''
                    this.selectData.hospital.name = ''
                    sessionStorage.setItem('city','')
                    sessionStorage.setItem('cityId','')
                    sessionStorage.setItem('pingRegionId','')
                    sessionStorage.setItem('hospital','')
                    sessionStorage.setItem('hospitalId','')
                    break;
                case 'City':
                    this.selectData.hospital.name = ''
                    sessionStorage.setItem('hospital','')
                    sessionStorage.setItem('hospitalId','')
                    if(!this.selectData.province){
                        this.toast({
                            message: '请先选择省份',
                            position: 'bottom',
                            duration: 5000
                        })
                        return;
                    }
                    break;
                case 'Hospital':
                    if(!this.selectData.city){
                        this.toast({
                            message: '请先选择城市',
                            position: 'bottom',
                            duration: 5000
                        })
                        return;
                    }
                    break;
            }
            this.Bus.$emit('isOpenPopup', popupConfig)
        },
        jump(){
            if (this.selectData.country && this.selectData.province && this.selectData.city && this.selectData.hospital) {
                let hospitalId = this.selectData.hospital.rowId
                let formMudel = sessionStorage.getItem('mudelType')
                if(formMudel=='MeiCan'){
                    this.setIsQueryMyShop(true)
                    this.$router.push({name: 'selectShop', query: {id: hospitalId}})
                }else if(formMudel=='TakeAway'){
                    this.$router.push({name: 'entryTakeAway', query: {id: hospitalId}})
                }
            } else {
                this.toast({
                    message: '请查看必选信息是否完善',
                    duration: 2000,
                });
            }
        },
    }
}
</script>

<style lang="scss">
 @import '~@/assets/sass/selectAddres.scss';

</style>
