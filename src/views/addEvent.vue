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
        <div @click='openPopup'>
            <cell is-link>
                <div slot='title'>
                    <span class="zy_w4">会议城市</span>
                    <span class='zyCl_red'>*</span>
                </div>
            </cell>
        </div>
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
    <popup v-model="show5" position="bottom" height="50%" :hide-on-blur="false">
        <div class="popup2">
            <group>
                <x-switch title="Mask disable" v-model="show5"></x-switch>
            </group>
            The mask cannot be clicked!
        </div>
    </popup>
    <zy-popup :pppConfig='pppConfig'></zy-popup>
 </div>
</template>

<script>
    import { Cell, CellBox, CellFormPreview, Group, Badge, Datetime, Popup, XSwitch } from 'vux'
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
                endDate:'2018-11-11',
                show5: false,
                pppConfig:{
                    show: false,
                    position: 'bottom',
                    height: '100%',
                }
            }
        },
        components: {
            'zy-header': (resolve) => {
                require(['../components/header/header.vue'], resolve);
            },
            'zy-popup': (resolve) => {
                require(['../components/popup/popup'], resolve);
            },
            Group,
            Cell,
            CellFormPreview,
            CellBox,
            Badge,
            Datetime,
            Popup,
            XSwitch
        },
        methods: {
            leftFunction () {
                this.$router.back()
            },
            change (value) {
                console.log('change', value)
            },
            openPopup () {
                this.pppConfig.show = !this.pppConfig.show
                console.log(this.show5)
            }
        }
    }
</script>

<style>

 
</style>
