<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<image class="cover-image" :src="eventInfo.coverImageUrl"></image>
		<view class="event-info">
			<view class="title">{{eventInfo.title}}</view>
			<view class="application-deadline">报名截止：{{dayjs(eventInfo.applicationDeadline).format('YYYY-MM-DD HH:mm')}}
			</view>
			<view class="start-time">活动时间：{{dayjs(eventInfo.startTime).format('YYYY-MM-DD HH:mm')}}</view>
			<view class="people-number">
				活动名额：{{memberList.length}} / {{eventInfo.quota}}
			</view>
			<view class="gender-ratio">男女比例：{{maleCount}} : {{femaleCount}}</view>
			<view class="location">活动地点：{{eventInfo.location}}</view>
			<view class="arrangement">活动安排</view>
			<view class="arrangement-text">{{eventInfo.arrangement}}</view>
			<button class="register-btn" v-if="isNew" @click="register">我要报名</button>
		</view>
		<view class="dt_head-title">
			<view class="title">报名人员</view>
		</view>
		<view class="member-list">
			<view v-for="(item,index) in memberList" :key="index" class="member-info" @click="toMemberInfo(item.id)">
				<image class="avatar" :src="item.avatar"></image>
				<view>
					<text class="name">{{item.name}}</text>
					<uni-icons type="heart" size="12"></uni-icons>
				</view>
			</view>
		</view>

		<template v-if="!isNew">
			<view class="dt_head-title">
				<view class="title">活动精彩瞬间</view>
			</view>
			<view class="moment-list" v-for="(item,index) in momentList" :key="index">
				<image class="moment-image" :src="item.imageUrl"></image>
				<view class="moment-desc">{{item.summary}}</view>
			</view>
		</template>

		<dt-copyright></dt-copyright>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import dayjs from 'dayjs';
	import * as EventInfoService from "@/service/EventInfoService"
	import * as ResUtil from "@/utils/ResUtil"

	const infoId = ref(0)
	const isNew = ref(false)
	const eventInfo = ref({
		coverImageUrl: '',
		// memberIds: '[]'
	})
	const memberList = ref([])
	const momentList = ref([])

	// const props = defineProps({})

	// Computed
	// const xxx = computed(() => {
	// 	return xxx;
	// })
	const maleCount = computed(() => {
		return memberList.value.filter(item => item.sex == '男').length
	})
	const femaleCount = computed(() => {
		return memberList.value.filter(item => item.sex == '女').length
	})

	// Watch
	// watch(xxx, (newValue) => {
	// })

	// Emit
	// const emit = defineEmits(['change', 'remove', 'empty'])
	// const onChange = (value) => {
	// 	emit('change', arg1, arg2)
	// }

	// Methods
	const register = () => {
		uni.showModal({
			title: '报名提示',
			content: '连续爽约3次后，3个月内停止报名权限。\n当前报名不支持取消。',
			showCancel: true,
			success: function(res) {
				if (res.confirm) {
					console.log('点击确定');
				} else if (res.cancel) {
					console.log('点击取消');
				}
			}
		})
	}

	const toMemberInfo = (id) => {
		uni.navigateTo({
			url: '/subPackages/member/pages/member-info/member-info?id=' + id
		})
	}

	// Event
	onLoad((options) => { // Uni lifecycle
		infoId.value = options.id
		EventInfoService.detail(infoId.value).then(res => {
			eventInfo.value = ResUtil.getData(res)
			memberList.value = JSON.parse(eventInfo.value.memberIds)
			momentList.value = eventInfo.value.eventMoments
			isNew.value = dayjs(eventInfo.value.applicationDeadline).isAfter(dayjs())
		})
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

		.cover-image {
			width: 100%;
		}

		.event-info {
			margin: 0 20rpx;

			.title {
				font-size: large;
				font-weight: bold;
			}

			.start-time {}

			.application-deadline {}

			.people-number {}

			.location {}

			.arrangement {
				margin-top: 20rpx;
			}
			
			.arrangement-text {
				color: $global-dark-gray;
				margin-bottom: 30rpx;
			}

			.register-btn {
				width: 100%;
				text-align: center;
				background-color: $global-pink;
				color: $global-white;
				border-radius: 20rpx;
				margin-bottom: 20rpx;
			}
		}

		.member-list {
			box-sizing: border-box;
			margin: 0 20rpx;
			padding-bottom: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			flex-wrap: wrap;

			.member-info {
				display: flex;
				flex-direction: column;
				// justify-content: space-between;
				align-items: center;

				margin: 5rpx 0;
				border: 1px solid $global-light-gray;

				.avatar {
					width: 110rpx;
					height: 110rpx;
					border-radius: 50%;
					margin: 10rpx;
				}

				.name {
					font-size: medium;
					margin-right: 20rpx;
				}

				.uni-icons {}
			}
		}

		.moment-list {

			.moment-image {
				width: 100%;
			}

			.moment-desc {
				font-size: small;
				color: $global-dark-gray;
				margin: 10rpx 20rpx;
				margin: 0 20rpx 20rpx 20rpx;
			}
		}
	}
</style>