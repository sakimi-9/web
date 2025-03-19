<template>
    <div>
      <p>用户名称：{{ userStore.name }}</p>
      <p>用户年龄：{{ userStore.age }}</p>
      <button @click="updateName('李四')">更新名称</button>
      <button @click="incrementAge">增加年龄</button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useUserStore } from '../store/modules/user';
  
  const userStore = useUserStore();
  
  const updateName = (newName: string) => {
    userStore.updateName(newName); // 调用 action 更新名称
  };
  
  const incrementAge = () => {
    userStore.incrementAge();      // 调用 action 增加年龄
  };
  </script>