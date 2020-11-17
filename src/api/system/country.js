import request from '@/utils/request'

// 查询国家列表
export function listCountry(query) {
  return request({
    url: '/system/country/list',
    method: 'get',
    params: query
  })
}

// 查询国家详细
export function getCountry(countryId) {
  return request({
    url: '/system/country/' + countryId,
    method: 'get'
  })
}

// 新增国家
export function addCountry(data) {
  return request({
    url: '/system/country',
    method: 'post',
    data: data
  })
}

// 修改国家
export function updateCountry(data) {
  return request({
    url: '/system/country',
    method: 'put',
    data: data
  })
}

// 删除国家
export function delCountry(countryId) {
  return request({
    url: '/system/country/' + countryId,
    method: 'delete'
  })
}

// 导出国家
export function exportCountry(query) {
  return request({
    url: '/system/country/export',
    method: 'get',
    params: query
  })
}