import App from './App'
import * as GlobalConfig from '@/common/GlobalConfig.js'

// 添加全局的 uni.addInterceptor('request', Object)
uni.addInterceptor('request', {
	invoke(args) {
		args.url = GlobalConfig.domain + args.url
		args.header = {
			"clientid": GlobalConfig.clientId // 与后端约定，目前写死
		}
		let token = uni.getStorageSync("token")
		if (!!token) {
			Object.assign(args.header, {"Authorization": "Bearer " + token})
		}
		console.debug(args)
	},
	success(res) {
		console.debug(res)
	},
	fail(error) {
		console.debug(error) // 如网络无法连接
		uni.showToast({
			title: error.errMsg,
			icon: 'none'
		})
	}
})

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif