<template>
  <router-view></router-view>
</template>

<script>
import axios from './http/index'
export default {
  // mounted() {
  //   let option = {
  //     method: 'get',
  //     path: 'http://localhost:3000/users/find',
  //     params: {

  //     }
  //   }
  //   axios(option).then(res => {
  //     console.log(res);
  //   })
  // }
}
</script>

<style>
  html,body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
</style>