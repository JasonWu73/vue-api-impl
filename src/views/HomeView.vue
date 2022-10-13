<template>
  <base-card>
    <template #header>
      <h1>Hello REST API</h1>
    </template>
    <p>版本：{{ versionData.version }}</p>
    <p>机器码：{{ versionData.machineCode }}</p>
  </base-card>
</template>

<script setup>
// 设置网站标题
import { useHead } from '@vueuse/head';
import { useVersionStore } from '@/stores/version.js';
import { reactive } from 'vue';

useHead({
  title: '前端演示项目'
});

const versionData = reactive({
  version: '',
  machineCode: ''
});

const init = async () => {
  const versionStore = useVersionStore();
  const { version, machineCode } = await versionStore.getVersion();
  versionData.version = version;
  versionData.machineCode = machineCode;
};
init();
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
