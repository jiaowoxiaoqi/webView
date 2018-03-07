<template>
    <sm-popup class="selectTypePopup" :pppConfig='pppConfig'>
        <div slot="popup_header" class="typePopupHeader">
            <span></span>
            <span>类型选择</span>
            <span @click='closePopup'>取消</span>
        </div>
        <ul class="typePopupContent">
            <li class="type" v-for='(item,index) in listGround' :key='index' @click='selectType(item,index)'>
                <span :class="{'color-blue':item.checkend}">{{item.txt}}</span>
                <i class="iconfont icon-duihao color-blue" v-if='item.checkend'></i>
            </li>
        </ul>
    </sm-popup>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            listGround:{
                type: Array,
                default: function () {
                    return [
                        {
                            txt: "外卖",
                            mealType: 2,
                            checkend: true,
                            fromItemSign: ''
                        },
                        {
                            txt: "茶歇",
                            mealType: 1,
                            checkend: false,
                            fromItemSign: ''
                        }
                    ]
                }
            }
        },
        data() {
            return {
                pppConfig:{
                    type: '',
                    show: false,
                    position: 'bottom',
                    height: '40%',
                    hideOnBlur: false,
                    showMask: true,
                    popupStyle: {
                        'z-index': 999,
                        'background': '#fff'
                    }
                },
                pppHd:{
                    title: '类型选择'
                }
            }

        },
        components: {
            'smPopup': (resolve) => {
                require(['../../components/sm_popup/popup'], resolve);
            },
        },
        created () {
            this.Bus.$on('openSelectType', (stuted) => {
                this.pppConfig.show = stuted
            })
            this.Bus.$on('itemSign', (sign) => {
                this.listGround.forEach(item=>{
                    item.fromItemSign = sign
                })
            })
        },
        beforeDestroy() {
            this.Bus.$off('openSelectType');
        },
        methods: {
            closePopup() {
                this.Bus.$emit('openSelectType', false);
            },
            selectType(item,index) {
                this.listGround.forEach(list=>{
                    console.log(list)
                    if(list.mealType == item.mealType) {
                        list.checkend = true
                    }else{
                        list.checkend = false
                    }
                })
                this.Bus.$emit('selectType',item)
                this.closePopup()
            }
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/sass/popupStyle/selectTypePopup.scss';
</style>
