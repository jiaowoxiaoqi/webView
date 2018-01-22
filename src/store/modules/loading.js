// import $v from '@/common/utils'

// const alipay = {
//     state: {
//         stepData: { index: 0, msg: "" }
//     },
//     mutations: {
//         setStepData(state, value) {
//             state.stepData = value;
//         }       
//     }
// }
// export default alipay;
import * as types from '../mutation-types'

// initial state
const state = {
  loadStatus: false
}

// getters
const getters = {
  
}

// actions
const actions = {
  
}

// mutations
const mutations = {
    [types.CHANGE_LOADSTATUs] (state, status ) {
        state.loadStatus = status
    }
}

export default {
  state,
  mutations
}

