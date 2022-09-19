<template>
  <nav>
    <el-row>
      <el-col :span="6">
        <h1>
          <router-link to="/">前端 FALLBACK</router-link>
        </h1>
      </el-col>
      <el-col :span="18">
        <ul>
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

<script>
export default {
  methods: {
    logout() {

    }
  }
};
</script>

<style lang="scss" scoped>
$link-color: #a0cfff;

nav {
  padding-left: 40px;
  padding-right: 40px;

  h1 {
    a {
      &:link,
      &:visited,
      &:hover,
      &:active {
        color: #fff;
        text-decoration: none;
      }
    }
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;

    li {
      margin-left: 20px;

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
