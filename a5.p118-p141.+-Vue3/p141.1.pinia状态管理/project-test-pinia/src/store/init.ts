// src/store/init.ts
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

// 创建 Pinia 实例
const store = createPinia();

// 配置持久化
store.use(
    createPersistedState({
        key: (id) => `__APP__${id}__`.toUpperCase(), // 自定义持久化存储的 key
    }),
);

// 初始化 Pinia
const initStore = (app: App<Element>) => {
    return app.use(store);
};

export { store, initStore };