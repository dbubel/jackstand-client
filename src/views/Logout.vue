<template>
  <div class="div"></div>
</template>
<script>
import firebase from "firebase";
export default {
  beforeMount() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.push({ name: "Login" });
      })
      .catch((err) => {
        alert(err.message);
      });
  },
};
</script>
