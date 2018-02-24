<template>
 <div class="popup">
    <popup 
        v-model="pppConfig.show" 
        :position="pppConfig.position" 
        :height="pppConfig.height" 
        :hide-on-blur="pppConfig.hideOnBlur"
        :on-show='popupInit(pppConfig.type)'>
        <zyHeader :headerConfig='headerConfig' :leftFunction='leftFunction'>
            <div slot="zyHeader-right" class="sl_zyheader_right">
                <span>{{headerConfig.rtTxt}}</span>
            </div>
        </zyHeader>
        <div class='popupInner zyMgTop_59'>
            <zyListGroup v-if="zyListShow" :listData='zyListData' :listConfig='zyListConfig'></zyListGroup>
            <zyTextarea v-if="zyTextareaShow"></zyTextarea>
            <zyListGroup v-if="zyListShow2" :listData='zyListData2' :listConfig='zyListConfig2'></zyListGroup>
        </div>
    </popup>
 </div>
</template>

<script>
    import zyHeader from '../header/header.vue'
    import zyListGroup from '../model/listGroup.vue'
    import zyTextarea from '../model/textarea.vue'
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
                zyListShow: false,
                zyListData:[
                    {
                    leftTxt:'国家',
                    contentTxt: '中国'
                    },{
                        leftTxt:'省份',
                        contentTxt: '上海'
                    },{
                        leftTxt:'城市',
                        contentTxt: '上海'
                    }
                ],
                zyListConfig:{
                    lfIsShow: true,
                    lfIcon: true,
                    ctIsShow: true,
                    rtIsShow: true,
                    rtIcon: true,
                },
                zyListShow2: false,
                zyListData2:[
                    {
                    leftTxt:'上午'
                    },{
                        leftTxt:'下午'
                    },{
                        leftTxt:'全天'
                    }
                ],
                zyListConfig2:{
                    lfIsShow: true,
                    lfIcon: false,
                    ctIsShow: false,
                    rtIsShow: false,
                    rtIcon: false,
                },
                zyTextareaShow: false,
            }
        },
        components: {
            Popup,
            XImg,
            zyHeader,
            zyListGroup,
            zyTextarea
        },
        methods: {
            popupInit (type) {
                switch (type) {
                    case "selectCity"://城市選擇
                        this.headerConfig.ctContent = "城市选择"
                        this.zyListShow = true
                        this.zyTextareaShow = false
                        this.zyListShow2 = false
                        break;
                    case "eventName"://會議名稱
                        this.headerConfig.ctContent = "会议名称"
                        this.zyListShow = false
                        this.zyTextareaShow = true
                        this.zyListShow2 = false
                        break;
                    case "selectTime"://選擇時段
                        this.headerConfig.ctContent = "选择"
                        this.zyListShow = false
                        this.zyTextareaShow = false
                        this.zyListShow2 = true
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
