import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listAdvise(query) {
  query.country =  query.country  == 'all' ? null: query.country
  query.model =  query.model  == 'all' ? null: query.model
  query.brand =  query.brand  == 'all' ? null: query.brand
  return request({
    url: '/system/advise/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getAdvise(id) {
  return request({
    url: '/system/advise/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addAdvise(data) {
  return request({
    url: '/system/advise',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateAdvise(data) {
  return request({
    url: '/system/advise',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delAdvise(id) {
  return request({
    url: '/system/advise/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportAdvise(query) {
  query.country =  query.country  == 'all'?null: query.country
  query.model =  query.model  == 'all'?null: query.model
  query.brand =  query.brand  == 'all'?null: query.brand
  return request({
    url: '/system/advise/export',
    method: 'get',
    params: query
  })
}
