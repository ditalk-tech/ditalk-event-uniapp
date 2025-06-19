/**
 * Copyright 2025 DiTalk.tech All Rights Reserved.
 */
export const money = "money";
export const number = "number";
export const letter = "letter";
export const email = "email";
export const phone = "phone";
export const nickname = "nickname";

/**
 * Validate input value
 * @param {Object} type
 * @param {Object} value
 */
export const validateInput = function(type, value) {
	let result = true;
	let errorMessage = '';

	switch (type) {
		case 'money':
			errorMessage = '只能输入正数，可精确到小数后两位';
			if (isNaN(value)) {
				result = false;
				break;
			}
			if (value <= 0) {
				result = false;
				break;
			}
			let str = value.toString();
			if (str.includes('.')) {
				let parts = str.split('.');
				if (parts[1].length >= 2) {
					result = false;
					break;
				}
			}
			errorMessage = '';
			break;
		case 'number':
			const numberRegExp = /^\d+$/;
			if (!numberRegExp.test(value)) {
				result = false;
				errorMessage = '只能输入数字';
			}
			break;
		case 'letter':
			const letterRegExp = /^[a-zA-Z]+$/;
			if (!letterRegExp.test(value)) {
				result = false;
				errorMessage = '只能输入字母';
			}
			break;
		case 'email':
			if (value.length > 32) {
				result = false;
				errorMessage = '邮箱地址长度应小于32';
			} else {
				const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegExp.test(value)) {
					result = false;
					errorMessage = '请输入有效的邮箱地址';
				}
			}
			break;
		case 'phone':
			if (value.length != 11) {
				result = false;
				errorMessage = '手机号码应为11位';
			} else {
				const phoneRegExp = /^1[3-9]\d{9}$/;
				if (!phoneRegExp.test(value)) {
					result = false;
					errorMessage = '请输入有效的手机号码';
				}
			}
			break;
		case 'nickname':
			const nicknameRegex = /^[\w\u4e00-\u9fa5]{2,16}$/;
			if (!nicknameRegex.test(value)) {
				return {
					result: false,
					errorMessage: '昵称应在 2 到 16 个字符之间，且只能包含字母、数字、下划线和汉字'
				};
			}
			break;
		default:
			result = false;
			errorMessage = '无效的校验类型';
	}

	return {
		result,
		errorMessage
	};
}

/**
 * Show toast wnen validation fails. 
 * @param {Object} type
 * @param {Object} value
 */
export const showToast = function(type, value) {
	const {
		result,
		errorMessage
	} = this.validateInput(type, value)
	if (result) {
		return true
	} else {
		uni.showToast({
			icon: 'none',
			title: errorMessage
		});
		return false
	}
}