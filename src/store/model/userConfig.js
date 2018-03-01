/** 租户相关配置信息存储 */

const userConfig = {
  state: {
    ishopParam: {},
    ishopRuleMsg: '',
    ishopSubmitMsg: '',
    recommendConfig: []
  },
  mutations: {
    setIshopParam (state, object) {
      state.ishopParam = object
    },
    setIshopRuleMsg (state, string) {
      state.ishopRuleMsg = string
    },
    setIshopSubmitMsg (state, string) {
      state.ishopSubmitMsg = string
    },
    setRecommendConfig (state, array) {
      state.recommendConfig = array
    }
  },
  actions: {},
  getters: {}
}

export default userConfig
