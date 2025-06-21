/**
 * Copyright 2025 DiTalk.tech All Rights Reserved.
 * @desc 横幅服务接口
 * @author weidixian
 */
import * as ResUtil from '@/utils/ResUtil';

/**
 * 获取横幅
 * @returns {string} 横幅图片地址
 */
export const getImage = () =>  {
	return uni.request({
		url: '/uni/banner/getImageUrl',
		method: 'GET',
	});
}