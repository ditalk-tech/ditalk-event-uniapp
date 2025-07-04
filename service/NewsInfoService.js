/**
 * Copyright 2025 DiTalk.tech All Rights Reserved.
 * @desc 喜讯接口
 * @author weidixian
 */

/**
 * 获取详情
 * @returns {Object} 详情
 */
export const detail = (id) => {
	return uni.request({
		url: '/uni/news/info/' + id,
		method: 'GET',
	});
}

/**
 * 列表
 * @returns {Array} 列表
 */
export const list = (params) => {
	return uni.request({
		url: '/uni/news/info/list',
		method: 'GET',
		data: params,
	});
}

/**
 * 添加记录
 * @returns {Array} 列表
 */
export const add = (entity) => {
	return uni.request({
		url: '/uni/news/info',
		method: 'POST',
		data: entity,
	});
}

/**
 * 修改记录
 * @returns {Array} 列表
 */
export const update = (entity) => {
	return uni.request({
		url: '/uni/news/info',
		method: 'PUT',
		data: entity,
	});
}

/**
 * 删除记录
 * @returns {Array} 列表
 */
export const remove = (ids) => {
	return uni.request({
		url: '/uni/news/info/' + ids,
		method: 'DELETE',
	});
}

/**
 * 获得的总数
 * @returns {number} 总数
 */
export const total = () => {
	return uni.request({
		url: '/uni/news/info/total',
		method: 'GET'
	})
}