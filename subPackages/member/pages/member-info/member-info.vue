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
				<image class="avatar-circle" src="http://static.ditalk.tech/male.png"></image>
			</view>
			<!-- 状态与点赞 -->
			<view class="header-right">
				<view class="status">状态：{{ isActive ? '活跃' : '停止' }}</view>
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
			<view class="name">{{ memberInfo.name }}</view>
			<view class="basic-info">
				<text>性别：{{ memberInfo.gender }}</text>
				<text>年龄段：{{ memberInfo.ageRange }}</text>
				<text>身高：{{ memberInfo.height }}</text>
				<!-- <text>电话：{{ memberInfo.phone }}</text> -->
				<text>邮箱：{{ memberInfo.email }}</text>
			</view>
			<view class="detail-info">
				<text>婚姻：{{ memberInfo.marrige }}</text>
				<text>学历：{{ memberInfo.education }}</text>
				<text>户籍：{{ memberInfo.household }}</text>
				<text>职业：{{ memberInfo.profession }}</text>
				<text>爱好：{{ memberInfo.hobbies }}</text>
			</view>
			<view class="intro">
				<text>简介：{{ memberInfo.intro }}</text>
			</view>
		</view>

		<!-- 生活瞬间区域 -->
		<view class="life-moments">
			<view class="section-title">生活瞬间（最多5图）</view>
			<view class="images">
				<!-- 循环渲染图片占位，这里模拟2张，实际可根据数据动态渲染 -->
				<view v-for="(img, index) in memberInfo.lifeMoments" :key="index" class="image-item">
					<!-- 图片占位 -->
					<image class="image-placeholder" src="http://static.ditalk.tech/salon_1002.png"></image>
					<text class="image-desc">
						{{ img.desc }}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"

	// 定义用户信息数据（可根据实际需求从接口获取）
	const memberInfo = ref({
		name: '张三',
		gender: '男',
		ageRange: '30-35',
		height: '170',
		phone: '13512415212',
		email: 'xxx@163.com',
		marrige: '未婚', // married, unmarried, divorced
		education: '大专',
		household: '广州',
		profession: '会计',
		hobbies: '跳舞、看书',
		intro: '资深产品经理，在互联网领域深耕 8 年，主导过多款百万级用户产品的全流程设计与迭代。擅长用户需求分析、产品架构搭建，曾带领团队完成 3 款现象级 APP 的开发，获行业创新奖。他热爱阅读，年均阅读 50 + 本商业、科技书籍；热衷篮球，每周组织社区篮球友谊赛，乐于通过分享与交流碰撞思维火花。',
		lifeMoments: [
			{ desc: '图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 ' },
			{ desc: '图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 图片内容描述 ' }
		]
	})

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
	onLoad(() => { // Uni lifecycle

	})

	onShow(() => { // Uni lifecycle
	})

	onMounted(() => { // Vue lifecycle
	})
</script>

<style lang="scss" scoped>
	/* 卡片整体样式 */
	.page-container {
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 16rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

		// 顶部区域
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 24rpx;
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
			padding: 24rpx 0;

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
		.life-moments {
			.section-title {
				font-size: 28rpx;
				font-weight: 500;
				margin-bottom: 20rpx;
			}

			.images {
				.image-item {
					margin-bottom: 24rpx;

					.image-placeholder {
						width: 100%;
					}

					.image-desc {
						display: block;
						font-size: 24rpx;
						line-height: 1.6;
						margin-top: 12rpx;
					}
				}
			}
		}
	}
</style>