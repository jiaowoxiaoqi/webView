/* api接口 */

export default {
  login: '/identity/login', // post 登录
  getCityList: '/api/shopkeeper/Region/QueryTenantRegions', // post 获取国家type0省份type1城市type2 POST /api/Region/QueryRegion    /api/Region/QueryTenantRegions
  getHospitalList: '/api/shopkeeper/Hospital/PagingTenantHospital', // post 查询医院列表
  queryDictionary: '/api/shopkeeper/Dictionary/QueryDictionaryValView', // 获取菜系
  queryMyHospitals: '/api/shopkeeper/ShopRecommend/QueryMyHospitals', // 获取我选择过的医院
  queryMyCity: '/api/shopkeeper/ShopRecommend/QueryMyCity', // 获取 我选择过的城市
  queryShops: '/api/shopkeeper/ShopRecommend/QueryShops', // 获取商家列表
  postMyShops: '/api/shopkeeper/ShopRecommend/PostMyShops', // 存储我选择的商户
  queryMyShops: '/api/shopkeeper/ShopRecommend/QueryMyShops', // 获取我推荐的商户
  removeMyShop: '/api/shopkeeper/ShopRecommend/RemoveMyShop', // 删除我推荐的商户
  getTenantConfig: '/api/shopkeeper/ShopRecommend/GetTenantConfig' // 获取租户配置
}
