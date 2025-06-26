<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<view class="copyright">
			<view>Copyright © 2023-2025</view>
			<view>深圳帝拓科技服务中心 DiTalk.Tech</view>
			<view>email：ditalk@163.com</view>
			<view>微信扫码联系</view>
			<img :src="imageUrl" class="qrcode" @click="downloadImage" />
		</view>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	// import * as ResUtil from "@/utils/ResUtil"
	// import * as UniStorage from "@/common/UniStorage"

	const imageUrl = ref('https://static.ditalk.tech/ditalk_weixin_qr_code.png')

	// const props = defineProps({})

	// Computed
	// const xxx = computed(() => {
	// 	return xxx;
	// })

	// Watch
	// watch(xxx, (newValue) => {
	// })

	// Emit
	// const emit = defineEmits(['change', 'remove', 'empty'])
	// const onChange = (value) => {
	// 	emit('change', arg1, arg2)
	// }

	// Methods
	const downloadImage = () => {
		uni.showLoading({
			title: '下载中...',
			mask: true
		})

		uni.downloadFile({ url: imageUrl.value }).then(downloadRes => {
			if (downloadRes.statusCode === 200) {
				// 下载成功，保存到相册
				return uni.saveImageToPhotosAlbum({
					filePath: downloadRes.tempFilePath
				})
			} else {
				throw new Error(`下载失败，状态码: ${downloadRes.statusCode}`)
			}
		}).then(() => {
			uni.hideLoading()
			uni.showToast({
				title: '保存成功',
				icon: 'success'
			})
		}).catch(err => {
			uni.hideLoading()

			// 处理用户未授权的情况
			if (err.errMsg.includes('auth deny')) {
				uni.showModal({
					title: '提示',
					content: '需要获取相册权限才能保存图片',
					success: modalRes => {
						if (modalRes.confirm) {
							uni.openSetting() // 打开设置页让用户授权
						}
					}
				})
			} else {
				console.warn(`保存失败: ${err.errMsg}`)
			}
		})
	}

	// Event
	onLoad(() => { // Uni lifecycle

	})

	onShow(() => { // Uni lifecycle

	})

	onMounted(() => { // Vue lifecycle

	})

	// Expose methods for upper level
	// defineExpose({
	// 	one, two ,three
	// });
	// upper level eg.
	// <Some ref="SomeRef"></Some>
	// const SomeRef = ref(null); // 获取子组件实例(需要跟ref处同名)
</script>

<style lang="scss" scoped>
	.page-container {
		.qrcode {
			width: 50px;
			height: 50px;
			margin-top: 10rpx;
		}

		.copyright {
			text-align: center;
			font-size: 12px;
			color: #999;
			padding-top: 40px;
			padding-bottom: 40rpx
		}
	}
</style>