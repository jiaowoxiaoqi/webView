/** vux组件使用到的状态管理 */
const vuxStatus = {
  state: {
    isLoading: false // vux ==> loading状态
  },
  mutations: {
    setIsLoading (state, boolean) {
      state.isLoading = boolean
    }
  },
  actions: {},
  getters: {}
}

export default vuxStatus
