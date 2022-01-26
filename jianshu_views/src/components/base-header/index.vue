<template>
  <div class="base-header">
    <div class="base-header_prefix">
      <img src="@/assets/MadPecker.png" alt="MadPecker图片">
    </div>
    <div class="base-header_container">
      <slot></slot>
    </div>
    <div class="base-header_suffix"></div>
  </div>
</template>
<style scoped>
  .base-header {
    height: 60px;
  }
</style>