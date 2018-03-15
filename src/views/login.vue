<template>
    <div class="loginPage">
        <sm-header :smhConfig='venuesmHdConfig' v-if='isWebView'>
            <i class="iconfont icon-close1" slot="sm_header_left" @click='closeIshop'></i>
        </sm-header>
        <div class="loginContent">
            <div class="logo">
                <img src="@/assets/images/logo.png" alt="">
            </div>
            <div class="logFrom">
                <div class="logInput">
                    <label for="logEntry"><i class="iconfont icon-icon-test"></i></label>
                    <input type="text" id="logEntry" placeholder="请输入你的工号/手机号/邮箱号" v-model='userInfo'>
                </div>
                <div class="logButton" @click="_login">
                    <span>登录</span>
                </div>    
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                userInfo: '',
                isWebView: false,
                isDenialData: false,
                venuesmHdConfig: {
                    left_show: true,
                    center_show: false,
                    right_show: false,
                },
            }

        },
        components: {
            'smHeader': (resolve) => {
                require(['../components/sm_header/sm_header'], resolve);
            },
        },
        computed: {
            ...mapState({
                isLoading: state => state.vuxStatus.isLoading
            })
        },
        created () {
            this.accessAuthority()
        },
        methods: {
            closeIshop() { // 关闭ishop
                if(window.webView) {
                    window.webView.close();
                }
            },
            _login() {
                let denialData = localStorage.getItem('denialTime')
                if(denialData){
                    this.accessAuthority()
                }
                if(this.isDenialData) {
                    this.toast({
                        message: '餐厅收集截止时间已过，感谢各位使用！',
                        duration: 2000,
                    });
                }else{
                    this.logEvent()
                }
            },
            async logEvent () {// 2，登陆事件
                if (this.isLoading) {
                    this.toast({
                        message: '正在努力加载,请勿重复执行操作',
                        position: 'bottom',
                        duration: 2500
                    })
                    return
                }
                if(!this.userInfo) {
                    this.toast({
                        message: '请输入登录账号',
                        position: 'bottom',
                        duration: 2000,
                    });
                    return;
                }
                let params = {
                    client_id: "sites.ishop",
                    client_secret: "smartx",
                    grant_type: "password",
                    userName: this.userInfo,
                    password: this.userInfo
                }
                let res = await this.axios.post(this.api.login,params,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                if(res.access_token) {
                    this.toast({
                        message: '登录成功',
                        position: 'bottom',
                        duration: 800
                    })
                    this.tool.storage.driver('session')
                    this.tool.storage.set("token", res.access_token)
                    this.getTenantConfig()
                }else {
                    this.toast({
                        message: '登录失败，请稍后重试！！！或联系客服',
                        position: 'bottom',
                        duration: 5000
                    })
                }
            },
            async getTenantConfig () {// 3，获取租户配置信息
                this.tool.storage.driver('local')
                let params = {
                    channel: this.tool.storage.get("channel")
                }
                let res = await this.axios.get(this.api.getTenantConfig,{params:params})
                if(res.config){
                    this.tool.storage.driver('session')
                    this.tool.storage.set('iShopParam',res.config.iShopParam)
                    this.tool.storage.set('ishopRuleMsg',res.config.ishopRuleMsg)
                    this.tool.storage.set('ishopSubmitMsg',res.config.ishopSubmitMsg)
                    this.tool.storage.set('recommendConfig',res.config.recommendConfig)
                    this.$router.push('/chooseMudel')
                }
            },
            getLoginName() {
                let userName = ''
                userName = this.$route.query.userName == "null"?'':this.$route.query.userName;
                if (!userName) return false;
                else {
                    this.userInfo = userName;
                    this.isWebView = true;
                    localStorage.setItem('webView', true);
                    return true;
                }
            },
            accessAuthority () {
                let queryData = this.$route.query
                var channel = 'app';
                if(queryData.channel || localStorage.getItem('channel')){
                    channel = queryData.channel?queryData.channel:localStorage.getItem('channel');
                }
                localStorage.setItem('channel', channel);
                
                if(queryData.denialTime || localStorage.getItem('denialTime')){
                    if(queryData.denialTime) {localStorage.setItem('denialTime', queryData.denialTime);}
                    let nowData = new Date()
                    let denialData =new Date(localStorage.getItem('denialTime'))

                    if(nowData<=denialData){
                        if (localStorage.getItem('webView')) {
                            this.isWebView = true;
                        }
                        if (this.getLoginName()) {
                            this.logEvent();
                        }
                    }else{
                        this.isDenialData = true
                        this.$router.push("/errorPage")
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../assets/sass/login.scss';
</style>
