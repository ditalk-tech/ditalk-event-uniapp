<template>
	<view class="page-container">
		<image class="banner" src="http://static.ditalk.tech/salon_1001.png"></image>
		<dt-copyright></dt-copyright>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import * as AuthService from "@/service/AuthService"
	import * as ResUtil from "@/utils/ResUtil"

	// const title = ref()
	const title = ref('深圳帝拓科技服务中心')

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

	// Event
	onLoad(() => { // Uni lifecycle

	})

	onShow(() => { // Uni lifecycle
		AuthService.doLogin()
		// UniStorage.refreshInfo()
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
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		.banner {
			width: 100%;
			height: 300rpx;
			margin-bottom: 50rpx;
		}
	}
</style>