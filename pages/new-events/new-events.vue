<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<view class="new-event">
			<view v-for="(item,index) in dataList" :key="index" class="event" @click="toEventInfo(item.id)">
				<image class="cover-image" :src="item.coverImageUrl"></image>
				<view class="title">{{item.title}}</view>
				<view class="application-deadline">报名截止：{{dayjs(item.applicationDeadline).format('YYYY-MM-DD')}}
				</view>
				<view class="start-time">活动时间：{{dayjs(item.startTime).format('YYYY-MM-DD')}}</view>
				<view class="quota">活动名额：{{JSON.parse(item.members).length}} / {{item.quota}}</view>
				<view class="location">地点：{{item.location}}</view>
				<view class="code-btn">查看签到码</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow, onPullDownRefresh } from "@dcloudio/uni-app"
	import dayjs from 'dayjs';
	import * as EventInfoService from "@/service/EventInfoService"
	import * as ResUtil from "@/utils/ResUtil"

	const dataList = ref([])

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

	const toEventInfo = (id) => {
		uni.navigateTo({
			url: '/subPackages/event/pages/event-info/event-info?id=' + id
		})
	}
	
	const loadData = () => {
		EventInfoService.myNewEvents({ 'pageSize': 100 }).then(res => {
			dataList.value = ResUtil.getData(res)
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

		.new-event {
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

				.code-btn {
					width: 100%;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					background-color: $global-mid-gray;
					// color: $global-dark-gray;
					border-radius: 20rpx;
				}
			}
		}
	}
</style>