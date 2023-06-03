<template>
  <div class="home-page">
    <router-link to="/ws">WebSocket</router-link>
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
}
</style>
