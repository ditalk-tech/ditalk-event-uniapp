<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<image src="/static/logo.svg" class="logo"></image>
		<button @click="login" v-if="showRefresh">登录刷新</button>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import * as AuthService from "@/service/AuthService"
	// import * as ResUtil from "@/utils/ResUtil"

	// const title = ref()
	const showRefresh = ref(false)

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
	const login = () => {
		uni.showLoading({
			title: '登录中...',
			mask: true
		})
		showRefresh.value = false
		AuthService.doLogin()
		setTimeout(() => {
			showRefresh.value = true
			uni.hideLoading()
		}, 3000)
	}

	// Event
	onLoad((options) => { // Uni lifecycle
		login()
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.logo {
			width: 400rpx;
			height: 400rpx;
			margin: 0 auto;
			margin-top: 100rpx;
		}

	}
</style>