/**
 * Copyright 2025 DiTalk.tech All Rights Reserved.
 * @desc 横幅服务接口
 * @author weidixian
 */
import * as ResUtil from '@/utils/ResUtil';

/**
 * 获取横幅列表
 * @returns {string} 横幅图片地址
 */
export const getImage = async () =>  {
	const res = await uni.request({
		url: '/uni/banner/getImageUrl',
		method: 'GET',
	});
	return ResUtil.getData(res);
}