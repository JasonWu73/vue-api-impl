<template>
  <el-button v-if="!isLink" :class="mode" :loading="isLoading">
    <slot></slot>
  </el-button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    isLink: {
      type: Boolean,
      required: false,
      default: false
    },
    mode: {
      type: String,
      required: false,
      default: 'flat',
      validator(value) {
        return ['flat', 'outline'].includes(value);
      }
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
};
</script>

<style lang="scss" scoped>
$button-color: #409EFF;
$button-color-hover: #79bbff;

button {
  color: $button-color;
  border-radius: 20px;
  border: none;
  background-color: transparent;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: $button-color;
    color: #fff;
  }

  &.flat {
    color: #fff;
    background-color: $button-color;

    &:hover {
      background-color: $button-color-hover;
    }
  }

  &.outline {
    border: 1px solid $button-color;
  }
}

a {
  color: $button-color;
  text-decoration: none;
  border-radius: 20px;

  &:link,
  &:visited,
  &:active {
    padding: 10px 20px;
  }

  &:hover {
    background-color: $button-color;
    color: #fff;
  }

  &.flat {
    color: #fff;
    background-color: $button-color;

    &:hover {
      background-color: $button-color-hover;
    }
  }

  &.outline {
    border: 1px solid $button-color;
  }
}
</style>
