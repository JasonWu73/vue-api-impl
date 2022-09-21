<template>
  <base-card>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model.trim="form.oldPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model.trim="form.newPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model.trim="form.confirmPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <base-button @click="submitForm" :loading="isLoading">确认</base-button>
        <base-button mode="outline" @click="$router.go(-1);">返回</base-button>
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
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      isLoading: false
    };
  },
  computed: {
    rules() {
      return {
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
          { validator: this.validateConfirmPassword, trigger: 'blur' }
        ]
      };
    }
  },
  methods: {
    validateConfirmPassword(rule, value, callback) {
      if (value && this.form.newPassword && value !== this.form.newPassword) {
        callback(new Error('确认密码与新密码输入不匹配'));
        return;
      }
      callback();
    },
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (!valid) return;

        this.isLoading = true;
        try {
          await this.$store.dispatch('auth/changePassword', this.form);
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
  max-width: 600px;
  margin: 0 auto 0 auto;
}
</style>
