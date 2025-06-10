<template>
	<view class="page-container">
		<image class="cover-image" :src="eventInfo.coverImage"></image>
		<view class="event-info">
			<view class="title">{{eventInfo.title}}</view>
			<view class="application-deadline">报名截止：{{eventInfo.applicationDeadline}}</view>
			<view class="start-time">活动时间：{{eventInfo.startTime}}</view>
			<view class="people-number">报名人数：{{eventInfo.peopleNumber}}</view>
			<view class="gender-ratio">男女比例：{{eventInfo.gendarRatio}}</view>
			<view class="location">活动地点：{{eventInfo.location}}</view>
			<view class="arrangement">活动安排：{{eventInfo.arrangement}}</view>
			<button class="register-btn" v-if="isNew" @click="register">我要报名</button>
		</view>
		<view class="dt_head-title">
			<view class="title">会员名单</view>
		</view>
		<view class="member-list">
			<view v-for="(item,index) in memberInfoList" :key="index" class="member-info" @click="toMemberInfo(0)">
				<image class="avatar" src="http://static.ditalk.tech/female.png"></image>
				<view>
					<text class="name">xxx</text>
					<uni-icons type="heart" size="12"></uni-icons>
				</view>
			</view>
		</view>

		<view class="dt_head-title" v-if="!isNew">
			<view class="title">活动精彩瞬间</view>
		</view>
		<template v-if="!isNew">
			<image class="moment-image" src="http://static.ditalk.tech/salon_1001.png"></image>
			<view class="moment-desc">精彩瞬间描述......精彩瞬间描述......精彩瞬间描述......精彩瞬间描述......</view>
			<image class="moment-image" src="http://static.ditalk.tech/salon_1001.png"></image>
			<view class="moment-desc">精彩瞬间描述......精彩瞬间描述......精彩瞬间描述......精彩瞬间描述......</view>
			<image class="moment-image" src="http://static.ditalk.tech/salon_1001.png"></image>
			<view class="moment-desc">精彩瞬间描述......精彩瞬间描述......精彩瞬间描述......精彩瞬间描述......</view>
			<image class="moment-image" src="http://static.ditalk.tech/salon_1001.png"></image>
			<view class="moment-desc">精彩瞬间描述......精彩瞬间描述......精彩瞬间描述......精彩瞬间描述......</view>
			<image class="moment-image" src="http://static.ditalk.tech/salon_1001.png"></image>
			<view class="moment-desc">精彩瞬间描述......精彩瞬间描述......精彩瞬间描述......精彩瞬间描述......</view>
		</template>

		<dt-copyright></dt-copyright>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import * as AuthService from "@/service/AuthService"
	// import * as ResUtil from "@/utils/ResUtil"

	const isNew = ref(false)

	// const props = defineProps({})
	// const eventInfo = ref(getEventInfo(id))
	const eventInfo = ref({
		coverImage: 'http://static.ditalk.tech/salon_1001.png',
		title: '2025年春季兴趣交流沙龙',
		applicationDeadline: '2025-03-05 12:00',
		startTime: '2025-03-06 10:00',
		peopleNumber: '100',
		gendarRatio: '54:56',
		location: '深圳市南山区前海路3168号XXX活动中心xxx多媒体室',
		arrangement: '兴趣交流沙龙活动首先安排参与者签到领取姓名贴，主持人通过破冰游戏活跃氛围并介绍活动流程；接着主嘉宾围绕主题进行干货分享，并穿插互动答疑；随后进入茶歇环节，供参与者自由交流；之后开展分组讨论、实操体验、趣味竞赛等互动环节，深化交流；最后主持人总结活动内容，收集反馈，公布后续计划，全员合影并赠送礼品，活动结束后建立线上群分享资料以维持社群活跃。',
		members: '全体学生'
	})

	const memberInfoList = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])

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
	const getEventInfo = (id) => {
		return {
			coverImage: 'http://static.ditalk.tech/salon_1001.png',
			title: '2025年春季兴趣交流沙龙',
			applicationDeadline: '2025-03-05 12:00',
			startTime: '2025-03-06 10:00',
			peopleNumber: '100',
			gendarRatio: '54:56',
			location: '深圳市南山区前海路3168号XXX活动中心xxx多媒体室',
			arrangement: '兴趣交流沙龙活动首先安排参与者签到领取姓名贴，主持人通过破冰游戏活跃氛围并介绍活动流程；接着主嘉宾围绕主题进行干货分享，并穿插互动答疑；随后进入茶歇环节，供参与者自由交流；之后开展分组讨论、实操体验、趣味竞赛等互动环节，深化交流；最后主持人总结活动内容，收集反馈，公布后续计划，全员合影并赠送礼品，活动结束后建立线上群分享资料以维持社群活跃。',
			members: '全体学生'
		}
	}

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
		console.log("options", options)
		isNew.value = options.id == "true"
	})

	onShow(() => { // Uni lifecycle
		AuthService.doLogin()
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
		padding-bottom: 80rpx;

		.cover-image {
			width: 100%;
		}

		.event-info {
			// box-sizing: border-box;
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
				// color: $global-dark-gray;
				margin-bottom: 20rpx;
			}

			.register-btn {
				width: 100%;
				// height: 60rpx;
				// line-height: 40rpx;
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

		.moment-image {
			width: 100%;
		}

		.moment-desc {
			margin: 0 20rpx 20rpx 20rpx;
		}
	}
</style>