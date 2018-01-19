<template>
  <div class="hello">
    <zy-header :leftFunction='leftFunction' :headerConfig='headerConfig'>
      <span>首頁</span>
      <div slot="zyHeader-right">
        <span class='bag'>888</span>
        <span>草稿箱</span>
      </div>
    </zy-header> 
    <zy-list :zyList='listDeta' :zyListConfig='zyListConfig'>
      <li>
        <h1>会议详情</h1>
      </li>
    </zy-list>
    <zy-list :zyList='listDeta' :zyListConfig='zyListConfig'></zy-list>
  </div>
</template>

<script>
  // import zyHeader from './header/header.vue'
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
        },
        zyListConfig:[{
                    isLfShow: true,
                    labelTxt: 'label1',
                    isMajor: true,
                    isRtShow: true
                },{
                    isLfShow: true,
                    labelTxt: 'label1',
                    isMajor: false,
                    isRtShow: true
                },{
                    isLfShow: true,
                    labelTxt: 'label1',
                    isMajor: true,
                    isRtShow: false
                },{
                    isLfShow: true,
                    labelTxt: 'label1',
                    isMajor: true,
                    isRtShow: true
                },{
                    isLfShow: false,
                    labelTxt: 'label1',
                    isMajor: false,
                    isRtShow: false
                }],
        listDeta:[{txt:1},{txt:2},{txt:3},{txt:4},{txt:5}]
      }
    },
    components: {
      'zy-header': (resolve) => {
        require(['../components/header/header.vue'], resolve);
      },
      'zy-list': (resolve) => {
        require(['../components/list/list'], resolve);
      },
		},
    methods: {
      leftFunction () {
        alert(1)
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
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .bag {
      position: absolute;
      right: 20px;
      top: 6px;
      box-sizing: border-box;
      background-color: #F00;
      color: #FFF;
      display: inline-block;
      min-width: 10px;
      height: 10px;
      line-height: 0px;
      font-size: 12px;
      text-align: center;
      border-radius: 10px;
      padding: 8px 5px;
      margin-left: -8px;
  }
</style>
