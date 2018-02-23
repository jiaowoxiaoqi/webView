<template>
    <div class="i_tabBar">
        <div class="tabBar_inner">
            <slot name="tabBar_inner">
                <div>
                    <span></span>
                    <i></i>
                </div>
                <div>
                    <span></span>
                    <i></i>
                </div>
            </slot>
            <slot name="tabBar_show">

            </slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {

            }

        },
        components: {

        }
    }
</script>

<style scoped lang="stylus">

 
</style>
