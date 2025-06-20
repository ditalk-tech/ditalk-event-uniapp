/**
 * Copyright 2025 DiTalk.tech All Rights Reserved.
 */
import { verifyToken } from "../service/AuthService"

const okCode = 200 // 业务响应码

/**
 * 取业务响应码
 * @param {Object} response
 * @return {Number}
 */
export const getCode = function(response) {
	return response.data.code // 业务响应码的结构
}

/**
 * @desc 校验后端响应结果
 * @param {Object} response
 * @return {Boolean}
 */
export const isSuccess = function(response) {
	return getCode(response) == okCode
}

/**
 * @desc 获取后端响应结果数据 response.data.data
 * @param {Object} response
 * @return {Object}
 */
export const getData = function(response) {
	return getDataX(response, response.data.data, response.data.msg)
}

/**
 * @desc 获取后端响应结果数据 response.data.rows
 * @param {Object} response
 * @return {Object}
 */
export const getDataRows = function(response) {
	return getDataX(response, response.data.rows, response.data.msg)
}

/**
 * @desc 获取后端响应结果数据
 * @param {Object} response
 * @param {String} data 指定response中属性，如response.data.data、response.data.rows
 * @param {String} msg 指定response中属性，如response.data.msg、response.data.error
 * @return {Object}
 */
export const getDataX = function(response, data, msg) {
	tokenInvalid(response)
	if (isSuccess(response)) {
		return data
	} else {
		uni.showToast({
			title: msg,
			icon: 'none'
		})
	}
}

/**
 * @desc 展示后端响应消息
 * @param {Object} response
 * @param {String} msg (目前固定为response.data.msg)指定response中消息所在的属性，如response.data.msg、response.data.error
 * @return {Object}
 */
export const showMsg = function(response) {
	tokenInvalid(response)
	uni.showToast({
		title: response.data.msg,
		icon: 'none'
	})
}

/**
 * @desc Token无效
 * @param {Object} response
 */
export const tokenInvalid = function(response) {
	if (response.data.code == 401) {
		uni.request({ // 访问 /login/verify 验证 token，防止部分API产生的误报
			url: "/auth/uni/verify",
			method: "GET"
		}).then(res => {
			if (res.data.code == 401) { // Token 失效需要重新登录
				uni.removeStorageSync("token")
				uni.showModal({
					title: "提示",
					content: "登录已过期，请重新登录",
					showCancel: false,
					confirmText: "重新登录",
					success: function(res) {
						if (res.confirm) {
							uni.reLaunch({
								url: "/pages/login/login"
							})
						}
					}
				})
			} else { // Token 有效，部分API产生的误报
				uni.showToast({
					title: "数据加载失败，请刷新",
					icon: 'none'
				})
			}
		})
	}
}