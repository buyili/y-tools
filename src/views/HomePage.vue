<template>
  <div class="home-page">
    <p style="font-size: 36px;">
      <router-link to="/ws">WebSocket</router-link>
      |
      <router-link to="/tools">Tools</router-link>
      |
      <router-link to="/tools/file-path">File Path</router-link>
      |
      <router-link to="/tools/mybatis">mybatis</router-link>
      |
      <router-link to="/tools/json-to-ts">json to ts</router-link>
      |
      <router-link to="/tools/css-to-json">css to json</router-link>
      |
      <router-link to="/tools/wx/jssdk">wx js sdk</router-link>
      |
      <router-link to="/tools/npm-search">npm search</router-link>
      |
      <router-link to="/notes">Notes</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "HomePage",
}
</script>

<style scoped>
.home-page{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
}
</style>
