<template>
 <div class="popup">
    <popup 
    v-model="pppConfig.show" 
    :position="pppConfig.position" 
    :height="pppConfig.height" 
    :hide-on-blur="pppConfig.hideOnBlur">
        <div class="popup2">
            The mask cannot be clicked!
        </div>
    </popup>
 </div>
</template>

<script>
    import { Popup } from 'vux'
    export default {
        props: {
            pppConfig: {
                // type: ,
                required: false,
                default:{
                    show:false,
                    position: 'bottom',
                    height: '100%',
                    hideOnBlur: true
                }//默认配置
            },
        },
        data() {
            return {

            }
        },
        components: {
            Popup
        }
    }
</script>

<style>

 
</style>
