/**
 * Copyright 2025 DiTalk.tech All Rights Reserved.
 * @desc 用户信息接口
 * @author weidixian
 */

/**
 * 获取指定用户简版详情
 * 
 * @param {Number} id 用户id
 * @returns {Object} 详情
 */
export const basicInfo = (id) => {
	return uni.request({
		url: '/uni/member/info/basic/' + id,
		method: 'GET',
	});
}

/**
 * 获取本人详细信息
 * 
 * @returns {Object} 详情
 */
export const myInfo = () => {
	return uni.request({
		url: '/uni/member/info/my',
		method: 'GET',
	});
}

/**
 * 获取本人详细信息
 * 
 * @param {Object} info 用户信息
 * @returns {Object} 详情
 */
export const updateMyInfo = (info) => {
	return uni.request({
		url: '/uni/member/info/my',
		method: 'PUT',
		data: info,
	});
}

/**
 * 更新本人头像
 * 
 * @param {Object} info 用户信息
 * @returns {Object} 详情
 */
export const updateMyAvatar = (info) => {
	return uni.request({
		url: '/uni/member/info/my/avatar',
		method: 'PUT',
		data: info,
	});
}
