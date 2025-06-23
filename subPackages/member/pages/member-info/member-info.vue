<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<!-- 顶部区域：头像、状态、点赞 -->
		<view class="header">
			<!-- 头像 -->
			<view class="avatar">
				<!-- 这里用背景色模拟头像，实际可替换为 <image> 加载真实图片 -->
				<image class="avatar-circle" :src="memberInfo?.avatarUrl || ''"></image>
			</view>
			<!-- 状态与点赞 -->
			<view class="header-right">
				<view class="status">状态：{{ memberInfo?.openStateLabel || "" }}</view>
				<view class="like-section">
					<text class="like-text">点藏</text>
					<!-- 点赞按钮，点击切换状态 -->
					<view class="like-btn" @click="toggleLike" hover-class="like-hover">
						<uni-icons v-if="!isLiked" type="heart"></uni-icons>
						<uni-icons v-if="isLiked" type="heart-filled" color="red"></uni-icons>
					</view>
				</view>
			</view>
		</view>

		<!-- 个人信息区域 -->
		<view class="info-section">
			<view class="name">{{ memberInfo?.name || "" }}</view>
			<view class="basic-info">
				<text>性别：{{ memberInfo?.sexLabel || "" }}</text>
				<text>年龄段：{{ memberInfo?.ageRange || "-" }}</text>
				<text>身高：{{ memberInfo?.tall || "" }}</text>
				<!-- <text>电话：{{ memberInfo.phone }}</text> -->
				<text>邮箱：{{ memberInfo?.email || "" }}</text>
			</view>
			<view class="detail-info">
				<text>婚姻：{{ memberInfo?.maritalStatusLabel || "" }}</text>
				<text>学历：{{ memberInfo?.qualification || "" }}</text>
				<text>户籍：{{ memberInfo?.placeOfOrigin || "" }}</text>
				<text>职业：{{ memberInfo?.career || "" }}</text>
				<text>爱好：{{ memberInfo?.hobby || "" }}</text>
			</view>
			<view class="intro">
				<text>简介：{{ memberInfo?.profile || "" }}</text>
			</view>
		</view>

		<!-- 生活瞬间区域 -->

		<view class="dt_head-title">
			<view class="title">生活瞬间（最多5图）</view>
		</view>
		<view v-for="(item, index) in momentList" :key="index" class="moment">
			<image class="image" src="http://static.ditalk.tech/salon_1002.png"></image>
			<text class="desc">
				{{ item.desc }}
			</text>
		</view>

		<dt-copyright></dt-copyright>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import * as MemberInfoService from "@/service/MemberInfoService"
	import * as ResUtil from "@/utils/ResUtil"

	// 用户信息数据
	const memberInfo = ref()
	const momentList = ref([])

	// 点赞状态
	const isLiked = ref(false)
	// 活跃状态
	const isActive = ref(true)

	// 切换点赞状态方法
	const toggleLike = () => {
		isLiked.value = !isLiked.value
		// 可添加点赞成功提示或接口请求
		uni.showToast({
			title: isLiked.value ? '已点藏' : '已取消',
			icon: 'none'
		})
	}

	// Event
	onLoad((options) => { // Uni lifecycle
		MemberInfoService.basicInfo(options.id).then(res => {
			memberInfo.value = ResUtil.getData(res)
		})
	})

	onShow(() => { // Uni lifecycle
	})

	onMounted(() => { // Vue lifecycle
	})
</script>

<style lang="scss" scoped>
	/* 卡片整体样式 */
	.page-container {
		padding-bottom: env(safe-area-inset-bottom);
		padding-bottom: constant(safe-area-inset-bottom);
		box-sizing: border-box;
		width: 100%;
		background-color: #fff;
		border-radius: 16rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

		// 顶部区域
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 24rpx 20rpx 24rpx 20rpx;
			border-bottom: 1rpx solid $global-mid-gray;

			.avatar {
				.avatar-circle {
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
					background-color: $global-light-gray;
				}
			}

			.header-right {
				display: flex;
				flex-direction: column;
				align-items: flex-end;

				.status {
					margin-bottom: 16rpx;
				}

				.like-section {
					display: flex;
					align-items: center;

					.like-text {
						margin-right: 20rpx;
					}

					.like-btn {}

					.like-hover {
						transform: scale(1.2);
					}
				}
			}
		}

		// 个人信息区域
		.info-section {
			padding: 0rpx 20rpx 24rpx 20rpx;

			.name {
				font-size: 32rpx;
				font-weight: bold;
				margin-bottom: 20rpx;
			}

			.basic-info,
			.detail-info {
				display: flex;
				flex-wrap: wrap;
				margin-bottom: 16rpx;

				text {
					width: 50%;
					font-size: 26rpx;
					line-height: 2;
				}
			}

			.intro {
				text {
					display: block;
					font-size: 26rpx;
					line-height: 1.8;
				}
			}
		}

		// 生活瞬间区域
		.moment {
			margin-bottom: 30rpx;

			.image {
				width: 100%;
			}

			.desc {
				display: block;
				font-size: 24rpx;
				line-height: 1.6;
				margin-top: 12rpx;
			}
		}
	}
</style>