<template>
 <div class="listGroup">
    <ul class="zyMgTop_59">
        <zy-listItem :zyListConfig='listConfig' :clickFunction='clickqqq' v-for='(item,index) in listData' :key='index'>
            <span slot="zyListLf_txt" class="zy_w4 zyTxt_hidden">
                {{item.leftTxt}}
            </span>
            <div slot="zyList_content">
                {{item.contentTxt}}
            </div>
        </zy-listItem>
    </ul>
     
 </div>
</template>

<script>
    import { Cell, Group} from 'vux'
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
                itemList:[{
                    leftTxt:'国家',
                    contentTxt: '中国'
                },{
                    leftTxt:'省份',
                    contentTxt: '上海'
                },{
                    leftTxt:'城市',
                    contentTxt: '上海'
                }]
            }
        },
        components: {
            Group,
            Cell,
            zyListItem
        },
        methods: {
            clickqqq () {
                alert('点击')
            }
        }
    }
</script>

<style>

 
</style>
