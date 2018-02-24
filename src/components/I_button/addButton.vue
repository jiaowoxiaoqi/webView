<template>
  <div class="button" @click="go(0)">
    <div class="button_inner">
        <img src="" alt="添加餐厅">
    </div>
  </div>
</template>

<script>
 export default {
 data() {
 return {

 }

 },
 components: {

 }
 }
</script>

<style lang="less">
    .button{
        position: fixed;
        right: .30rem;
        bottom: .66rem;
        display: inline-block;
        border-radius: 50%;
        width: .56rem;
        height: .56rem;
        line-height: .56rem;
        text-align: center;
        transition: transform .1s ease-in-out, -webkit-transform .1s ease-in-out;
        .button_inner{
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            color: rgb(255, 255, 255);
            background-color: rgb(38, 162, 255);
            box-shadow: 9px 7px 18px 0px rgba(0,113,255,0.3);
        }
    }
 
</style>
