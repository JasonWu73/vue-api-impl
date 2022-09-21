<template>
  <base-card>
    <template #header>
      <h1>Hello REST API</h1>
    </template>
    <p>版本：{{ version }}</p>
    <p>构建时间：{{ built }}</p>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      version: '',
      built: ''
    };
  },
  async created() {
    const { version, built } = await this.$store.dispatch('getVersion');
    this.version = version;
    this.built = built;
  }
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
