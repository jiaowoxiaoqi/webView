<template>
 <div class="selectShopPage">
    <sm-header :smhConfig='sshopHdConfig' :smhTxt='sshopHdTxt' :smhlEvent='backPage'>
        
    </sm-header>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            sshopHdConfig:{
                left_show: true,
                left_icon_show: true,
                left_title_show: false,
                center_show: true,
                center_inner_show: true,
                center_title_show: false,
                right_show: true,
                right_title_show: true,
                right_icon_show: false,
            },
            sshopHdTxt:{
                smhCtPlaceholder: '请输入搜索信息',
                smhCtVal: '',
                smhRgTxt: '上线基本规则'
            }
        }
    },
    components: {
        'smHeader': (resolve) => {
            require(['@/components/sm_header/sm_header'], resolve);
        },
    },
    methods: {
        backPage () {
            this.$router.back()
        },
    }
}
</script>

<style>

 
</style>