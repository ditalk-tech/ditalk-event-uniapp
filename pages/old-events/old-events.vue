<template>
	<view class="page-container">
		<view class="event-info">
			<view v-for="(item,index) in eventInfoList" :key="index" class="event" @click="toEventInfo(false)">
				<image class="cover-image" :src="eventInfo.coverImage"></image>
				<view class="title">{{eventInfo.title}}</view>
				<view class="start-time">活动时间：{{eventInfo.startTime}}</view>
				<view class="people-number">已报名人数：{{eventInfo.peopleNumber}}</view>
				<view class="location">地点：{{eventInfo.location}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	// import * as ResUtil from "@/utils/ResUtil"
	// import * as UniStorage from "@/common/UniStorage"

	// const title = ref()

	// const props = defineProps({})
	const eventInfo = ref({
		coverImage: 'http://static.ditalk.tech/salon_1001.png',
		title: '兴趣交流沙龙',
		startTime: '2022-01-06 10:00',
		peopleNumber: 10,
		location: '深圳市南山区前海路3168号XXX活动中心xxx多媒体室'
	})
	const eventInfoList = ref([
		{},{},{},{},{},{},{},{},{},{},
		{},{},{},{},{},{},{},{},{},{},
		{},{},{},{},{},{},{},{},{},{},
	])

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

	// Event
	onLoad(() => { // Uni lifecycle

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
		margin-bottom: 80rpx;

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