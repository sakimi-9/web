<script setup lang="ts">
import { ref, onMounted } from 'vue';
// 当前主题状态：'light' | 'dark' | 'system'
const theme = ref('system');

// 主题切换主逻辑，参考 Tailwind 官方文档
function applyTheme(t: 'light' | 'dark' | 'system') {
  if (t === 'light') {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
    theme.value = 'light';
  } else if (t === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
    theme.value = 'dark';
  } else {
    // 跟随系统
    localStorage.removeItem('theme');
    // 立即根据系统主题切换
    document.documentElement.classList.toggle(
      'dark',
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
    theme.value = 'system';
  }
}

// 页面加载时初始化主题
onMounted(() => {
  if (localStorage.theme === 'light') {
    applyTheme('light');
  } else if (localStorage.theme === 'dark') {
    applyTheme('dark');
  } else {
    applyTheme('system');
  }
  // 监听系统主题变化，只有在跟随系统时才响应
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (theme.value === 'system') {
      document.documentElement.classList.toggle('dark', e.matches);
    }
  });
});
</script>

<template>

  <div
    class="flex flex-col w-[500px] h-[500px] items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative">
    <!-- 主题切换按钮组 -->
    <div class="absolute top-4 right-4 flex gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
      <!-- 黑暗模式按钮 -->
      <button @click="applyTheme('dark')"
        :class="['w-8 h-8 flex items-center justify-center rounded', theme === 'dark' ? 'bg-gray-700 text-white' : 'hover:bg-gray-200']"
        aria-label="切换到黑暗模式">
        <svg t="1754635835241" class="icon flex-shrink-0" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path
            d="M85.244405 754.076389c264.681077 0 477.437955-212.756878 477.437955-477.437955 0-72.631601-15.569475-140.125276-41.492651-197.187402-15.569475-41.570499 10.353701-88.278924 51.846352-77.847376 233.542127 46.708425 410.022127 254.249529 410.022127 503.361131 0 285.466326-233.542127 519.008453-519.008453 519.008453a518.463522 518.463522 0 0 1-415.160054-207.541103c-20.785249-26.001023 5.215774-62.2779 36.354724-62.277901z m378.80533 166.126299c228.4042 0 415.237902-186.833701 415.237901-415.237901 0-160.832678-93.416851-300.957954-228.4042-368.451629 15.569475 41.492651 20.785249 88.201077 20.78525 140.125276 0 275.034778-192.049476 508.576905-451.514779 565.716879 67.493675 46.708425 155.694751 77.847376 243.895828 77.847375z"
            fill="#2c2c2c"></path>
        </svg>
      </button>
      <!-- 光亮模式按钮 -->
      <button @click="applyTheme('light')"
        :class="['w-8 h-8 flex items-center justify-center rounded', theme === 'light' ? 'bg-yellow-200 text-yellow-700' : 'hover:bg-yellow-100']"
        aria-label="切换到光亮模式">
        <svg t="1754635974030" class="icon flex-shrink-0" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="10605" width="16" height="16">
          <path
            d="M512 0C229.229714 0 0 229.229714 0 512s229.229714 512 512 512 512-229.229714 512-512S794.770286 0 512 0z m0 993.792C245.906286 993.792 30.208 778.093714 30.208 512S245.906286 30.208 512 30.208 993.792 245.906286 993.792 512 778.093714 993.792 512 993.792z"
            fill="#f4ea2a" fill-opacity="0" p-id="10606"></path>
          <path
            d="M512 237.714286c15.177143 0 27.428571-12.251429 27.428571-27.428572v-109.714285a27.392 27.392 0 1 0-54.857142 0v109.714285c0 15.177143 12.251429 27.428571 27.428571 27.428572z m0 548.571428a27.392 27.392 0 0 0-27.428571 27.428572v109.714285a27.392 27.392 0 1 0 54.857142 0v-109.714285a27.392 27.392 0 0 0-27.428571-27.428572z m411.428571-301.714285h-109.714285a27.392 27.392 0 1 0 0 54.857142h109.714285a27.392 27.392 0 1 0 0-54.857142zM237.714286 512a27.392 27.392 0 0 0-27.428572-27.428571h-109.714285a27.392 27.392 0 1 0 0 54.857142h109.714285c15.177143 0 27.428571-12.251429 27.428572-27.428571z m41.545143-193.974857a27.501714 27.501714 0 0 0 38.765714 0 27.501714 27.501714 0 0 0 0-38.765714L240.457143 201.654857a27.501714 27.501714 0 0 0-38.765714 0 27.501714 27.501714 0 0 0 0 38.802286l77.531428 77.568z m465.481142 387.949714a27.501714 27.501714 0 0 0-38.765714 0 27.501714 27.501714 0 0 0 0 38.765714l77.568 77.604572a27.501714 27.501714 0 0 0 38.765714 0 27.501714 27.501714 0 0 0 0-38.802286l-77.531428-77.568z m0-387.949714l77.604572-77.568a27.501714 27.501714 0 0 0 0-38.765714 27.501714 27.501714 0 0 0-38.802286 0l-77.568 77.531428a27.501714 27.501714 0 0 0 0 38.802286 27.501714 27.501714 0 0 0 38.765714 0zM279.259429 705.974857l-77.604572 77.568a27.501714 27.501714 0 0 0 0 38.765714 27.501714 27.501714 0 0 0 38.802286 0l77.568-77.531428a27.501714 27.501714 0 0 0 0-38.802286 27.501714 27.501714 0 0 0-38.765714 0zM512 292.571429a219.428571 219.428571 0 1 0 0 438.857142 219.428571 219.428571 0 0 0 0-438.857142z m0 384c-90.697143 0-164.571429-73.874286-164.571429-164.571429s73.874286-164.571429 164.571429-164.571429 164.571429 73.874286 164.571429 164.571429-73.874286 164.571429-164.571429 164.571429z"
            fill="#f4ea2a" p-id="10607"></path>
        </svg>
      </button>
      <!-- 跟随系统按钮 -->
      <button @click="applyTheme('system')"
        :class="['w-8 h-8 flex items-center justify-center rounded', theme === 'system' ? 'bg-gray-300 text-gray-700' : 'hover:bg-gray-100']"
        aria-label="跟随系统主题">
        <svg t="1754636312131" class="icon flex-shrink-0" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="12774" width="16" height="16">
          <path
            d="M557.888 734.848v102.976h172.8V928H294.848v-90.24h172.8v-102.912H96V96h832v638.848H557.888zM186.368 185.6v459.136h651.264V185.6H186.368z"
            fill="#333333" p-id="12775"></path>
        </svg>
      </button>
    </div>
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
  <button class="t1-button bg-amber-950">
    <span>按钮</span>
  </button>
</template>

<style scoped>
/* 响应式布局已由Tailwind类实现，无需额外媒体查询 */
</style>
