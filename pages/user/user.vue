<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<!-- 顶部区域：头像、状态、点赞 -->
		<view class="user-info">
			<!-- 个人信息区域 -->
			<view class="left">
				<view class="name">{{ memberInfo.nickName }}</view>
				<view>状态：{{ memberInfo.openStateLabel }}</view>
				<view>性别：{{ memberInfo.sexLabel }}</view>
				<!-- <view>年龄段：{{ memberInfo.ageRange }}</view> -->
				<view>出生：{{ dayjs(memberInfo.birthday).format('YYYY-MM-DD') }}</view>
				<view>身高：{{ memberInfo.tall }}</view>
				<view>电话：{{ memberInfo.phoneNumber }}</view>
				<view>邮箱：{{ memberInfo.email }}</view>
				<view>婚姻：{{ memberInfo.maritalStatusLabel }}</view>
				<view>学历：{{ memberInfo.qualification }}</view>
				<view>户籍：{{ memberInfo.placeOfOrigin }}</view>
				<view>职业：{{ memberInfo.career }}</view>
				<view>爱好：{{ memberInfo.hobby }}</view>
			</view>

			<view class="right">
				<!-- 头像 -->
				<image class="avatar-circle" src="http://static.ditalk.tech/male.png"></image>
				<button @click="toEditUser">编辑信息</button>
			</view>
		</view>

		<!-- 个人简介 -->
		<view class="dt_head-title">
			<view class="title">简介</view>
		</view>
		<view class="profile">{{ memberInfo.profile }}</view>

		<!-- 生活瞬间区域 -->
		<view class="dt_head-title-noline">
			<view class="title" @click="verifyToken">生活瞬间（最多5图）</view>
			<view class="more" @click="handleEditMoments">点我编辑（最多5图）</view>
		</view>
		<view v-for="(item, index) in momentList" :key="index" class="moment">
			<image class="image" :src="item.photoUrl"></image>
			<text class="caption">
				{{ item.caption }}
			</text>
		</view>

		<dt-copyright></dt-copyright>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow, onPullDownRefresh } from "@dcloudio/uni-app"
	import * as MemberInfoService from "@/service/MemberInfoService"
	import * as MemberPhotoService from "@/service/MemberPhotoService"
	import * as AuthService from "@/service/AuthService"
	import * as ResUtil from "@/utils/ResUtil"
	import dayjs from 'dayjs';

	// 我的信息
	const memberInfo = ref({})
	const momentList = ref([])

	const toEditUser = () => {
		uni.navigateTo({
			url: '/subPackages/user/pages/edit-user/edit-user'
		})
	}
	const handleEditMoments = () => {
		uni.showToast({
			title: '进入生活瞬间编辑',
			icon: 'none'
		})
	}

	const verifyToken = () => {
		AuthService.verifyToken().then((res) => {
			ResUtil.showMsg(res, res.data.msg)
		})
	}

	const loadData = () => {
		MemberInfoService.myInfo().then((res) => {
			memberInfo.value = ResUtil.getData(res)
			if (!!memberInfo.value && !!memberInfo.value.id) {
				MemberPhotoService.listMember(memberInfo.value.id, {}).then(res => {
					momentList.value = ResUtil.getData(res)
				})
			}
		})
	}

	// Event
	onLoad(() => { // Uni lifecycle
		loadData()
	})

	onShow(() => { // Uni lifecycle
	})

	onMounted(() => { // Vue lifecycle
	})

	onPullDownRefresh(() => { // Uni lifecycle
		loadData()
		uni.stopPullDownRefresh()
	})
</script>

<style lang="scss" scoped>
	/* 卡片整体样式 */
	.page-container {
		padding-bottom: env(safe-area-inset-bottom);
		padding-bottom: constant(safe-area-inset-bottom);

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
		.moment {
			margin-bottom: 30rpx;
			padding: 0 20rpx;

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
		}
	}
</style>