<template>
 <div class="listGroup">
    <ul class="zyMgTop_59">
        <zy-listItem :zyListConfig='listConfig' :clickFunction='clickqqq(item)' v-for='(item,index) in listData' :key='index'>
            <span slot="zyListLf_txt" class="zy_w4 zyTxt_hidden">
                {{item.leftTxt}}
            </span>
            <div slot="zyList_content">
                {{item.contentTxt}}
            </div>
            <div slot="zyList_right">
                <i class="iconfont icon-arrow-right-copy-copy" v-if='item.leftTxt!="国家"'></i>
            </div>
        </zy-listItem>
    </ul>
    <Popup 
    v-model="show3"
    ></Popup>
 </div>
</template>

<script>
    import { Cell, Group, Popup} from 'vux'
    import  zyListItem from '../list/list.vue'
    export default {
        props: ['listData','listConfig'],
        data() {
            return {
                zyListConfig:{
                    lfIsShow: true,
                    lfIcon: true,
                    ctIsShow: true,
                    rtIsShow: true,
                    rtIcon: true,
                },
                itemList:[
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
                show3: false
            }
        },
        components: {
            Group,
            Cell,
            zyListItem,
            Popup
        },
        methods: {
            clickqqq (item) {
                
            }
        }
    }
</script>

<style>

 
</style>
