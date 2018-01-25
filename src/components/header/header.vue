<template>
    <div class='zyHeader zyBg_blue zyCl_white'>
        <div @click="emitFunction" class="zyHeader-left">
            <slot name="zyHeader-left" v-if='headerConfig.lfIsShow'>
                <i class='iconfont icon-jiantou4' v-if='headerConfig.lfIcon'></i>
                <span v-if='headerConfig.lfTxt'>{{headerConfig.lfTxt}}</span>
            </slot>
        </div>
        <div class="zyHeader-content">
            <slot v-if='headerConfig.ctContentShow'>
                {{headerConfig.ctContent}}
            </slot>
        </div>
        <div class="zyHeader-right">
            <slot name="zyHeader-right" v-if='headerConfig.rtIsShow'>
                <span v-if='headerConfig.rtTxt'>{{headerConfig.rtTxt}}</span>
                <i class='iconfont icon-arrow-right-copy-copy' v-if='headerConfig.rtIcon'></i>
            </slot>
        </div>
        
    </div>
</template>

<script>
    import {Badge} from 'vux'
    export default {
        props:{
            headerConfig: {
                type: Object,
                required: false,
                default: {
                    lfIsShow: true,
                    lfTxt: '返回',
                    lfIcon: true,
                    ctContentShow: true,
                    rtIsShow: true,
                    rtTxt: '草稿箱',
                    rtIcon: false,
                }
              //默认配置
            },
            leftFunction: {
                type: Function,
				required: false,
				default: undefined//默认方法
            },
            rightFunction: {
                type: Function,
				required: false,
				default: undefined//默認方法
            }
        },
        data() {
            return {

            }
        },
        components: {
            Badge
        },
        methods: {
            emitFunction() {
                this.leftFunction()
            }
        }
    }
</script>

<style>
    @import url("./header.css");
</style>
