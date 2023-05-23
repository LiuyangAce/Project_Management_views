<template>
<!-- 个人资料 -->
  <div class="defaultLayout">
    <base-header></base-header>
    <router-view></router-view>
  </div>
</template>
<script>
import BaseHeader from '@/components/base-header'
export default {
  components: {
    BaseHeader,
  },
}
</script>