import Vue from 'vue'
import App from './app.vue'

const root = document.createElement('div')
document.body.appendChild(root)

new vue({
	render: (h) => h(App)
}).$mount(root)