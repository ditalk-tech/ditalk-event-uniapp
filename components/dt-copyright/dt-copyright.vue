<template>
	<view class="page-container">
		<view class="copyright">
			<view>Copyright © 2023-2025</view>
			<view>深圳帝拓科技服务中心 DiTalk.Tech</view>
			<view>email：ditalk@163.com</view>
			<view>微信扫码联系</view>
			<img src="http://static.ditalk.tech/ditalk_weixin_qr_code.png" class="qrcode" @click="download" />
		</view>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	// import * as ResUtil from "@/utils/ResUtil"
	// import * as UniStorage from "@/common/UniStorage"

	// const title = ref()

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
	// const xxx = () => {}
	const download = () => {
		uni.downloadFile({
			url: 'http://static.ditalk.tech/ditalk_weixin_qr_code.png',
			success: (res) => {
				if (res.statusCode === 200) {
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success: function () {
							uni.showToast({
								title: '保存成功',
								icon: 'success',
								duration: 2000
							})
						}
					})
				}
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