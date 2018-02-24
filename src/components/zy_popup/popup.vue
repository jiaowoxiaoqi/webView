<template>
 <div class="popup">
    <popup 
        v-model="pppConfig.show" 
        :position="pppConfig.position" 
        :height="pppConfig.height" 
        :hide-on-blur="pppConfig.hideOnBlur"
        :on-show='popupInit(pppConfig.type)'>
        <slot name="popup_header">
            <zy-header :zyhConfig='popupZyHdConfig'>
                <div slot="zy_header_center">
                    標題
                </div>
                <div slot="zy_header_right">
                    <i class="iconfont icon-ditu"></i>
                </div>
            </zy-header>
        </slot>
        
        <slot>
            <div class="popupContent">

            </div>
        </slot>

        <slot name="popup_footer">

        </slot>
    </popup>
 </div>
</template>

<script>
    import zyHeader from '../zy_header/zy_header.vue'
    
    import { Popup } from 'vux'
    export default {
        props: {
            pppConfig: {
                // type: ,
                required: false,
                default:{
                    type: '',
                    show:false,
                    position: 'bottom',
                    height: '100%',
                    hideOnBlur: true
                }//默认配置
            },
        },
        data() {
            return {
                popupZyHdConfig: {
                    left_show: false,
                    center_show: true,
                    right_show: true,
                }
            }
        },
        components: {
            Popup,
            zyHeader,
        },
        methods: {
            popupInit (type) {
                switch (type) {
                    case "selectCity"://城市選擇
                        this.headerConfig.ctContent = "城市选择"
                        
                        break;
                    case "eventName"://會議名稱
                        this.headerConfig.ctContent = "会议名称"
                        
                        break;
                    case "selectTime"://選擇時段
                        this.headerConfig.ctContent = "选择"
                        
                        break;    
                    case "entryNumber"://錄入人數
                        this.headerConfig.ctContent = "人数"
                        break;
                    case "remarks"://備註
                        this.headerConfig.ctContent = "备注"
                        break;
                }
            },
            leftFunction () {
                this.pppConfig.show = !this.pppConfig.show
            },
        }
    }
</script>

<style>

</style>
