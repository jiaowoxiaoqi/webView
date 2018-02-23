<template>
    <!-- <div :class="zyhClass"> //动态添加class==beast -->
    <div class="zy_header zy_flex_row zyPd_boxSzing zyPdRow_15 zyBg_blue zyCl_white">
        <div class="zy_header_left zy_flex_row" @click='backEvent'>
            <slot name="zy_header_left" v-if='zyhConfig.left_show'>
                <i class="iconfont icon-jiantou1" v-if='zyhConfig.left_icon_show'></i>
                <span class="zy_header_lTxt" v-if='zyhConfig.left_title_show'>{{zyhTxt.zyhLfTxt}}</span>
            </slot>
        </div>
        <div class="zy_header_center zy_flex_row">
            <slot name="zy_header_center" v-if='zyhConfig.center_show'>
                <div class="zy_header_searchInput zy_flex_row" v-if='zyhConfig.center_inner_show&&zyhConfig.center_title_show'>
                    <i class="iconfont icon-buoumaotubiao13" @click='serachIconEvent'></i>
                    <form action="javascript:return true;" class="zyMgLf_8">
                        <input type="search" v-model="zyhTxt.zyhCtVal" :placeholder="zyhTxt.zyhCtPlaceholder" class="selectInput" @keyup='serachEvent'>
                    </form>
                </div>
                <div class="zy_header_title" v-if='!zyhConfig.center_inner_show&&zyhConfig.center_title_show'>
                    {{zyhTxt.zyhCtTxt}}
                </div>
            </slot>
        </div>
        <div class="zy_header_right zy_flex_row" @click='otherEvent'>
            <slot name="zy_header_right" v-if='zyhConfig.right_show'>
                <span class="zy_header_rTxt" v-if='zyhConfig.right_title_show'>{{zyhTxt.zyhRgTxt}}</span>
                <i class="iconfont icon-ditu" v-if='zyhConfig.right_icon_show'></i>
            </slot> 
        </div>
    </div>
</template>

<script>
export default {
    props: {
        /*动态添加class==beast
            zyhClass:{
                type: Array,
                default: () => {
                    return ["zy_header", "zy_flex_row", "zyPd_boxSzing", "zyPdRow_15", "zyBg_blue", "zyCl_red"]
                }
            },
        */
        zyhConfig:{
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
        zyhTxt:{
            type: Object,
            default: function () {
                return {
                    zyhLfTxt: '返回',
                    zyhCtTxt: '列表页',
                    zyhCtPlaceholder: '请输入搜索信息',
                    zyhCtVal: '',
                    zyhRgTxt: '菜单'
                }
            }
        },
        zyhlEvent:{
            type: Function,
            default: function () {
                console.log('点击了header==>left部分')
            }
        },
        zyhcIconEvent:{
            type: Function,
            default: function () {
                    console.log('通过icon点击了header==>content部分')
            }
        },
        zyhcSearchEvent:{
            type: Function,
            default: function (e) {
                let keyCode = e.keyCode
                if(keyCode=='13') {  
                    e.preventDefault();     
                    alert(keyCode)
                }
            }
        },
        zyhrEvent:{
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
            this.zyhlEvent()
        },
        serachIconEvent (type) {
            this.zyhcIconEvent(type)
        },
        serachEvent (e) {
            this.zyhcSearchEvent(e)
        },
        otherEvent () {
            this.zyhrEvent()
        },
    }
}
</script>

<style lang="less">
    .zy_header{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        height: .44rem;
        z-index: 9;
        align-content: center;
        .zy_header_left{
            flex: 1 0 auto;
            height: 100%;
            justify-content: flex-start;
            font-size: .14rem
        }
        .zy_header_center{
            flex: 6 0 auto;
            height: 100%;
            justify-content: center;
            font-size: .16rem;
            box-sizing: border-box;
            padding: .02rem .08rem;
            .zy_header_searchInput{
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
        .zy_header_right{
            flex: 1 0 auto;
            height: 100%;
            justify-content: flex-end;
            font-size: .14rem
        }
    }
</style>
