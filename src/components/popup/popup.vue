<template>
 <div class="popup">
    <popup 
        v-model="pppConfig.show" 
        :position="pppConfig.position" 
        :height="pppConfig.height" 
        :hide-on-blur="pppConfig.hideOnBlur"
        :on-show='changeHeaderConfig(pppConfig.type)'>
        <zyHeader :headerConfig='headerConfig' :leftFunction='leftFunction'>
            <div slot="zyHeader-right" class="sl_zyheader_right">
                <span>{{headerConfig.rtTxt}}</span>
            </div>
        </zyHeader>
        <div v-for="src in list" :key ='src' style="background-color:yellow;text-align:center;">
            <span style="font-size:20px;">Loading</span>
            <img src="../../assets/images/img1.jpg" alt="">
            <x-img 
                :src="src"  
                class="ximg-demo" 
                :offset="-100" 
                container="#vux_view_box_body">
            </x-img>
        </div>
    </popup>
 </div>
</template>

<script>
    import zyHeader from '../header/header.vue'
    import { Popup, XImg } from 'vux'
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
                headerConfig:{
                    lfIsShow: true,
                    lfTxt: '取消',
                    lfIcon: true,
                    ctContentShow: true,
                    ctContent: 'title',
                    rtIsShow: true,
                    rtTxt: '保存',
                    rtIcon: false,
                },
                list:[
                    '../../assets/images/img1.jpg',
                    require('../../assets/images/img2.jpg'),
                    require('../../assets/images/img3.jpg'),
                    require('../../assets/images/img4.jpg'),
                ]
            }
        },
        components: {
            Popup,
            XImg,
            zyHeader
        },
        methods: {
            changeHeaderConfig (type) {
                switch (type) {
                    case "selectCity"://城市選擇
                        this.headerConfig.ctContent = "selectCity"
                        break;
                    case "eventName"://會議名稱
                        this.headerConfig.ctContent = "eventName"
                        break;
                    case "selectTime"://選擇時段
                        this.headerConfig.ctContent = "selectTime"
                        break;    
                    case "entryNumber"://錄入人數
                        this.headerConfig.ctContent = "entryNumber"
                        break;
                    case "remarks"://備註
                        this.headerConfig.ctContent = "remarks"
                        break;
                }
            },
            leftFunction () {
                this.pppConfig.show = !this.pppConfig.show
            },
            success (src, ele) {
                console.log('success load', src)
                const span = ele.parentNode.querySelector('span')
                ele.parentNode.removeChild(span)
            },
            error (src, ele, msg) {
                console.log('error load', msg, src)
                const span = ele.parentNode.querySelector('span')
                span.innerText = 'load error'
            }

        }
    }
</script>

<style>
.sl_zyheader_right{
    text-align: right;
}
.ximg-demo {
  width: 100%;
  height: auto;
}
.ximg-error {
  background-color: yellow;
}
.ximg-error:after {
  content: '加载失败';
  color: red;
}
</style>
