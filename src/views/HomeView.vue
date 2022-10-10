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
import { useStore } from 'vuex';
import { reactive } from 'vue';

useHead({
  title: '前端演示项目'
});

const versionData = reactive({
  version: '',
  machineCode: ''
});

const store = useStore();
const init = async () => {
  const { version, machineCode } = await store.dispatch('getVersion');
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
