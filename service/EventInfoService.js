/**
 * Copyright 2025 DiTalk.tech All Rights Reserved.
 * @desc 活动信息接口
 * @author weidixian
 */

/**
 * 获取详情
 * @returns {Object} 详情
 */
export const detail = (id) => {
	return uni.request({
		url: '/uni/event/info/' + id,
		method: 'GET',
	});
}

/**
 * 获取列表
 * @returns {Array} 列表
 */
export const list = (params) => {
	return uni.request({
		url: '/uni/event/info/list',
		method: 'GET',
		data: params,
	});
}

/**
 * 获取列表 —— 新活动
 * @returns {Array} 列表
 */
export const newEvents = (params) => {
	return uni.request({
		url: '/uni/event/info/new/list',
		method: 'GET',
		data: params,
	});
}

/**
 * 获取列表 —— 历史活动
 * @returns {Array} 列表
 */
export const oldEvents = (params) => {
	return uni.request({
		url: '/uni/event/info/old/list',
		method: 'GET',
		data: params,
	});
}

/**
 * 获取列表 —— 用户报名的新活动
 * @returns {Array} 列表
 */
export const myNewEvents = (params) => {
	return uni.request({
		url: '/uni/event/info/my/new/list',
		method: 'GET',
		data: params,
	});
}

/**
 * 获取列表 —— 用户报名的历史活动
 * @returns {Array} 列表
 */
export const myOldEvents = (params) => {
	return uni.request({
		url: '/uni/event/info/my/old/list',
		method: 'GET',
		data: params,
	});
}
