<template>
  <section class="nav">
    <router-link to="/">Home</router-link>
  </section>
  <router-view />
</template>

<script>
export default {
    name: "LayoutPage",
}
</script>

<style>
.nav{
    text-align: center;
}
</style>
