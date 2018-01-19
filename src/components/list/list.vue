<template>
    <div class="zyList">
        <ul class="zyList-grounp">
            <slot></slot>
            <slot name="zyList-content">
                <li class="zyList-item" :class='{"zyList-lastItem":index==(zyList.length-1)}' v-for='(item , index) in zyList' :key='index' @click='emitFunction'>
                    <div class="zyList-left">
                        <div v-if='zyListConfig[index].isLfShow'>
                            <span>{{zyListConfig[index].labelTxt}}</span>
                            <span v-if='zyListConfig[index].isMajor' class="zyCl_red zyMgLf_8">*</span>
                        </div>
                    </div>
                    <div class="zyList-content">
                        {{item.txt}}
                    </div>
                    <div class="zyList-right">
                        <div v-if='zyListConfig[index].isRtShow'>
                            <i class="iconfont icon-arrow-right-copy-copy"></i>
                        </div>
                    </div>
                </li>
            </slot>
        </ul>
    </div>
</template>

<script>
    export default {
        props:{
            zyListConfig: {//循環配置
                type: Array,
                required: false,
                default:[{
                    isLfShow: true,
                    labelTxt: 'label1',
                    isMajor: true,
                    isRtShow: true
                },{
                    isLfShow: true,
                    labelTxt: 'label1',
                    isMajor: false,
                    isRtShow: true
                },{
                    isLfShow: true,
                    labelTxt: 'label1',
                    isMajor: true,
                    isRtShow: false
                },{
                    isLfShow: true,
                    labelTxt: 'label1',
                    isMajor: true,
                    isRtShow: true
                },{
                    isLfShow: false,
                    labelTxt: 'label1',
                    isMajor: false,
                    isRtShow: false
                }]
            },
            zyList: {
                type: Array,
				required: false,
				default: [{txt:1},{txt:2},{txt:3},{txt:4},{txt:5}]//循環數據
            },
            clickFunction: {
                type: Function,
				required: false,
				default: undefined//點擊事件
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
