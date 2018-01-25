<template>
    <li class="zyList" @click='emitFunction'>
        <div class="zyList_left">
            <slot name="zyList_left" v-if='zyListConfig.lfIsShow'>
                <slot name="zyListLf_txt">
                    <span>{{'左侧展示'}}</span>
                </slot>
                <span class="zyCl_red zyMgLf_8" v-if='zyListConfig.lfIcon'>*</span>
            </slot>
        </div>
        <div class="zyList_content">
            <slot name="zyList_content" v-if='zyListConfig.ctIsShow'>
                <span>{{"中间内容"}}</span>
            </slot>
        </div>
        <div class="zyList_right">
            <slot name="zyList_right" v-if='zyListConfig.rtIsShow'>
                <i class="iconfont icon-arrow-right-copy-copy" v-if='zyListConfig.rtIcon'></i>
            </slot>
        </div>
    </li>
</template>

<script>
    export default {
        props:{
            zyListConfig: {//循環配置
                type: Object,
                required: false,
                default:{
                    lfIsShow: true,
                    lfIcon: true,
                    ctIsShow: true,
                    rtIsShow: true,
                    rtIcon: false,
                }
            },
            clickFunction: {
                type: Function,
				required: false,
				default: function(){
                    return;
                }//點擊事件
            }
        },
        data() {
            return {

            }
        },
        methods: {
            emitFunction() {
                this.clickFunction()
            }
        }
    }
</script>

<style>
    @import url("./list.css");
</style>
