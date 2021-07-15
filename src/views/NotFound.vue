<template>
  <div class="about">
    <h1>Page not found</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => this.$router.push({ path: "/" }), 3000);
  },
};
</script>
