<template>
  <base-card>
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model.trim="formData.oldPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model.trim="formData.newPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model.trim="formData.confirmPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <base-button @click="submitForm" :loading="isLoading">确认</base-button>
        <base-button mode="outline" @click="$router.go(-1);">返回</base-button>
      </el-form-item>
    </el-form>
  </base-card>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { useHead } from '@vueuse/head';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';

// 设置网站标题
useHead({
  title: '修改密码'
});

const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});


const formRef = ref(null);
const validateConfirmPassword = (rule, value, callback) => {
  if (value && formRef.value.newPassword && value !== this.form.newPassword) {
    callback(new Error('确认密码与新密码输入不匹配'));
    return;
  }
  callback();
};
const rules = reactive({
  oldPassword: [
    { required: true, message: '旧密码不能为空', trigger: 'blur' },
    { max: 100, message: '旧密码最多 100 个字符', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    { max: 100, message: '新密码最多 100 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '确认密码不能为空', trigger: 'blur' },
    { max: 100, message: '确认密码最多 100 个字符', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
});

const isLoading = ref(false);
const store = useStore();
const submitForm = () => {
  formRef.value.validate(async valid => {
    if (!valid) return;

    isLoading.value = true;
    try {
      await store.dispatch('auth/changePassword', formData);
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
  max-width: 600px;
  margin: 0 auto 0 auto;
}
</style>
