<template>
  <div>
    <h1>Page not found</h1>
    <div class="container">
      <base-button :is-link="true" mode="flat" to="/">返回首页</base-button>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@vueuse/head';

// 设置网站标题
useHead({
  title: '404'
});
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
