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
                    <input type="text" placeholder="(必选)" :value="selectData.province" readonly="readonly" >
                    <i class="iconfont icon-jiantou color-gray"></i>
                </li>
                <li @click='openSelectPopup("City")'>
                    <label for="" class="sm_w2">城市</label>
                    <input type="text" placeholder="(必选)" :value="selectData.city" readonly="readonly">
                    <i class="iconfont icon-jiantou color-gray"></i>
                </li>
                <li class="hospital" @click='openSelectPopup("Hospital")'>
                    <label for="" class="sm_w4">医院名称</label>
                    <input type="text" placeholder="(必选)" :value="selectData.hospital" readonly="readonly">
                    <i class="iconfont icon-jiantou color-gray"></i>
                </li>
            </ul>
            <span>下&nbsp;一&nbsp;步</span>
        </div>
        <select-popup></select-popup>
    </div>
</template>

<script type="text/ecmascript-6">
import selectPopup from './popup/selectPopup'
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
                province: '',
                city: '',
                hospital: ''
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
            this.selectData.province = item.txt
        })
        this.Bus.$on('selectCity', (item) => {
            this.selectData.city = item.txt
        })
    },
    methods: {
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
                    this.Bus.$emit('isOpenPopup', popupConfig)
                    break;
                case 'City':
                    if(!this.selectData.province){
                        this.toast({
                            message: '请先选择省份',
                            position: 'bottom',
                            duration: 5000
                        })
                        return;
                    }
                    this.Bus.$emit('isOpenPopup', popupConfig)
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
                    this.Bus.$emit('isOpenPopup', popupConfig)
                    break;
            }
        }
    }
}
</script>

<style lang="scss">
 @import '~@/assets/sass/selectAddres.scss';

</style>
