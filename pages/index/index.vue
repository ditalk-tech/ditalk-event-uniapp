<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<image class="banner" :src="bannerUrl"></image>
		<view class="dt_head-title">
			<view class="title">喜讯消息<text style="font-size: small;">（总数 {{newsInfoTotal}}）</text></view>
			<view class="more" @click="toPage('newsInfoList')">更多...</view>
		</view>
		<view class="news-info">
			<view v-for="(item,index) in newsInfoList" :key="index" class="items">
				<view class="event-time">{{dayjs(item.eventTime).format('YYYY-MM-DD')}}</view>
				<view class="content">{{item.content}}</view>
			</view>
		</view>
		<view class="dt_head-title">
			<view class="title">最新活动</view>
			<view class="more" @click="toPage('newEventList')">更多...</view>
		</view>
		<view class="new-event">
			<view v-for="(item,index) in newEventList" :key="index" class="event" @click="toEventInfo(item.id)">
				<image class="cover-image" :src="item.coverImageUrl"></image>
				<view class="title">{{item.title}}</view>
				<view class="application-deadline">
					报名截止：{{dayjs(item.applicationDeadline).format('YYYY-MM-DD HH:mm')}}
				</view>
				<view class="start-time">活动时间：{{dayjs(item.startTime).format('YYYY-MM-DD HH:mm')}}</view>
				<view class="quota">活动名额：{{JSON.parse(item.memberIds).length}} / {{item.quota}}</view>
				<view class="location">地点：{{item.location}}</view>
				<view class="register-btn">我要报名</view>
			</view>
		</view>
		<view class="dt_head-title">
			<view class="title">历史活动</view>
			<view class="more" @click="toPage('oldEventList')">更多...</view>
		</view>
		<view class="old-event">
			<view v-for="(item,index) in oldEventList" :key="index" class="event" @click="toEventInfo(item.id)">
				<image class="cover-image" :src="item.coverImageUrl"></image>
				<view class="title">{{item.title}}</view>
				<view class="application-deadline">
					报名截止：{{dayjs(item.applicationDeadline).format('YYYY-MM-DD HH:mm')}}
				</view>
				<view class="start-time">活动时间：{{dayjs(item.startTime).format('YYYY-MM-DD HH:mm')}}</view>
				<view class="quota">活动名额：{{JSON.parse(item.memberIds).length}} / {{item.quota}}</view>
				<view class="location">地点：{{item.location}}</view>
			</view>
		</view>
		<dt-copyright></dt-copyright>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import dayjs from 'dayjs';
	import * as BannerService from "@/service/BannerService"
	import * as NewsInfoService from "@/service/NewsInfoService"
	import * as EventInfoService from "@/service/EventInfoService"
	import * as ResUtil from "@/utils/ResUtil"

	// Props

	// Data
	const bannerUrl = ref()
	const newsInfoList = ref([])
	const newsInfoTotal = ref(0)
	const newEventList = ref([])
	const oldEventList = ref([])

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
			case 'oldEventList':
				uni.navigateTo({
					url: '/subPackages/event/pages/old-event-list/old-event-list'
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
	onLoad((options) => { // Uni lifecycle
		BannerService.getImage().then(res => {
			const jsonStr = ResUtil.getData(res)
			bannerUrl.value = JSON.parse(jsonStr).url
		})
		NewsInfoService.list({ 'pageSize': 4 }).then(res => {
			newsInfoList.value = ResUtil.getData(res)
		})
		NewsInfoService.total().then(res => {
			newsInfoTotal.value = ResUtil.getData(res)
		})
		EventInfoService.newList({ 'pageSize': 6 }).then(res => {
			newEventList.value = ResUtil.getData(res)
		})
		EventInfoService.oldList({ 'pageSize': 16 }).then(res => {
			oldEventList.value = ResUtil.getData(res)
		})
	})

	onShow(() => { // Uni lifecycle
		// // 
		// const newsInfoRes = await NewsInfoService.getNewsInfoList()
		// newsInfoList.value = ResUtil.getData(newsInfoRes)
		// // 
		// const res = await BannerService.getImage()
		// const jsonStr = ResUtil.getData(res)
		// bannerUrl.value = JSON.parse(jsonStr).url
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
		.old-event {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			// align-items: center;
			box-sizing: border-box;
			width: 100%;
			padding: 0 20rpx;
			margin-top: 20rpx;

			.event {
				display: flex;
				flex-direction: column;
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

				.title {
					margin: 6rpx 0;
				}

				.start-time,
				.application-deadline,
				.quota,
				.location {
					color: $global-dark-gray;
				}

				.location {
					flex: 1;
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