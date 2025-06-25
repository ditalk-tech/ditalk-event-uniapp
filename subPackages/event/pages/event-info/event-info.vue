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
			<!-- 新的活动 -->
			<template v-if="isNew">
				<!-- 报名后显示验证码 -->
				<button size="mini" class="signed-up-btn" v-if="isSignedUp">签到码：{{signCode}}</button>
				<!-- 显示报名按钮 -->
				<button size="mini" class="sign-up-btn" @click="signup(eventInfo.id)" v-else>我要报名</button>
			</template>
			<!-- 历史活动 -->
			<template v-else>
				<!-- 报名后才会有显示验证码 -->
				<button size="mini" class="signed-up-btn" v-if="isSignedUp">签到码：{{signCode}}</button>
			</template>
		</view>
		<view class="dt_head-title">
			<view class="title">报名人员</view>
		</view>
		<view class="member-list">
			<view v-for="(item,index) in memberList" :key="index" class="member-info" @click="toMemberInfo(item.id)">
				<image class="avatar" :src="item.avatar"></image>
				<view>
					<view class="name">{{item.name}}</view>
					<!-- <uni-icons type="heart" size="12"></uni-icons> -->
				</view>
			</view>
		</view>
		<!-- 历史活动 -->
		<template v-if="!isNew">
			<view class="dt_head-title-noline">
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
	import * as EventMemberService from "@/service/EventMemberService"
	import * as ResUtil from "@/utils/ResUtil"

	const isNew = ref(false)
	const eventInfo = ref({
		coverImageUrl: '',
		// members: '[]'
	})
	const memberList = ref([])
	const momentList = ref([])
	const isSignedUp = ref(false) // 判断是否已经报名
	const signCode = ref('') // 签到码

	// const props = defineProps({})

	// Computed
	const maleCount = computed(() => {
		return memberList.value.filter(item => item.sex == '0').length
	})
	const femaleCount = computed(() => {
		return memberList.value.filter(item => item.sex == '1').length
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
	const signup = (eventId) => {
		uni.showModal({
			title: '报名提示',
			content: '当前报名不支持取消。\t\n若连续爽约3次，3个月内不能报名。',
			showCancel: true,
			success: function(res) {
				if (res.confirm) {
					EventMemberService.signup(eventId).then(res => {
						ResUtil.showMsg(res)
						getEventDetail(eventId)
					})
				} else if (res.cancel) {}
			},
		})
	}

	const toMemberInfo = (id) => {
		uni.navigateTo({
			url: '/subPackages/member/pages/member-info/member-info?id=' + id
		})
	}

	const getEventDetail = (eventId) => {
		EventInfoService.detail(eventId).then(res => {
			eventInfo.value = ResUtil.getData(res)
			memberList.value = JSON.parse(eventInfo.value.members)
			momentList.value = eventInfo.value.eventMoments
			isNew.value = dayjs(eventInfo.value.applicationDeadline).isAfter(dayjs())
			// 判断是否已经报名
			isSignedUp.value = eventInfo.value.members.includes('"' + uni.getStorageSync("myId") + '"');
			if (isSignedUp.value) {
				getSignCode(eventId)
			}
		})
	}

	/**
	 * 获取签到码
	 * @param {number} eventId 活动id
	 */
	const getSignCode = (eventId) => {
		EventMemberService.myEventData(eventId).then(res => {
			signCode.value = ResUtil.getData(res).signCode
		})
	}

	// Event
	onLoad((options) => { // Uni lifecycle
		// options.id == eventId
		getEventDetail(options.id)
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
				margin: 6rpx 0 12rpx 0;
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

			.sign-up-btn,
			.signed-up-btn {
				width: 100%;
				text-align: center;
				border-radius: 20rpx;
				margin-bottom: 20rpx;
			}

			.sign-up-btn {
				background-color: $global-pink;
				color: $global-white;
			}

			.signed-up-btn {
				background-color: $global-bg-gray;
				color: $global-dark-gray;
				font-size: large;
				font-weight: bold;
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
				align-items: center;

				margin: 5rpx 0;
				border: 1px solid $global-light-gray;

				.avatar {
					width: 56px;
					height: 56px;
					border-radius: 50%;
					margin: 6px;
				}

				.name {
					font-size: small;
					// margin-right: 4px;

					/* 禁止换行 */
					white-space: nowrap;
					/* 超出部分隐藏 */
					overflow: hidden;
					/* 显示省略号 */
					text-overflow: ellipsis;
					/* 最大宽度限制 */
					max-width: 68px;
				}


				.uni-icons {}
			}
		}

		.moment-list {
			margin: 0 20rpx;

			.moment-image {
				border-radius: 16rpx;
				width: 100%;
			}

			.moment-desc {
				font-size: small;
				color: $global-dark-gray;
				margin-top: 4rpx;
				margin-bottom: 20rpx;
			}
		}
	}
</style>