<template>
  <el-card class="base-card">
    <template #header v-if="$slots.header">
      <slot name="header"></slot>
    </template>
    <slot></slot>
  </el-card>
</template>

<script>
export default {};
</script>

<style scoped>

</style>
