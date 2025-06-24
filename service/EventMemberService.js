/**
 * Copyright 2025 DiTalk.tech All Rights Reserved.
 * @desc 活动名单接口
 * @author weidixian
 */

/**
 * 报名活动
 * @returns {Boolean} 报名结果
 */
export const signup = (eventId) => {
	return uni.request({
		url: '/uni/event/member/signup/' + eventId,
		method: 'PUT',
	});
}
