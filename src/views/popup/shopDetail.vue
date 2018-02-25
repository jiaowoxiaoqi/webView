<template>
    <sm-popup class="detailPopup" :pppConfig='pppConfig'>
        <div>
            这是商铺详情页
        </div>
    </sm-popup>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                pppConfig:{
                    type: '',
                    show: false,
                    position: 'bottom',
                    height: '100%',
                    hideOnBlur: false,
                    showMask: false
                }
            }

        },
        components: {
            'smPopup': (resolve) => {
                require(['../../components/sm_popup/popup'], resolve);
            },
        },
        created () {
            this.Bus.$on('changeStuted', (stuted) => {
                this.pppConfig.show = stuted
            });
            this.Bus.$on('shopItem',(item) => {
                console.log(item)
            })
        }
    }
</script>

<style >

 
</style>
