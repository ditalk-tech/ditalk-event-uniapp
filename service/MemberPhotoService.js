/**
 * Copyright 2025 DiTalk.tech All Rights Reserved.
 * @desc 会员照片
 * @author weidixian
 */

/**
 * 获取详情
 * @returns {Object} 详情
 */
export const detail = (id) => {
	return uni.request({
		url: '/uni/member/photo/' + id,
		method: 'GET',
	});
}

/**
 * 列表 —— 指定用户
 * @returns {Array} 列表
 */
export const listMember = (memberId, params) => {
	return uni.request({
		url: '/uni/member/photo/list/' + memberId,
		method: 'GET',
		data: params,
	});
}

/**
 * 列表 —— 我自己的
 * @returns {Array} 列表
 */
export const listMy = (params) => {
	return uni.request({
		url: '/uni/member/photo/list',
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
		url: '/uni/member/photo',
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
		url: '/uni/member/photo',
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
		url: '/uni/member/photo/' + ids,
		method: 'DELETE',
	});
}
