<template>
 <div class="addEvent">
    <zy-header :leftFunction='leftFunction' :headerConfig='headerConfig'>
        <span>添加会议</span>
        <div slot="zyHeader-right">
            <span class='bag'>888</span>
            <span>草稿箱</span>
        </div>
    </zy-header>
    <group>
        <cell is-link @click='openPopup'>
            <div slot='title'>
                <span class="zy_w4">会议城市</span>
                <span class='zyCl_red'>*</span>
            </div>
        </cell>
    </group>
    <group>
        <cell is-link>
            <div slot='title'>
                <span class="zy_w4">会议名称</span>
                <span class='zyCl_red'>*</span>
            </div>
        </cell>
        <datetime 
            v-model="value3" 
            default-selected-value="2018-01-22" 
            format="YYYY-MM-DD" 
            placeholder="请选择" 
            @on-change="change" 
            :start-date="startDate" 
            :end-date="endDate"
            >
            <div slot='title'>
                <span class="zy_w4">开始时间</span>
                <span class='zyCl_red'>*</span>
            </div>
        </datetime>
        <cell is-link>
            <div slot='title'>
                <span class="zy_w4">会议时段</span>
                <span class='zyCl_red'>*</span>
            </div>
        </cell>
        <datetime 
            v-model="value3" 
            default-selected-value="2018-01-22" 
            format="YYYY-MM-DD" 
            placeholder="请选择" 
            @on-change="change" 
            :start-date="startDate" 
            :end-date="endDate"
            >
            <div slot='title'>
                <span class="zy_w4">结束时间</span>
                <span class='zyCl_red'>*</span>
            </div>
        </datetime>
        <cell is-link>
            <div slot='title'>
                <span class="zy_w2">人数</span>
                <span class='zyCl_red'>*</span>
            </div>
        </cell>
        <cell is-link>
            <div slot='title'>
                <span class="zy_w2">备注</span>
            </div>
        </cell>
    </group>
 </div>
</template>

<script>
    import { Cell, CellBox, CellFormPreview, Group, Badge, Datetime } from 'vux'
    export default {
        data() {
            return {
                headerConfig:{
                    lfIsShow: true,
                    lfTxt: '返回',
                    lfIcon: true,
                    ctContentShow: true,
                    rtIsShow: true,
                    rtTxt: '草稿箱',
                    rtIcon: false,
                },
                value3: '',
                startDate:'2018-01-12',
                endDate:'2018-11-11'
            }
        },
        components: {
            'zy-header': (resolve) => {
                require(['../components/header/header.vue'], resolve);
            },
            Group,
            Cell,
            CellFormPreview,
            CellBox,
            Badge,
            Datetime
        },
        methods: {
            leftFunction () {
                this.$router.back()
            },
            change (value) {
                console.log('change', value)
            },
            openPopup () {
                
            }
        }
    }
</script>

<style>

 
</style>
