<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<!-- XXX -->
		<view></view>
		<view></view>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	// import * as ResUtil from "@/utils/ResUtil""

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
		padding-bottom: env(safe-area-inset-bottom);
		padding-bottom: constant(safe-area-inset-bottom);
	}
</style>
