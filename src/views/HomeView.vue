<template>
  <base-card>
    <template #header>
      <h1>Hello REST API</h1>
    </template>
    <p>{{ name }}</p>
    <p>{{ version }}</p>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      version: '',
      name: ''
    };
  },
  async created() {
    const { version, name } = await this.$store.dispatch('getVersion');
    this.version = version;
    this.name = name;
  }
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
