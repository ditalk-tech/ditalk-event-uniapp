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
				<view class="signed-up-btn" v-if="isSignedUp(item.members)">我已报名</view>
				<view class="sign-up-btn" v-else>我要报名</view>		
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
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
	const isSignedUp = (members) => {
		// 如果members文本中包含当前用户的id，则返回true，否则返回false
		const myId = uni.getStorageSync("myId")
		return members.includes('"' + myId + '"');
	}

	const toEventInfo = (id) => {
		uni.navigateTo({
			url: '/subPackages/event/pages/event-info/event-info?id=' + id
		})
	}

	// Event
	onLoad(() => { // Uni lifecycle
		EventInfoService.newEvents({ 'pageSize': 100 }).then(res => {
			dataList.value = ResUtil.getData(res)
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

		.new-event {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			// align-items: center;
			box-sizing: border-box;
			width: 100%;
			padding: 20rpx 20rpx 40rpx 20rpx;

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

				.sign-up-btn,
				.signed-up-btn {
					width: 100%;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					border-radius: 20rpx;
				}

				.sign-up-btn {
					background-color: $global-pink;
					color: $global-white;
				}

				.signed-up-btn {
					background-color: $global-bg-gray;
					color: $global-dark-gray;
				}
			}
		}
	}
</style>