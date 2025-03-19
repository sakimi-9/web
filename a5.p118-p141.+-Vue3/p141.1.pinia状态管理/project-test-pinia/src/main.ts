import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initStore } from './store/init';

const app = createApp(App);
initStore(app); // 根组件上挂载 Pinia  
app.mount('#app');
