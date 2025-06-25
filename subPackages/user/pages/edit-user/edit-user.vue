<!--
Copyright 2025 DiTalk.tech All Rights Reserved.
-->
<template>
	<view class="page-container">
		<view style="padding: 20rpx;">
			<uni-forms ref="baseForm" :modelValue="formData" labelPosition="top" :rules="rules">
				<uni-forms-item label="昵称" required name="nickName">
					<uni-easyinput v-model="formData.nickName" placeholder="请输入昵称" />
				</uni-forms-item>
				<uni-forms-item label="状态" required name="openState">
					<uni-data-select v-model="formData.openState" placeholder="请选择状态" :localdata="openStateRange" />
				</uni-forms-item>
				<uni-forms-item label="性别" name="sex">
					<uni-data-select v-model="formData.sex" placeholder="请选择性别" :localdata="sexRange" />
				</uni-forms-item>
				<uni-forms-item label="出生" name="birthday">
					<uni-datetime-picker type="date" return-type="date" v-model="formData.birthday" />
				</uni-forms-item>
				<uni-forms-item label="身高" name="tall">
					<uni-easyinput type="number" v-model="formData.tall" placeholder="请输入身高" />
				</uni-forms-item>
				<uni-forms-item label="电话" name="phoneNumber">
					<uni-easyinput v-model="formData.phoneNumber" placeholder="请输入电话" />
				</uni-forms-item>
				<uni-forms-item label="邮箱" name="email">
					<uni-easyinput v-model="formData.email" placeholder="请输入邮箱" />
				</uni-forms-item>
				<uni-forms-item label="婚姻" name="maritalStatus">
					<uni-data-select v-model="formData.maritalStatus" placeholder="请选择性别"
						:localdata="maritalStatusRange" />
				</uni-forms-item>
				<uni-forms-item label="学历" name="qualification">
					<uni-easyinput v-model="formData.qualification" placeholder="请输入学历" />
				</uni-forms-item>
				<uni-forms-item label="户籍" name="placeOfOrigin">
					<uni-easyinput v-model="formData.placeOfOrigin" placeholder="请输入户籍" />
				</uni-forms-item>
				<uni-forms-item label="职业" name="career">
					<uni-easyinput v-model="formData.career" placeholder="请输入职业" />
				</uni-forms-item>
				<uni-forms-item label="爱好" name="hobby">
					<uni-easyinput v-model="formData.hobby" placeholder="请输入爱好" />
				</uni-forms-item>
				<uni-forms-item label="简介" name="profile">
					<uni-easyinput type="textarea" v-model="formData.profile" placeholder="请输入简介" />
				</uni-forms-item>
				<button @click="submit">保存</button>
			</uni-forms>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue"
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import * as MemberInfoService from "@/service/MemberInfoService"
	import * as ResUtil from "@/utils/ResUtil"

	const baseForm = ref(null)
	const formData = ref({})
	const sexRange = [
		{ value: "0", text: "男" },
		{ value: "1", text: "女" },
		{ value: "2", text: "未知" },
	]
	const openStateRange = [
		{ value: "0", text: "下线" },
		{ value: "1", text: "活跃" },
	]
	const maritalStatusRange = [
		{ value: "unmarried", text: "未婚" },
		{ value: "married", text: "已婚" },
		{ value: "divorced", text: "离异" },
		{ value: "widowed", text: "丧偶" },
		{ value: "separated", text: "分居" },
		{ value: "unknow", text: "未知" },
	]
	const rules = {
		nickName: {
			rules: [{
				required: true,
				errorMessage: '请输入昵称',
			}],
		},
		openState: {
			rules: [{
				required: true,
				errorMessage: '请选择状态',
			}],
		},
		tall: {
			rules: [{
				format: "number",
				errorMessage: '请输入身高',
			}],
		},
		phoneNumber: {
			rules: [{
				format: "number",
				errorMessage: '请输入电话号码',
			}],
		},
		email: {
			rules: [{
				format: "email",
				errorMessage: '请输入电邮地址',
			}],
		},
	}

	// const props = defineProps({})

	// Computed
	// const xxx = computed(() => {
	// 	return xxx;
	// })
	const submit = () => {
		baseForm.value.validate().then(info => {
			// console.log('表单数据信息：', info);
			info.id = formData.value.id
			info.version = formData.value.version
			MemberInfoService.updateMyInfo(info).then(res => {
				ResUtil.showMsg(res)
				uni.reLaunch({
					url: "/pages/user/user",
				})
			})
		}).catch(err => {
			// console.log('表单错误信息：', err);
			uni.showToast({
				icon: "error",
				title: "存在未通过输入项",
			})
		})
	}

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
	onLoad((options) => { // Uni lifecycle
	})

	onShow(() => { // Uni lifecycle
		MemberInfoService.myInfo().then(res => {
			formData.value = ResUtil.getData(res)
		})
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