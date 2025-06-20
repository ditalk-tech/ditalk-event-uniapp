<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<image class="banner" :src="bannerImageUrl"></image>
		<view class="dt_head-title">
			<view class="title">喜讯消息<text style="font-size: small;">（总数 256）</text></view>
			<view class="more" @click="toPage('newsInfoList')">更多...</view>
		</view>
		<view class="news-info">
			<view v-for="(item,index) in newsInfoList" :key="index" class="items">
				<view class="event-time">{{item.eventTime}}</view>
				<view class="content">{{item.content}}</view>
			</view>
		</view>
		<view class="dt_head-title">
			<view class="title">最新活动</view>
			<view class="more" @click="toPage('newEventList')">更多...</view>
		</view>
		<view class="new-event">
			<view v-for="(item,index) in newEventList" :key="index" class="event" @click="toEventInfo(true)">
				<image class="cover-image" :src="newEvent.coverImage"></image>
				<view class="title">{{newEvent.title}}</view>
				<view class="application-deadline">报名截止：{{newEvent.applicationDeadline}}</view>
				<view class="start-time">活动时间：{{newEvent.startTime}}</view>
				<view class="people-number">已报名人数：{{newEvent.peopleNumber}}</view>
				<view class="location">地点：{{newEvent.location}}</view>
				<view class="register-btn">我要报名</view>
			</view>
		</view>
		<view class="dt_head-title">
			<view class="title">历史活动</view>
			<view class="more" @click="toPage('eventInfoList')">更多...</view>
		</view>
		<view class="event-info">
			<view v-for="(item,index) in eventInfoList" :key="index" class="event" @click="toEventInfo(false)">
				<image class="cover-image" :src="eventInfo.coverImage"></image>
				<view class="title">{{eventInfo.title}}</view>
				<view class="application-deadline">报名截止：{{eventInfo.applicationDeadline}}</view>
				<view class="start-time">活动时间：{{eventInfo.startTime}}</view>
				<view class="people-number">已报名人数：{{eventInfo.peopleNumber}}</view>
				<view class="location">地点：{{eventInfo.location}}</view>
			</view>
		</view>
		<dt-copyright></dt-copyright>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import * as BannerService from "@/service/BannerService"
	import * as ResUtil from "@/utils/ResUtil"

	// Props
	
	// Data
	const bannerImageUrl = ref()
	// const title = ref()
	const newsInfoList = ref([
		{ eventTime: '2022-01-05 12:00', content: '张三、李四' },
		{ eventTime: '2022-01-04 12:00', content: '王五、陈红' },
		{ eventTime: '2022-01-03 12:00', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02 12:00', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01 12:00', content: '罗伟、陈红红' },
	])

	const newEvent = ref({
		coverImage: 'http://static.ditalk.tech/salon_1001.png',
		title: '兴趣交流沙龙',
		applicationDeadline: '2022-01-05 12:00',
		startTime: '2022-01-06 10:00',
		peopleNumber: 10,
		location: '深圳市南山区前海路3168号XXX活动中心xxx多媒体室'
	})
	const newEventList = ref([{}, {}, {}, {}, {}, ])
	const eventInfo = ref({
		coverImage: 'http://static.ditalk.tech/salon_1001.png',
		title: '兴趣交流沙龙',
		applicationDeadline: '2022-01-05 12:00',
		startTime: '2022-01-06 10:00',
		peopleNumber: 10,
		location: '深圳市南山区前海路3168号XXX活动中心xxx多媒体室'
	})
	const eventInfoList = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, ])

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

	const toPage = (pageName) => {
		switch (pageName) {
			case 'newsInfoList':
				uni.navigateTo({
					url: '/subPackages/news/pages/news-info-list/news-info-list'
				})
				break;
			case 'newEventList':
				uni.navigateTo({
					url: '/subPackages/event/pages/new-event-list/new-event-list'
				})
				break;
			case 'eventInfoList':
				uni.navigateTo({
					url: '/subPackages/event/pages/event-info-list/event-info-list'
				})
				break;
			default:
				break;
		}
	}

	const toEventInfo = (id) => {
		uni.navigateTo({
			url: '/subPackages/event/pages/event-info/event-info?id=' + id
		})
	}

	// Event
	onLoad(() => { // Uni lifecycle

	})

	onShow(async () => { // Uni lifecycle
		bannerImageUrl.value = await BannerService.getImage()
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
		margin-bottom: 80rpx;

		.banner {
			width: 100%;
		}

		.news-info {
			box-sizing: border-box;
			width: 100%;
			padding: 0 20rpx;

			.total-number {
				color: $global-dark-gray;
				margin-left: 10rpx;
			}

			.items {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: small;
				margin-bottom: 6rpx;

				.event-time {
					color: $global-dark-gray;
					white-space: nowrap;
				}

				.content {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-left: 20rpx;
				}
			}
		}

		.new-event,
		.event-info {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			width: 100%;
			padding: 0 20rpx;
			margin-top: 20rpx;

			.event {
				width: 49%;
				margin-bottom: 10rpx;
				background-color: #fff;
				border-radius: 10rpx;
				padding: 10rpx;
				box-sizing: border-box;
				border: 1px solid $global-mid-gray;
				font-size: small;

				.cover-image {
					width: 100%;
					height: 200rpx;
					border-radius: 10rpx;
				}

				.title {}

				.start-time {
					color: $global-dark-gray;
				}

				.application-deadline {
					color: $global-dark-gray;
				}

				.people-number {
					color: $global-dark-gray;
				}

				.location {
					color: $global-dark-gray;
					margin-bottom: 10rpx;
				}

				.register-btn {
					width: 100%;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					background-color: $global-pink;
					color: $global-white;
					border-radius: 20rpx;
				}
			}
		}
	}
</style>