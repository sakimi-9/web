// src/store/modules/user.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        name: '张三', // 用户名称
        age: 20,     // 用户年龄
    }),
    actions: {
        updateName(newName: string) {
            this.name = newName; // 更新用户名称
        },
        incrementAge() {
            this.age += 1;       // 增加用户年龄
        },
    },
});