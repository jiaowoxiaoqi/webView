/** shop信息存储 */
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

const shopInfo = {
  state: {
    selectedShops: [], // 选择的商户
    entryShops: [], // 录入的商户
    entryTakeAway: [] // 录入的外卖/茶歇
  },
  mutations: {
    setSelectShops (state, array) {
      state.selectedShops = array
    },
    setEntryShops (state, array) {
      state.entryShops = array
    },
    setEntryTakeAway (state, array) {
      state.entryTakeAway = array
    }
  },
  actions: {},
  getters: {}
}

export default shopInfo
