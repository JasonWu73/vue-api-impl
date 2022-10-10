<template>
  <base-card>
    <template #header>
      <div class="title">
        <img src="@/assets/logo.png" alt="Vue Logo">
        <h1>登录</h1>
      </div>
    </template>
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="66px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="formData.username" @keyup.enter="login"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="formData.password" type="password" @keyup.enter="login"></el-input>
      </el-form-item>
      <el-form-item>
        <base-button @click="login" :loading="isLoading">登录</base-button>
      </el-form-item>
    </el-form>
  </base-card>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { useHead } from '@vueuse/head';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

// 设置网站标题
useHead({
  title: '登录'
});

const formData = reactive({
  username: '',
  password: ''
});

const rules = reactive({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { max: 100, message: '用户名最多 100 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { max: 100, message: '密码最多 100 个字符', trigger: 'blur' }
  ]
});

const store = useStore();
const router = useRouter();
const route = useRoute();
const formRef = ref(null);
const isLoading = ref(false);
const login = () => {
  formRef.value.validate(async valid => {
    if (!valid) return;

    isLoading.value = true;
    try {
      await store.dispatch('auth/login', formData);
      // 当 URL 类似为 `login?redirect=/passwd` 时，可在登录后跳转至该页面
      router.replace(route.query.redirect || '/');
    } catch (error) {
      ElMessage({
        showClose: true,
        message: error.message,
        type: 'error'
      });
    } finally {
      isLoading.value = false;
    }
  });
};
</script>

<style lang="scss" scoped>
.base-card {
  max-width: 430px;
  margin: 130px auto 0 auto;

  .title {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 32px;
      height: 32px;
    }

    h1 {
      text-align: center;
    }
  }
}
</style>
