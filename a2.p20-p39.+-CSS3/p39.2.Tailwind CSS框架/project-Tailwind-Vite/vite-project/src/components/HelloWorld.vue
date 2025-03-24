<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div class='box-border size-150 bg-emerald-200 dark:bg-red-200'>
    <h1 class='text-black'>{{ msg }}</h1>
    <div class="card text-blue-300 dark:text-red-300">
      <button type="button" @click="count++">count is {{ count }}</button>
    </div>
  </div>
</template>
