<template>
  <base-card>
    <template #header>
      <h1>登录</h1>
    </template>
    <el-form :model="form" :rules="rules" ref="form" label-width="70px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <base-button @click="login" :loading="isLoading">登录</base-button>
      </el-form-item>
    </el-form>
  </base-card>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      isLoading: false
    };
  },
  computed: {
    rules() {
      return {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { max: 100, message: '用户名最多 100 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { max: 100, message: '密码最多 100 个字符', trigger: 'blur' }
        ]
      };
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(async valid => {
        if (!valid) return;

        this.isLoading = true;
        try {
          await this.$store.dispatch('auth/login', this.form);
          // 当 URL 类似为 `login?redirect=/passwd` 时，可在登录后跳转至该页面
          this.$router.replace(this.$route.query.redirect || '/');
        } catch (error) {
          ElMessage({
            showClose: true,
            message: error.message,
            type: 'error'
          });
        } finally {
          this.isLoading = false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.base-card {
  width: 430px;
  margin: 130px auto 0 auto;

  h1 {
    text-align: center;
  }
}
</style>
