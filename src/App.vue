<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <router-view/>
  </div>
</template>

<script>
  import { Loading } from 'vux'
  import { mapState } from 'vuex'
  export default {
    name: 'App',
    components: {
      Loading
    },
    computed: {
      ...mapState({
        isLoading: state => state.vuxStatus.isLoading
      })
    }
  }
  
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
