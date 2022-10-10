<template>
  <el-container>
    <el-header v-if="isLoggedIn">
      <the-header/>
    </el-header>
    <el-main>
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<script setup>
import TheHeader from '@/components/layout/TheHeader.vue';
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import { useStore } from 'vuex';

// 设置网站标题
useHead({
  title: '前端演示项目'
});

const store = useStore();
const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);

const init = async () => {
// 尝试从 Local Storage 读取登录信息, 防止 F5 丢失登录信息
  await store.dispatch('auth/tryLogin');
};
init();
</script>

<style lang="scss">
#nprogress {
  .bar {
    background: red !important;
  }
}

body {
  margin: 0;
}

.el-header {
  background-color: #337ecc;
  color: #fff;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.route-enter-active {
  transition: all .3s ease-out;
}

.route-leave-active {
  transition: all .3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
