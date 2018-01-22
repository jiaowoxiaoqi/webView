<template>
  <div id="app">
    <loading v-model="loadStatus"></loading>
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
        loadStatus: state => state.loading.loadStatus
      })
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
