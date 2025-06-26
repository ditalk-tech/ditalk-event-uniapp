<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<view class="dt_head-title-noline">
			<view class="title">生活瞬间照片集（最多5图）</view>
			<view class="more" @click="addOne">新增</view>
		</view>
		<view v-for="(item, index) in momentList" :key="index" class="moment">
			<image class="image" :src="item.photoUrl" @click="chooseAndUploadAvatar(index)"></image>
			<uni-easyinput type="textarea" v-model="item.caption" placeholder="描述与图片相关的内容"
				maxlength="512"></uni-easyinput>
			<view class="btn-view">
				<button class="btn" size="mini" @click="submit(index)">保存</button>
				<view style="width: 100rpx;"></view>
				<button class="btn" size="mini" @click="del(index)">删除</button>
			</view>
		</view>
		<dt-copyright></dt-copyright>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import * as MemberPhotoService from "@/service/MemberPhotoService"
	import * as ResUtil from "@/utils/ResUtil"

	const momentList = ref([])

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
	/**
	 * 页面中插入新的一个图片与描述
	 */
	const addOne = () => {
		if (momentList.value.length >= 5) {
			uni.showToast({
				icon: 'none',
				title: '最多只能保存5个图片'
			})
			return
		}
		momentList.value = [{ id: 0, photoId: 0, photoUrl: '/static/black-image-2.svg', caption: '' }, ...momentList
			.value
		]
		chooseAndUploadAvatar(0)
	}

	/**
	 * 选择图片
	 * 
	 * @param {number} index 列表的索引
	 */
	const chooseAndUploadAvatar = (index) => {
		uni.chooseImage({
			count: 1, // 默认为1，只选择一张图片
			sizeType: ['compressed'], // 'original', 'compressed'
			sourceType: ['album', 'camera'],
			success: chooseImageRes => {
				const tempFilePaths = chooseImageRes.tempFilePaths;
				const uploadTask = uni.uploadFile({ // ************* 上传图片并记录数据 *************
					url: '/uni/oss/upload', // 你的上传接口地址
					filePath: tempFilePaths[0],
					name: 'file', // 这里根据后端需要的字段来定义
					formData: {
						// 'user': 'test' // 其他要传的参数
					},
					method: 'POST',
					success: uploadRes => {
						uploadRes.data = JSON.parse(uploadRes
							.data) // uploadRes.data 是字符串，需要解析成对象并覆盖uploadRes.data
						const ossVo = ResUtil.getData(uploadRes)
						// 上传成功处理逻辑
						momentList.value[index].photoUrl = ossVo.url
						momentList.value[index].photoId = ossVo.ossId
						// ************* 更新个人头像信息到数据库 *************
						submit(index)
					},
					fail: uploadError => {
						// 上传失败处理逻辑
						// console.debug('upload fail:', uploadError);
						uni.showToast({
							icon: 'none',
							title: uploadError
						});
					}
				});
				// 监听上传进度变化
				uploadTask.onProgressUpdate(progressEvent => {
					// console.debug('上传进度' + progressEvent.progress + '%');
				});
			},
			fail: chooseImageError => {
				// 选择图片失败处理逻辑
				// console.debug('choose image fail:', chooseImageError);
				uni.showToast({
					icon: 'none',
					title: chooseImageError
				});
			}
		})
	}

	/**
	 * 读取数据
	 */
	const loadData = () => {
		MemberPhotoService.listMy().then(res => {
			momentList.value = ResUtil.getData(res)
		})
	}

	/**
	 * 提交更新
	 * 
	 * @param {number} index 列表的索引
	 */
	const submit = (index) => {
		if (momentList.value[index].photoId == 0) {
			uni.showToast({
				icon: 'none',
				title: '请先上传图片'
			})
			return
		}
		const info = {}
		if (momentList.value[index].id == 0) { // ID为0的，新增一条数据
			info.photoId = momentList.value[index].photoId
			info.caption = momentList.value[index].caption
			info.memberId = uni.getStorageSync("myId")
			info.state = "0"
			MemberPhotoService.add(info).then((res) => {
				ResUtil.showMsg(res)
				loadData()
			})
		} else { // ID不为0的，更新数据
			info.id = momentList.value[index].id
			info.version = momentList.value[index].version
			info.photoId = momentList.value[index].photoId
			info.caption = momentList.value[index].caption
			info.memberId = uni.getStorageSync("myId")
			MemberPhotoService.update(info).then((res) => {
				ResUtil.showMsg(res)
				loadData()
			})
		}
		uni.setStorageSync("reloadMemberPhoto", true) // 用于通知个人中心页面刷新数据
	}
	/**
	 * 删除条目
	 * 
	 * @param {number} index 列表的索引
	 */
	const del = (index) => {
		uni.showModal({
			title: '提示',
			content: '确定要删除吗？',
			success: (res) => {
				if (res.confirm) {
					MemberPhotoService.remove(momentList.value[index].id).then((res) => {
						ResUtil.showMsg(res)
						loadData()
					})
				}
			}
		})
	}

	// Event
	onLoad((options) => { // Uni lifecycle
		loadData()
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
		padding-bottom: env(safe-area-inset-bottom);
		padding-bottom: constant(safe-area-inset-bottom);

		// 生活瞬间区域
		.moment {
			margin-bottom: 80rpx;
			padding: 20rpx;
			background-color: $global-bg-gray;

			.image {
				box-sizing: border-box;
				border-radius: 16rpx;
				width: 100%;
			}

			.caption {
				display: block;
				// font-size: 24rpx;
				line-height: 1.6;
				margin-top: 12rpx;
			}

			.btn-view {
				display: flex;
				flex-direction: row;
				padding-top: 12rpx;

				.btn {
					width: 100%;
					background-color: $global-mid-gray;
				}
			}
		}
	}
</style>