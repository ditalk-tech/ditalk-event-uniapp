<template>
	<view class="page-container">
		<view class="dt_head-title">
			<view class="title">总数 256</view>
		</view>
		<view class="news-info">
			<view v-for="(item,index) in newsInfoList" :key="index" class="items">
				<view class="event-time">{{item.eventTime}}</view>
				<view class="content">{{item.content}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import * as AuthService from "@/service/AuthService"
	// import * as ResUtil from "@/utils/ResUtil"

	// const title = ref()

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
	const newsInfoList = ref([
		{ eventTime: '2022-01-05 12:00', content: '张三、李四' },
		{ eventTime: '2022-01-04', content: '王五、陈红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
		{ eventTime: '2022-01-05 12:00', content: '张三、李四' },
		{ eventTime: '2022-01-04', content: '王五、陈红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
		{ eventTime: '2022-01-05 12:00', content: '张三、李四' },
		{ eventTime: '2022-01-04', content: '王五、陈红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
		{ eventTime: '2022-01-05 12:00', content: '张三、李四' },
		{ eventTime: '2022-01-04', content: '王五、陈红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
		{ eventTime: '2022-01-05 12:00', content: '张三、李四' },
		{ eventTime: '2022-01-04', content: '王五、陈红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
		{ eventTime: '2022-01-05 12:00', content: '张三、李四' },
		{ eventTime: '2022-01-04', content: '王五、陈红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
		{ eventTime: '2022-01-05 12:00', content: '张三、李四' },
		{ eventTime: '2022-01-04', content: '王五、陈红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
		{ eventTime: '2022-01-05 12:00', content: '张三、李四' },
		{ eventTime: '2022-01-04', content: '王五、陈红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
		{ eventTime: '2022-01-05 12:00', content: '张三、李四' },
		{ eventTime: '2022-01-04', content: '王五、陈红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
		{ eventTime: '2022-01-05 12:00', content: '张三、李四' },
		{ eventTime: '2022-01-04', content: '王五、陈红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
		{ eventTime: '2022-01-05 12:00', content: '张三、李四' },
		{ eventTime: '2022-01-04', content: '王五、陈红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
		{ eventTime: '2022-01-05 12:00', content: '张三、李四' },
		{ eventTime: '2022-01-04', content: '王五、陈红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
		{ eventTime: '2022-01-05 12:00', content: '张三、李四' },
		{ eventTime: '2022-01-04', content: '王五、陈红' },
		{ eventTime: '2022-01-03', content: '邓宝、张艳' },
		{ eventTime: '2022-01-02', content: '刘农伟、吴利利' },
		{ eventTime: '2022-01-01', content: '罗伟、陈红红' },
	])

	// Event
	onLoad(() => { // Uni lifecycle

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

		.news-info {
			box-sizing: border-box;
			width: 100%;
			padding: 0 20rpx;

			.items {
				display: flex;
				justify-content: space-between;
				align-items: center;
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