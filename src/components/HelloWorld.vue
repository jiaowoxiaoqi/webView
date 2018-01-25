<template>
  <div class="hello">
    <zy-header :leftFunction='leftFunction' :headerConfig='headerConfig'>
      <span>添加会议</span>
      <div slot="zyHeader-right">
        <span class='bag'>888</span>
        <span>草稿箱</span>
      </div>
    </zy-header> 
    <div class="zyMgTop_44">
      <button @click='goPage'>跳转</button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        headerConfig:{
          lfIsShow: true,
          lfTxt: '返回',
          lfIcon: true,
          ctContentShow: true,
          rtIsShow: true,
          rtTxt: '草稿箱',
          rtIcon: false,
        }
      }
    },
    components: {
      'zy-header': (resolve) => {
        require(['../components/header/header.vue'], resolve);
      }
		},
    methods: {
      leftFunction () {
        alert(1)
      },
      goPage () {
        this.$router.push('/addEvent')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 0.1rem;
  }
  a {
    color: #42b983;
  }
  .bag {
      position: absolute;
      right: 0.2rem;
      top: 0.06rem;
      box-sizing: border-box;
      background-color: #F00;
      color: #FFF;
      display: inline-block;
      min-width: 0.1rem;
      height: 0.1rem;
      line-height: 0px;
      font-size: 0.12rem;
      text-align: center;
      border-radius: 0.1rem;
      padding: 0.08rem 0.05rem;
      margin-left: -0.08rem;
  }
</style>
