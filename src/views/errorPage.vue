<template>
 <div class="errorPage">
     <div class="message">
         本次餐厅收集时间已截止。。。
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

<style scoped>
.errorPage{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    padding: 30% 10%;
}
.message{
    font-size: 22px;
    color: #888;
    text-align: left
}
</style>
