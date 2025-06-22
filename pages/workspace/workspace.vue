<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<view class="dt_grid_wrap">
			<view class="dt_grid_3_item item odd" @click="verifyToken">
				验证token
			</view>
			<view class="dt_grid_3_item item">
				x
			</view>
			<view class="dt_grid_3_item item odd">
				x
			</view>
			<view class="dt_grid_3_item item">
				x
			</view>
			<view class="dt_grid_3_item item odd">
				x
			</view>
			<view class="dt_grid_3_item item">
				x
			</view>
			<view class="dt_grid_3_item item odd">
				x
			</view>
			<view class="dt_grid_3_item item">
				x
			</view>
			<view class="dt_grid_3_item item odd">
				x
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import * as ResUtil from "@/utils/ResUtil"
	import * as AuthService from "@/service/AuthService"

	onLoad((options) => {
		console.log("options", options)
	})
	onShow(() => {
		console.log("onShow")
	})
	
	const verifyToken = () => {
		AuthService.verifyToken().then((res) => {
			ResUtil.showMsg(res, res.data.msg)
		})
	}
</script>

<style lang="scss" scoped>
	.page-container {
		padding-bottom: env(safe-area-inset-bottom);
		padding-bottom: constant(safe-area-inset-bottom);
		
		.dt_grid_wrap {

			.item {
				border: 1px solid $global-mid-gray;
				height: 250rpx;
				box-sizing: border-box;
				align-items: center;
				justify-content: center;
			}
			
			.odd {
				background-color: $global-light-gray;
			}
		}
	}
</style>