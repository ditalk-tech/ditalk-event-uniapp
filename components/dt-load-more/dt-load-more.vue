<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<view class="dt_load-more" v-if="hasMore">加载更多</view>
		<view class="dt_load-more" v-else>没有更多了</view>
	</view>
</template>

<script setup>

	const props = defineProps({
		hasMore: {
			type: Boolean,
			default: false
		}
	})
	
</script>

<style lang="scss" scoped>
	.page-container {

		.dt_load-more {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-top: 20rpx;
			padding: 20rpx 0rpx;
			font-size: small;
			background-color: $global-bg-gray;
			color: $global-dark-gray;
		}
	}
</style>