/**
 * Copyright 2025 DiTalk.tech All Rights Reserved.
 * @desc 喜讯接口
 * @author weidixian
 */

/**
 * 获取喜讯详情
 * @returns {Object} 喜讯详情
 */
export const detail = (id) => {
	return uni.request({
		url: '/uni/news/info/' + id,
		method: 'GET',
	});
}

/**
 * 喜讯列表
 * @returns {Array} 喜讯列表
 */
export const list = (params) => {
	return uni.request({
		url: '/uni/news/info/list',
		method: 'GET',
		data: params,
	});
}

/**
 * 添加喜讯记录
 * @returns {Array} 喜讯列表
 */
export const add = (newsInfo) => {
	return uni.request({
		url: '/uni/news/info',
		method: 'POST',
		data: newsInfo,
	});
}

/**
 * 修改喜讯记录
 * @returns {Array} 喜讯列表
 */
export const update = (newsInfo) => {
	return uni.request({
		url: '/uni/news/info',
		method: 'PUT',
		data: newsInfo,
	});
}

/**
 * 删除喜讯记录
 * @returns {Array} 喜讯列表
 */
export const remove = (ids) => {
	return uni.request({
		url: '/uni/news/info/' + ids,
		method: 'DELETE',
	});
}

/**
 * 获得喜讯的总数
 * @returns {number} 总数
 */
export const total = () => {
	return uni.request({
		url: '/uni/news/info/total',
		method: 'GET'
	})
}