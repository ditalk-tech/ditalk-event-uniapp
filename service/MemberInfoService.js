/**
 * Copyright 2025 DiTalk.tech All Rights Reserved.
 * @desc 用户信息接口
 * @author weidixian
 */

/**
 * 获取简版详情
 * @returns {Object} 详情
 */
export const basicInfo = (id) => {
	return uni.request({
		url: '/uni/member/info/basic/' + id,
		method: 'GET',
	});
}
