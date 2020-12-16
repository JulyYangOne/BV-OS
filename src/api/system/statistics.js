import request from '@/utils/request'

// 查询销统列表
export function listStatistics(query) {
  query.country =  query.country  == 'all'?null: query.country
  query.model =  query.model  == 'all'?null: query.model
  query.brand =  query.brand  == 'all'?null: query.brand
  return request({
    url: '/system/statistics/list',
    method: 'get',
    params: query
  })
}

// 查询销统详细
export function getStatistics(id) {
  return request({
    url: '/system/statistics/' + id,
    method: 'get'
  })
}

// 新增销统
export function addStatistics(data) {
  return request({
    url: '/system/statistics',
    method: 'post',
    data: data
  })
}

// 修改销统
export function updateStatistics(data) {
  return request({
    url: '/system/statistics',
    method: 'put',
    data: data
  })
}

// 删除销统
export function delStatistics(id) {
  return request({
    url: '/system/statistics/' + id,
    method: 'delete'
  })
}

// 导出销统
export function exportStatistics(query) {
  query.country =  query.country  == 'all'?null: query.country
  query.model =  query.model  == 'all'?null: query.model
  query.brand =  query.brand  == 'all'?null: query.brand
  return request({
    url: '/system/statistics/export',
    method: 'get',
    params: query
  })
}
