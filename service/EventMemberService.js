/**
 * Copyright 2025 DiTalk.tech All Rights Reserved.
 * @desc 活动名单接口
 * @author weidixian
 */

/**
 * 报名活动
 * 
 * @param {Number} eventId 活动ID
 * @returns {Boolean} 报名结果
 */
export const signup = (eventId) => {
	return uni.request({
		url: '/uni/event/member/signup/' + eventId,
		method: 'PUT',
	});
}

/**
 * 查看我的报名数据
 * 
 * @param {Number} eventId 活动ID
 * @returns {Object} 报名数据
 */
export const myEventData = (eventId) => {
	return uni.request({
		url: '/uni/event/member/my/' + eventId,
		method: 'GET',
	});
}
