/**
 * Copyright 2025 DiTalk.tech All Rights Reserved.
 */
import * as GlobalConfig from "@/common/GlobalConfig"
import * as AuthUtil from "@/utils/AuthUtil"
import * as ResUtil from "@/utils/ResUtil"
import { debounce } from "@/utils/CommonUtil"

/**
 * @desc 登录
 */
export const doLogin = async () => {
	if (!AuthUtil.isLogin()) {
		// #ifdef MP
		const code = await AuthUtil.getCode()
		const userInfo = await AuthUtil.getUserInfo()
		uni.request({
			url: '/auth/uni/weixin/login',
			method: "POST",
			data: {
				tenantId: GlobalConfig.tenantId,
				clientId: GlobalConfig.clientId,
				appId: GlobalConfig.appId,
				platform: GlobalConfig.platform,
				grantType: GlobalConfig.grantTypeXcx,
				code: code,
				userName: "placeholder", // 占位
				nickName: userInfo.nickName,
				avatar: userInfo.avatarUrl
			},
			success(res) {
				const data = ResUtil.getData(res)
				// if (!!data.openid) {
				// 	uni.setStorageSync("openid", data.openid)
				// }
				if (!!data.access_token) {
					uni.setStorageSync("token", data.access_token)
					getMyId().then(res => {
						const myId = ResUtil.getData(res)
						uni.setStorageSync("myId", myId)
					})
					uni.reLaunch({
						url: "/pages/index/index"
					})
				} else {
					uni.removeStorageSync("token")
				}
			},
			fail(error) {
				console.error(res.msg);
			},
			complete() {
				uni.setStorageSync("doLogin", true) // 登录控制参数，防止重复弹出登录框，防止重复调用登录接口。true 表示需要登录，false 表示不需要登录
			}
		})
		// uni.setStorageSync('userInfo', userInfo)
		// #endif

		// #ifndef MP
		uni.showToast({
			title: "设备不支持",
			icon: "error"
		})
		// #endif
	}
}

/**
 * @desc 登出
 */
export const logout = debounce(
	function() {
		uni.request({
			url: '/auth/logout',
			method: "POST"
		}).then(res => {
			ResUtil.showMsg(res, res.data.msg)
			uni.clearStorage()
			setTimeout(() => {
				uni.redirectTo({
					url: "/pages/logout/logout"
				})
			}, 1000)
		})
	}
)

/**
 * @desc 验证token
 */
export const verifyToken = function() {
	return uni.request({
		url: '/auth/uni/verify',
		method: "GET"
	})
}

/**
 * @desc getMyId
 */
export const getMyId = function() {
	return uni.request({
		url: '/auth/uni/getMyId',
		method: "GET"
	})
}