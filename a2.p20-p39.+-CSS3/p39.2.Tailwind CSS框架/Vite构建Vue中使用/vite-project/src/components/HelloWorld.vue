<script setup lang="ts">
import { ref, computed } from 'vue';
const theme = ref(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
const icon = computed(() => theme.value === 'dark' ? 'light_mode' : 'dark_mode');

function setTheme(t: 'light' | 'dark') {
  if (t === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
    theme.value = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
    theme.value = 'light';
  }
}

function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark');
}
</script>

<template>
  <div
    class="flex flex-col w-[500px] h-[500px] items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative">
    <!-- 主题切换按钮 -->
    <button @click="toggleTheme"
      class="absolute top-4 right-4 text-2xl p-2 rounded-full bg-white dark:bg-gray-800 shadow-md transition-colors duration-300"
      aria-label="切换主题">
      <span class="material-symbols-outlined">{{ icon }}</span>
    </button>
    <!-- 6个彩色div容器 -->
    <div class="w-full max-w-5xl grid grid-cols-2 md:grid-cols-3 gap-6 mt-20">
      <div
        class="h-32 rounded-lg bg-red-400 dark:bg-red-600 flex items-center justify-center text-white text-xl font-bold shadow">
        1</div>
      <div
        class="h-32 rounded-lg bg-blue-400 dark:bg-blue-600 flex items-center justify-center text-white text-xl font-bold shadow">
        2</div>
      <div
        class="h-32 rounded-lg bg-green-400 dark:bg-green-600 flex items-center justify-center text-white text-xl font-bold shadow">
        3</div>
      <div
        class="h-32 rounded-lg bg-yellow-400 dark:bg-yellow-600 flex items-center justify-center text-white text-xl font-bold shadow">
        4</div>
      <div
        class="h-32 rounded-lg bg-purple-400 dark:bg-purple-600 flex items-center justify-center text-white text-xl font-bold shadow">
        5</div>
      <div
        class="h-32 rounded-lg bg-pink-400 dark:bg-pink-600 flex items-center justify-center text-white text-xl font-bold shadow">
        6</div>
    </div>
    <!-- 字体图标库全局引入，无需在此引入 -->
  </div>
</template>

<style scoped>
/* 响应式布局已由Tailwind类实现，无需额外媒体查询 */
</style>
