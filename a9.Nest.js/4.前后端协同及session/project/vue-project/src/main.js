import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // 引入样式文件

const app = createApp(App);

app.use(ElementPlus).mount('#app');
//先在创建根组件上使用element-plus，在安装导出app