<template>
 <div class="addEvent">
    <zy-header :leftFunction='leftFunction' :headerConfig='headerConfig'>
        <span>添加会议</span>
        <div slot="zyHeader-right">
            <span class='bag'>888</span>
            <span>草稿箱</span>
        </div>
    </zy-header>
    <div class="addEvent_content zyMgTop_44">
        <h3 class="zy_h3 zyPdTop_15 zyPdLf_15">会议基本信息</h3>
        <group>
            <div @click='openPopup("selectCity")'>
                <cell is-link>
                    <div slot='title'>
                        <span class="zy_w4">会议城市</span>
                        <span class='zyCl_red'>*</span>
                    </div>
                </cell>
            </div>
        </group>
        <group>
            <div @click='openPopup("eventName")'>
                <cell is-link>
                    <div slot='title'>
                        <span class="zy_w4">会议名称</span>
                        <span class='zyCl_red'>*</span>
                    </div>
                </cell>
            </div>
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
            <div @click='openPopup("selectTime")'>
                <cell is-link>
                    <div slot='title'>
                        <span class="zy_w4">会议时段</span>
                        <span class='zyCl_red'>*</span>
                    </div>
                </cell>
            </div>
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
            <div @click='openPopup("entryNumber")'>
                <cell is-link>
                    <div slot='title'>
                        <span class="zy_w2">人数</span>
                        <span class='zyCl_red'>*</span>
                    </div>
                </cell>
            </div>
            <div @click='openPopup("remarks")'>
                <cell is-link>
                    <div slot='title'>
                        <span class="zy_w2">备注</span>
                    </div>
                </cell>
            </div>
        </group>
        <popup v-model="show5" position="bottom" height="50%" :hide-on-blur="false">
            <div class="popup2">
                <group>
                    <x-switch title="Mask disable" v-model="show5"></x-switch>
                </group>
                The mask cannot be clicked!
            </div>
        </popup>
    </div>
    <zy-popup :pppConfig='pppConfig'></zy-popup>
 </div>
</template>

<script>
    import {collect,storage} from 'toolmanage'
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
        mounted () {
            // var myPlugin = require('')
            console.log(window)
            console.log(collect)
            console.log(storage)
            // storage.driver('session')
            collect.monitor.server = 'http://192.168.1.145:5000'
            collect.monitor.collect('mshop', {'device':'h5'}, {'a':1})
            // storage.set('abs','这是一段测试数据')
            
            // console.log(myPlugin)
            // console.log(myPlugin.collect.monitor)
            // myPlugin.monitor.collect()
        },
        methods: {
            leftFunction () {
                this.$router.back()
            },
            change (value) {
                console.log('change', value)
                // alert(this.valu3)
                console.log(this.value3)
            },
            openPopup (type) {
                switch (type) {
                    case "selectCity"://城市選擇
                        this.pppConfig.type = "selectCity"
                        break;
                    case "eventName"://會議名稱
                        this.pppConfig.type = "eventName"
                        break;
                    case "selectTime"://選擇時段
                        this.pppConfig.type = "selectTime"
                        break;    
                    case "entryNumber"://錄入人數
                        this.pppConfig.type = "entryNumber"
                        break;
                    case "remarks"://備註
                        this.pppConfig.type = "remarks"
                        break;
                }
                this.pppConfig.show = !this.pppConfig.show
            }
        }
    }
</script>

<style>

 
</style>
