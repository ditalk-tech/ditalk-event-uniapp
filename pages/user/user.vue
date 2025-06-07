<template>
	<view class="page-container">
		<!-- 基本信息 -->
		<view class="dt_head-title">信息</view>
		<view style="height: 300rpx;"></view>
		<!-- 统计数据 -->
		<view class="dt_head-title">统计</view>
		<view style="height: 300rpx;"></view>
		<!-- 设置 -->
		<view class="dt_head-title">设置</view>
		<view style="height: 300rpx;"></view>
		<!-- 其他 -->
		<view>
			<button type="default" size="mini" style="margin: 10rpx 20rpx; width: 710rpx;" @click="logout">登出</button>
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
	const logout = () => {
		AuthService.logout()
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
	.page-container {}
</style>