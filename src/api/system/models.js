import request from '@/utils/request'

// 查询机型列表
export function listModels(query) {
  return request({
    url: '/system/models/list',
    method: 'get',
    params: query
  })
}

// 查询机型详细
export function getModels(modelsId) {
  return request({
    url: '/system/models/' + modelsId,
    method: 'get'
  })
}

// 新增机型
export function addModels(data) {
  return request({
    url: '/system/models',
    method: 'post',
    data: data
  })
}

// 修改机型
export function updateModels(data) {
  return request({
    url: '/system/models',
    method: 'put',
    data: data
  })
}

// 删除机型
export function delModels(modelsId) {
  return request({
    url: '/system/models/' + modelsId,
    method: 'delete'
  })
}

// 导出机型
export function exportModels(query) {
  return request({
    url: '/system/models/export',
    method: 'get',
    params: query
  })
}