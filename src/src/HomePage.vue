<template>
  <div class="home-page">
    <p>
      <router-link to="/ws">WebSocket</router-link>
      |
      <router-link to="/tools">Tools</router-link>
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
