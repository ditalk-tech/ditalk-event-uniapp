<template>
	<view class="page-container">
		<!-- 顶部区域：头像、状态、点赞 -->
		<view class="user-info">
			<!-- 个人信息区域 -->
			<view class="left">
				<view class="name">{{ memberInfo.name }}</view>
				<view>状态：活跃</view>
				<view>性别：{{ memberInfo.gender }}</view>
				<!-- <view>年龄段：{{ memberInfo.ageRange }}</view> -->
				<view>出生日期：1992年5月6日</view>
				<view>身高：{{ memberInfo.height }}</view>
				<view>电话：{{ memberInfo.phone }}</view>
				<view>邮箱：{{ memberInfo.email }}</view>
				<view>婚姻：{{ memberInfo.marrige }}</view>
				<view>学历：{{ memberInfo.education }}</view>
				<view>户籍：{{ memberInfo.household }}</view>
				<view>职业：{{ memberInfo.profession }}</view>
				<view>爱好：{{ memberInfo.hobbies }}</view>
			</view>

			<view class="right">
				<!-- 头像 -->
				<image class="avatar-circle" src="http://static.ditalk.tech/male.png"></image>
				<button @click="handleEditInfo">编辑信息</button>
			</view>
		</view>

		<!-- 个人简介 -->
		<view class="dt_head-title">
			<view class="title">简介</view>
		</view>
		<view class="profile">{{ memberInfo.intro }}</view>

		<!-- 生活瞬间区域 -->
		<view class="dt_head-title">
			<view class="title">生活瞬间展示</view>
			<view class="more" @click="handleEditMoments">点我编辑（最多5图）</view>
		</view>
		<!-- 循环渲染图片占位，这里模拟2张，实际可根据数据动态渲染 -->
		<view v-for="(img, index) in memberInfo.lifeMoments" :key="index" class="life-moments">
			<!-- 图片占位 -->
			<image class="image" src="http://static.ditalk.tech/salon_1002.png"></image>
			<view class="desc">
				{{ img.desc }}
			</view>
		</view>
		<dt-copyright></dt-copyright>
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
	
	
	const handleEditInfo = () => {
		uni.showToast({
			title: '进入信息编辑',
			icon: 'none'
		})
	}
	const handleEditMoments = () => {
		uni.showToast({
			title: '进入生活瞬间编辑',
			icon: 'none'
		})
	}
</script>

<style lang="scss" scoped>
	/* 卡片整体样式 */
	.page-container {

		// 简介
		.user-info {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 0 20rpx;
			padding: 20rpx 0;

			.left {

				.name {
					font-size: large;
					font-weight: bold;
					margin-bottom: 20rpx;
				}
			}

			.right {
				.avatar-circle {
					width: 300rpx;
					height: 300rpx;
					border-radius: 50%;
					background-color: $global-light-gray;
				}
			}
		}

		.profile {
			margin: 0 20rpx;
			padding: 20rpx 0 40rpx 0;
			color: $global-dark-gray;
		}

		// 生活瞬间区域
		.life-moments {
			margin: 0 20rpx;
			margin-bottom: 24rpx;

			.image {
				width: 100%;
			}

			.desc {
				color: $global-dark-gray;
				font-size: small;
			}
		}
	}
</style>