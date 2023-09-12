import {createApp} from 'vue'
import {createPinia} from "pinia";
import router from "./router/router";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia());
app.use(router);
app.use(Antd);

app.mount('#app');

// todo  跳转回主页面定位不准确 应该用上次的位置哦
// todo  返回首页的时候 它的定位不准确  path 跳转到了 / 路径下不合理

