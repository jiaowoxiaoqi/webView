/** 租户相关配置信息存储 */
function filterData (data, key, val) {
  let result = data.filter(item => {
    return item[key] == val
  })
  return result
}

function exist (arr) {
  return arr && arr.length > 0
}

function filterMaxQty (array, itemType) {
  let returnData = {
    type1: null,
    type2: null,
    type3: null,
    type4: null
  }
  array.forEach((item) => {
    if (itemType == 5) {
      switch (item.type) {
        case 1:
          returnData.type1 = item.maxQty
          break
        case 2:
          returnData.type2 = item.maxQty
          break
      }
    }
    if (itemType == 7) {
      switch (item.type) {
        case 2:
          returnData.type2 = item.maxQty
          break
        case 3:
          returnData.type3 = item.maxQty
          break
        case 4:
          returnData.type4 = item.maxQty
          break
      }
    }
  })
  return returnData
}

const userConfig = {
  state: {
    ishopParam: {}, // 展示餐厅范围
    ishopRuleMsg: '', // 推荐规则
    ishopSubmitMsg: '', // 提交时提示语
    isShowItem5: true, // MeiCan module
    maxSelectShop: 0, // MeiCan 选择最多限制
    maxEntryShop: 0, // MeiCan 录入最多限制
    isShowItem7: true, // takeAway module
    totalEntry: 0, // takeAway 录入总计
    waimaiEntry: 0, // takeAway 录入外卖最多限制
    chaxieEntry: 0, // takeAway 录入茶歇最多限制
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
      let item5Config = filterData(array, 'itemType', 5)
      let item7Config = filterData(array, 'itemType', 7)
      state.isShowItem5 = exist(item5Config)
      state.isShowItem7 = exist(item5Config)
      if (state.isShowItem5) {
        console.log(item5Config[0])
        let max5 = filterMaxQty(item5Config[0].recommendTypes, 5)
        state.maxSelectShop = max5.type1
        state.maxEntryShop = max5.type2
      }
      if (state.isShowItem7) {
        let max7 = filterMaxQty(item7Config[0].recommendTypes, 7)
        state.totalEntry = max7.type2
        state.waimaiEntry = max7.type3
        state.chaxieEntry = max7.type4
      }
      console.log(state.isShowItem5)
      console.log(state.isShowItem7)
      console.log(state.maxSelectShop)
      console.log(state.maxEntryShop)
      console.log(state.totalEntry)
      console.log(state.waimaiEntry)
      console.log(state.chaxieEntry)
      // array.forEach((item) => {
      //   if (item.itemType == 5) {
      //     state.isShowItem5 = true
      //   }
      // })
    }
  },
  actions: {},
  getters: {}
}

export default userConfig
