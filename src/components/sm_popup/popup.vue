<template>
    <popup 
        v-model="pppConfig.show" 
        :position="pppConfig.position" 
        :height="pppConfig.height" 
        :hide-on-blur="pppConfig.hideOnBlur"
        :show-mask="pppConfig.showMask"
        :popup-style="pppConfig.popupStyle"
        :on-show='popupInit(pppConfig.type)'
        :on-hide='popupDestroy'>
        <slot name="popup_header">
            <sm-header :smhConfig='popupsmHdConfig'>
                <div slot="sm_header_center">
                    {{popupHd.title}}
                </div>
                <div slot="sm_header_right" @click='closePopup'>
                    <i class="iconfont icon-close1"></i>
                </div>
            </sm-header>
        </slot>
        
        <slot>
            <div class="popupContent">

            </div>
        </slot>

        <slot name="popup_footer">

        </slot>
    </popup>
</template>

<script>
    import smHeader from '../sm_header/sm_header.vue'
    
    import { Popup } from 'vux'
    export default {
        props: {
            pppConfig: {
                required: false,
                default: function () {
                   return {
                        type: '',
                        show: false,
                        position: 'bottom',
                        height: '100%',
                        hideOnBlur: true,
                        showMask: true,
                        popupStyle: {

                        }
                   } 
                }//默认配置
            },
            popupHd: {
                type: null,
                default: function () {
                    return {
                        title: '标题'
                    }
                }
            },
            closePopupHandle: {
                type: Function,
                default: function () {
                    console.log('关闭popup')
                    this.pppConfig.show = false
                }
            }
        },
        data() {
            return {
                popupsmHdConfig: {
                    left_show: false,
                    center_show: true,
                    right_show: true,
                }
            }
        },
        components: {
            Popup,
            smHeader,
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
            popupDestroy () {
                // this.pppConfig.show = false
                this.Bus.$off('changeStuted');
                this.Bus.$off('shopItem')
            },
            closePopup () {
                this.closePopupHandle()
                // this.Bus.$emit('changeStuted',false);
            },
        }
    }
</script>

<style>

</style>
