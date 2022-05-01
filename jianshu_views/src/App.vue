<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  created() {
    if (Cookies.get('madpecker')) {
      this.$router.push({ name: 'User' })
    }else {
      this.$router.push({ name: 'Login' })
    }
  },
  mounted() {
  },
  computed: {
    layout() {
      return this.$route.meta.layout
    }
  }
}
</script>

<style>
  html,body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
</style>