<template>
 <div class="page">
    <group>
        <x-textarea 
            name="输入框"
            title="1+1的运算"
            inline-desc="怎么算"
            :show-counter="true" 
            :max="108" 
            v-model="textarea1"
            placeholder="强强强强"  
            >
        </x-textarea>
    </group>
 </div>
</template>

<script>
    import { XTextarea, Group, XInput } from 'vux'
    export default {
        data() {
            return {
                textarea1:''
            }
        },
        components: {
            XTextarea,
            Group,
            XInput
        }
    }
</script>

<style>

 
</style>
