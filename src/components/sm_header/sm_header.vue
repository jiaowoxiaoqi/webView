<template>
    <!-- <div :class="smhClass"> //动态添加class==beast -->
    <div class="sm_header sm_flex_row smPd_boxSzing smPdRow_15 smBg_blue smCl_white">
        <div class="sm_header_left sm_flex_row" @click='backEvent'>
            <slot name="sm_header_left" v-if='smhConfig.left_show'>
                <i class="iconfont icon-jiantou1" v-if='smhConfig.left_icon_show'></i>
                <span class="sm_header_lTxt" v-if='smhConfig.left_title_show'>{{smhTxt.smhLfTxt}}</span>
            </slot>
        </div>
        <div class="sm_header_center sm_flex_row">
            <slot name="sm_header_center" v-if='smhConfig.center_show'>
                <div class="sm_header_searchInput sm_flex_row" v-if='smhConfig.center_inner_show&&!smhConfig.center_title_show'>
                    <i class="iconfont icon-buoumaotubiao13" @click='serachIconEvent'></i>
                    <form action="javascript:return true;" class="smMgLf_8">
                        <input type="search" v-model="smhTxt.smhCtVal" :placeholder="smhTxt.smhCtPlaceholder" class="selectInput" @keyup='serachEvent'>
                    </form>
                </div>
                <div class="sm_header_title" v-if='!smhConfig.center_inner_show&&smhConfig.center_title_show'>
                    {{smhTxt.smhCtTxt}}
                </div>
            </slot>
        </div>
        <div class="sm_header_right sm_flex_row" @click='otherEvent'>
            <slot name="sm_header_right" v-if='smhConfig.right_show'>
                <span class="sm_header_rTxt" v-if='smhConfig.right_title_show'>{{smhTxt.smhRgTxt}}</span>
                <i class="iconfont icon-ditu" v-if='smhConfig.right_icon_show'></i>
            </slot> 
        </div>
    </div>
</template>

<script>
export default {
    props: {
        /*动态添加class==beast
            smhClass:{
                type: Array,
                default: () => {
                    return ["sm_header", "sm_flex_row", "smPd_boxSzing", "smPdRow_15", "smBg_blue", "smCl_red"]
                }
            },
        */
        smhConfig:{
            type: Object,
            default: () => {
                return {
                    left_show: true,
                    left_icon_show: true,
                    left_title_show: true,
                    center_show: true,
                    center_inner_show: false,
                    center_title_show: true,
                    right_show: true,
                    right_title_show: true,
                    right_icon_show: true,
                }
            }
        },
        smhTxt:{
            type: Object,
            default: function () {
                return {
                    smhLfTxt: '返回',
                    smhCtTxt: '列表页',
                    smhCtPlaceholder: '请输入搜索信息',
                    smhCtVal: '',
                    smhRgTxt: '菜单'
                }
            }
        },
        smhlEvent:{
            type: Function,
            default: function () {
                console.log('点击了header==>left部分')
            }
        },
        smhcIconEvent:{
            type: Function,
            default: function () {
                    console.log('通过icon点击了header==>content部分')
            }
        },
        smhcSearchEvent:{
            type: Function,
            default: function (e) {
                let keyCode = e.keyCode
                if(keyCode=='13') {  
                    e.preventDefault();     
                    alert(this.smhTxt.smhCtVal)
                }
            }
        },
        smhrEvent:{
            type: Function,
            default: function () {
                console.log('点击了header==>rightt部分')
            }
        }
    },
    data() {
        return {

        }
    },
    components: {

    },
    methods: {
        backEvent () {
            this.smhlEvent()
        },
        serachIconEvent (type) {
            this.smhcIconEvent(type)
        },
        serachEvent (e) {
            this.smhcSearchEvent(e)
        },
        otherEvent () {
            this.smhrEvent()
        },
    }
}
</script>

<style lang="less">
    .sm_header{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        height: .44rem;
        z-index: 9;
        align-content: center;
        .sm_header_left{
            flex: 1 0 auto;
            height: 100%;
            justify-content: flex-start;
            font-size: .14rem
        }
        .sm_header_center{
            flex: 6 0 auto;
            height: 100%;
            justify-content: center;
            font-size: .16rem;
            box-sizing: border-box;
            padding: .02rem .08rem;
            .sm_header_searchInput{
                width: 100%;
                height: 68%;
                background: #fff;
                box-sizing: border-box;
                padding-left: .14rem;
                border-radius: .24rem;
                justify-content: flex-start;
                .icon-search03{
                    color: #888;
                }
                form{
                    width: 84%;
                    height: 90%;
                    input {
                        border: 0 none;
                        width: 100%;
                        height: 100%;
                        outline: none
                    }
                }
            }
        }
        .sm_header_right{
            flex: 1 0 auto;
            height: 100%;
            justify-content: flex-end;
            font-size: .14rem
        }
    }
</style>
