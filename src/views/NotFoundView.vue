<template>
  <div>
    <h1>Page not found</h1>
    <div class="container">
      <base-button :is-link="true" mode="flat" to="/">返回首页</base-button>
    </div>
  </div>
</template>

<script>
export default {};
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
