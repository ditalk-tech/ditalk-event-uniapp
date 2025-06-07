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
export const getDataA = function(response) {
	return getData(response, response.data.data, response.data.msg)
}

/**
 * @desc 获取后端响应结果数据 response.data.rows
 * @param {Object} response
 * @return {Object}
 */
export const getDataB = function(response) {
	return getData(response, response.data.rows, response.data.msg)
}

/**
 * @desc 获取后端响应结果数据 response.data
 * @param {Object} response
 * @return {Object}
 */
export const getDataC = function(response, data, msg) {
	return getData(response, response.data, response.data.msg)
}

/**
 * @desc 获取后端响应结果数据
 * @param {Object} response
 * @param {String} data 指定response中数据所在的属性，如response.data、response.data.data、response.data.rows
 * @param {String} msg 指定response中消息所在的属性，如response.data.msg、response.data.error
 * @return {Object}
 */
export const getData = function(response, data, msg) {
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
				uni.switchTab({
					url: "/pages/index/index"
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