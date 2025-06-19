<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<!-- 头部信息区域 -->
		<view class="user-info">
			<!-- 头像 -->
			<view class="avatar">
				<image class="avatar-circle" src="http://static.ditalk.tech/female.png"></image>
			</view>
			<!-- 个人信息 -->
			<view class="detail-info">
				<text class="name">{{ userInfo.name }}</text>
				<text>性别：{{ userInfo.gender }}</text>
				<text>年龄段：{{ userInfo.ageRange }}</text>
				<text>电话：{{ userInfo.phone }}</text>
				<text>状态：{{ userInfo.status }}</text>
			</view>
			<view class="user-id">
				<text class="id">编号：{{ userInfo.id }}</text>
				<!-- 编辑详情按钮 -->
				<button class="edit-btn" @click="handleEdit">编辑详情</button>
			</view>
		</view>

		<!-- 当前活动币区域 -->
		<view class="event-coin">
			<text class="coin-label">剩余活动币</text>
			<text class="coin-value">{{ userInfo.coin }} 枚</text>
		</view>

		<!-- 功能按钮区域 -->
		<view class="dt_head-title">
			<view class="title">我的操作</view>
		</view>
		<view class="dt_grid_wrap">
			<view class="dt_grid_3_item item odd" @click="handleMyLikes">我的点藏</view>
			<view class="dt_grid_3_item item" @click="handleLikedMe">点藏我的</view>
			<view class="dt_grid_3_item item odd" @click="handleCustomerService">联系客服</view>
		</view>

		<!-- 管理员操作区域 -->
		<view class="dt_head-title">
			<view class="title">管理员权限</view>
		</view>
		<view class="dt_grid_wrap">
			<view class="dt_grid_3_item item" @click="handleSignIn">签到操作</view>
			<view class="dt_grid_3_item item odd" @click="handleAuth">认证会员</view>
			<view class="dt_grid_3_item item"></view>
		</view>
		
		<dt-copyright></dt-copyright>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import * as AuthService from "@/service/AuthService"
	// import * as ResUtil from "@/utils/ResUtil"

	// 定义用户信息数据（可根据实际需求从接口获取）
	const userInfo = ref({
		name: '张兰',
		id: '1232123',
		gender: '女',
		ageRange: '30-35',
		phone: '13512415212',
		status: '活跃', // 活跃/停止
		coin: '300'
	})

	// 编辑详情按钮点击事件
	const handleEdit = () => {
		uni.showToast({
			title: '进入编辑详情',
			icon: 'none'
		})
		// 可扩展：跳转到编辑页面或弹出编辑弹窗
	}

	// 我的点藏按钮点击事件
	const handleMyLikes = () => {
		uni.showToast({
			title: '查看我的点藏',
			icon: 'none'
		})
		// 可扩展：跳转到我的点藏页面
	}

	// 点藏我的按钮点击事件
	const handleLikedMe = () => {
		uni.showToast({
			title: '查看点藏我的',
			icon: 'none'
		})
		// 可扩展：跳转到点藏我的页面
	}

	// 客服按钮点击事件
	const handleCustomerService = () => {
		uni.showToast({
			title: '联系客服',
			icon: 'none'
		})
		// 可扩展：跳转到客服页面或弹出客服对话框
	}

	// 签到操作按钮点击事件
	const handleSignIn = () => {
		uni.showToast({
			title: '签到成功',
			icon: 'success'
		})
		// 可扩展：调用签到接口或更新签到状态
	}

	// 认证会员按钮点击事件
	const handleAuth = () => {
		uni.showToast({
			title: '进入认证会员',
			icon: 'none'
		})
		// 可扩展：跳转到认证会员页面或弹出认证表单
	}
	
	// Event
	onLoad(() => { // Uni lifecycle
	
	})
	
	onShow(() => { // Uni lifecycle
		AuthService.doLogin()
		// UniStorage.refreshInfo()
	})
	
	onMounted(() => { // Vue lifecycle
	})
	
</script>

<style lang="scss" scoped>
	/* 页面整体样式 */
	.page-container {

		// 头部信息区域
		.user-info {
			display: flex;
			padding: 20rpx;
			border-bottom: 1rpx solid $global-light-gray;

			.avatar {
				.avatar-circle {
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
			}

			.user-id {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;

				.id {
					color: $global-dark-gray;
				}

				.edit-btn {
					font-size: small;
					color: $global-dark-gray;
				}
			}

			.detail-info {
				flex: 1;

				text {
					display: block;
					color: $global-dark-gray;
				}

				.name {
					font-size: large;
					font-weight: bold;
					color: black;
				}
			}
		}

		// 活动币区域
		.event-coin {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 40rpx 20rpx;
			border-bottom: 1rpx solid $global-light-gray;

			.coin-label {}

			.coin-value {
				color: $global-dark-gray;
			}
		}

		.dt_grid_wrap {

			.item {
				border: 1px solid $global-mid-gray;
				height: 250rpx;
				box-sizing: border-box;
				align-items: center;
				justify-content: center;
			}

			.odd {
				background-color: $global-light-gray;
			}
		}
	}
</style>