import request from '@/utils/request'
export function getListInformation(val,type) {
  /** 国家,品牌,机型数据
   *  @flag '' 空为全部；  1,2,3 单一数据
   *  @type 0 空为全部； 1 为权限范围内的数据
   * */
  return request({
    url: '/system/user/getListInformation',
    method: 'post',
    data:{
      flag:val,
      type:type
    }
  })
}

// 查询销统列表
export function totalList(data) {
  data.country =  data.country  == 'all'?null: data.country
  data.model =  data.model  == 'all'?null: data.model
  data.brand =  data.brand  == 'all'?null: data.brand

  return request({
    url: '/system/statistics/totalList',
    method: 'post',
    data
  })
}

// 按国家查询
export function CountryList(data) {
  data.country =  data.country  == 'all'?null: data.country
  data.model =  data.model  == 'all'?null: data.model
  data.brand =  data.brand  == 'all'?null: data.brand
  return request({
    url: '/system/statistics/countryList',
    method: 'post',
    data:{
      model:data.model,
      brand:data.brand,
      startTime:data.date[0],
      endTime:data.date[1]
    }
  })
}
