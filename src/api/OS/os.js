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
export function totalList(query) {
  return request({
    url: '/system/statistics/totalList',
    method: 'post',
    params: query
  })
}
