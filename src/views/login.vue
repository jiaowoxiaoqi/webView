<template>
    <div class="loginPage">
        <div class="loginContent">
            <div class="logo">
                <img src="@/assets/images/logo.png" alt="">
            </div>
            <div class="logFrom">
                <div class="logInput">
                    <label for="logEntry"><i class="iconfont icon-icon-test"></i></label>
                    <input type="text" id="logEntry" placeholder="请输入你的工号/手机号/邮箱号" v-model='userInfo'>
                </div>
                <div class="logButton" @click="logEvent">
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
            }

        },
        components: {

        },
        computed: {
            ...mapState({
                isLoading: state => state.vuxStatus.isLoading
            })
        },
        created () {
            this.getQueryData()
        },
        methods: {
            getQueryData () {// 1,获取进入ishop的信息;进入路径app/link;
                this.tool.storage.driver('local')
                let queryData = this.$route.query
                let channel = queryData.channel?queryData.channel:'app'
                this.tool.storage.set('channel',channel)
            },
            async logEvent () {// 2，登陆事件
                if (this.isLoading) {
                    this.$vux.toast.text('正在努力加载,请勿重复执行操作','bottom',60000)
                    return
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
                    this.$vux.toast.text('登陆成功','bottom',60000)
                    this.tool.storage.driver('session')
                    this.tool.storage.set("token", res.access_token)
                    this.getTenantConfig()
                }else {
                    this.$vux.toast.text('登录失败，请稍后重试！！！或联系客服','bottom',)
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
        }
    }
</script>

<style lang="scss">
    @import '../assets/sass/login.scss';
</style>
