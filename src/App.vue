<template>
  <div id="app">
    <loading v-model="loadStatus"></loading>
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import { Loading } from 'vux'
  import { mapState } from 'vuex'
  export default {
    name: 'App',
    data () {
      return {
        transitionName: "",
      }
    },
    components: {
      Loading
    },
    computed: {
      ...mapState({
        loadStatus: state => state.loading.loadStatus
      })
    },
    watch: {
      $route(to, from) {
        const toDepth = to.path.split("/");
        const fromDepth = from.path.split("/");
        const toLen = toDepth[toDepth.length - 1].length;
        const fromLen = fromDepth[fromDepth.length - 1].length;
        console.log(toDepth)
        console.log(fromDepth)
        /* if (fromDepth[fromDepth.length - 1] == "") {
          this.transitionName = "slide-fade";
          return;
        }
        if (toDepth.length > fromDepth.length) {
          this.transitionName = "slide-fade";
          return;
        } else {
          this.transitionName = "slide-out";
          return;
        } */
        this.transitionName = toLen < fromLen ? "slide-out" : "slide-fade";
        // console.log(this.transitionName)
      }
    },
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* .slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
.slide-out-enter-active {
  transition: all 0.3s ease;
}
.slide-out-enter,
.slide-out-leave-active {
  transform: translateX(-10px);
  opacity: 0;
} */
</style>
