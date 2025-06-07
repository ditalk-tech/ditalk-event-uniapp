<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 单行省略 */
	.one-line-ellipsis {
		/* 防止文本换行 */
		white-space: nowrap;
		/* 隐藏超出部分 */
		overflow: hidden;
		/* 显示省略号 */
		text-overflow: ellipsis;
		/* 设置容器的宽度 */
		width: inherit;
	}
	
	/* Sticky */
	.dt_sticky-box {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		position: -webkit-sticky;
		/* #endif */
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		background-color: white;
	}

	/* 浅色标签 */
	.dt_light-tags {
		padding: 0rpx 16rpx;
		border-radius: 8rpx;
		background-color: $global-mid-gray;
		border: 1rpx solid rgba(0, 0, 0, 0.2);
		font-size: small;
		color: $global-dark-gray;
	}

	/* 深色标签 */
	.dt_dark-tags {
		padding: 0rpx 16rpx;
		border-radius: 8rpx;
		background-color: $global-dark-gray;
		border: 1rpx solid rgba(255, 255, 255, 0.4);
		font-size: small;
		color: $global-mid-gray;
	}

	/* 块标题 */
	.dt_head-title {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		padding: 16rpx 20rpx;
		border-bottom: 1rpx solid $global-mid-gray;

		.title {
			flex: 1;
		}
		
		.border {
			font-weight: bolder;
		}

		.more {
			font-size: small;
		}
	}

	/* 行间隙 */
	.dt_line-gap {
		height: 16rpx;
		background-color: $global-light-gray;
	}
	
	.dt_text-ellipsis {
		/* #ifndef APP-NVUE */
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		/* #endif */
		/* #ifdef APP-NVUE */
		lines: 1;
		/* #endif */
	}

	.dt_text-ellipsis-2 {
		/* #ifndef APP-NVUE */
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		/* #endif */

		/* #ifdef APP-NVUE */
		lines: 2;
		/* #endif */
	}
	
	.dt_grid_wrap {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		
		.dt_grid_3_item {
			display: flex;
			flex-direction: column;
			width: 33.33333%;
		}
		
		.dt_grid_4_item {
			display: flex;
			flex-direction: column;
			width: 25%;
		}
	}
</style>
