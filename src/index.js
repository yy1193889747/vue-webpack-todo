import Vue from 'vue'
import App from './app.vue'

import './assets/images/pic.jpg'
import './assets/style/test.css'

const root = document.createElement('div')
document.body.appendChild(root)

new vue({
	render: (h) => h(App)
}).$mount(root)