/**
 * Copyright 2025 DiTalk.tech All Rights Reserved.
 * @desc 权限管理工具
 */

/**
 * @desc 获取用户登录状态
 * @return {Boolean}
 */
export const isLogin = () => {
	return !!uni.getStorageSync('token')
}

/**
 * @desc 获取用户登录凭证（code）
 * @return {Promise}
 */
export const getCode = () => {
	return new Promise((resolve, reject) => {
		uni.login({
			"onlyAuthorize": true,
			provider: 'weixin',
			success: (res) => {
				resolve(res.code)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

/**
 * @desc 获取用户信息
 * @return {Promise}
 */
export const getUserInfo = () => {
	return new Promise((resolve, reject) => {
		uni.getUserInfo({
			provider: 'weixin',
			success: (res) => {
				resolve(res.userInfo)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

/**
 * @desc 退出登录
 */
export const logout = () => {	
	uni.removeStorageSync('token')
}


