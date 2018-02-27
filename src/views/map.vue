<template>
  <div class="shopMap">
    <sm-header :smhConfig="mapHdConfig" :smhTxt="mapHdTxt">
        <div slot="sm_header_right" @click='backPage'>
            <i class="iconfont icon-close1"></i>
        </div>
    </sm-header>
    <iframe :src='src' class="iframeStyle"></iframe>
  </div>
</template>

<script>
  import smHeader from '../components/sm_header/sm_header.vue'
  export default {
    name: 'map',
    data: function () {
      return {
        mapHdConfig: {
          left_show: false,
          center_show: true,
          center_inner_show: false,
          center_title_show: true,
          right_show: true,
        },
        mapHdTxt: {
            smhCtTxt: '地图'
        }
      }
    },
    components: {
      smHeader,
    },
    created: function () {
      this.x = this.$route.query.X
      this.y = this.$route.query.Y
      this.n = this.$route.query.fullName
      this.src = 'http://apis.map.qq.com/tools/routeplan/eword=' + this.n + '&epointx=' + this.x + '&epointy=' + this.y + '?referer=myapp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77'
    },
    methods: {
        backPage() {
            this.$router.back()
        }
    }
  }
</script>
<style>
  .shopMap{
      width: 100%;
      height: 100%;
  }
  .iframeStyle{
    position: relative;
    width: 100%;
    height: 90%;
    border: none;
    top: .59rem;
    left:0;
  }
</style>
