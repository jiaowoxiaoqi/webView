/** 租户相关配置信息存储 */

const userConfig = {
    state: {
        iShopParam: {},
        ishopRuleMsg: '',
        ishopSubmitMsg: '',
        recommendConfig: []
    },
    mutations: {
        setIshopParam (state,object) {
            state.iShopParam = object
        },
        setIshopRuleMsg (state,string) {
            state.ishopRuleMsg = string
        },
        setIshopParam (state,string) {
            state.ishopSubmitMsg = string
        },
        setRecommendConfig (state,array) {
            state.recommendConfig = array
        }
    },
    actions: {},
    getters: {}
}

export default userConfig