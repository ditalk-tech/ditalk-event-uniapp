<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<view class="dt_head-title">
			<view class="title">总数 {{newsInfoTotal}}</view>
		</view>
		<view class="news-info">
			<view v-for="(item,index) in newsInfoList" :key="index" class="items">
				<view class="event-time">{{item.eventTime}}</view>
				<view class="content">{{item.content}}</view>
			</view>
		</view>
		<dt-load-more :hasMore="hasMore"></dt-load-more>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow, onReachBottom } from "@dcloudio/uni-app"
	import * as NewsInfoService from "@/service/NewsInfoService"
	import * as ResUtil from "@/utils/ResUtil"

	const newsInfoTotal = ref(0)
	const newsInfoList = ref([])
	const lastId = ref("")
	const hasMore = ref(true)

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
	const loadMore = () => {
		loadNewsInfo()
	}

	const loadNewsInfo = () => {
		let pageSize = 30 // 默认是30
		if (hasMore.value) {
			uni.showLoading({ title: '加载中', mask: true })
			NewsInfoService.list({ 'id': lastId.value, 'pageSize': pageSize }).then(res => {
				const newDate = ResUtil.getData(res)
				if (!!newDate && newDate.length > 0) {
					newsInfoList.value = [...newsInfoList.value, ...newDate]; // 展开追加记录
					lastId.value = newsInfoList.value.at(-1).id
					newDate.length >= pageSize ? hasMore.value = true : hasMore.value = false
				} else {
					hasMore.value = false
				}
			}).finally(() => {
				uni.hideLoading()
			})
		} else {
			hasMore.value = false
		}
	}

	// Event
	onLoad((options) => { // Uni lifecycle
		//
		loadNewsInfo()
		//
		NewsInfoService.total().then(res => {
			newsInfoTotal.value = ResUtil.getData(res)
		})
	})

	onShow(() => { // Uni lifecycle
	})

	onMounted(() => { // Vue lifecycle

	})

	onReachBottom(() => {
		loadMore()
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

		.news-info {
			box-sizing: border-box;
			width: 100%;
			padding: 0 20rpx;

			.items {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 30rpx;
				margin-bottom: 6rpx;

				.event-time {
					color: #999;
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
	}
</style>