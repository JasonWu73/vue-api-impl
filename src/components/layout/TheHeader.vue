<template>
  <nav>
    <el-row>
      <el-col :span="6">
        <router-link to="/" class="title">
          <img src="@/assets/logo.png" alt="Vue Logo">
          <h1>前端 FALLBACK</h1>
        </router-link>
      </el-col>
      <el-col :span="18">
        <ul>
          <li style="display: flex; align-items: center;">
            <el-icon>
              <User/>
            </el-icon>
            <span>用户名</span>
          </li>
          <li>
            <router-link to="/passwd">修改密码</router-link>
          </li>
          <li>
            <a href="javascript:void(0);" @click="logout">注销</a>
          </li>
        </ul>
      </el-col>
    </el-row>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js';

const auth = useAuthStore();

const logout = () => auth.logout();
</script>

<style lang="scss" scoped>
$link-color: #a0cfff;

nav {
  padding-left: 40px;
  padding-right: 40px;

  a.title {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:link,
    &:visited,
    &:hover,
    &:active {
      color: #fff;
      text-decoration: none;
    }

    img {
      width: 38px;
      height: 38px;
    }
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;

    li {
      margin-left: 20px;

      .el-icon {
        margin-right: 4px;
      }

      a {
        color: $link-color;
        text-decoration: none;

        &:link,
        &:visited,
        &:active {
          padding: 10px 20px;
        }

        &:hover {
          background-color: $link-color;
          color: #fff;
        }

        &.router-link-active {
          border: 2px solid $link-color;
        }
      }
    }
  }
}
</style>
