<template>
  <div class="box">
    <b-navbar>
      <template shadow="true" #brand>
        <b-navbar-item href="/">
          <img
            src="@/assets/pic.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item href="/"> <strong>Home</strong> </b-navbar-item>
        <b-navbar-item href="/passwordgenerator">
          <strong>Password Generator</strong>
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item v-if="authenticated" href="/logout">
          Logout
        </b-navbar-item>

        <b-navbar-item v-if="!authenticated" href="/signup">
          <b-button type="is-primary" @click="gotoSignup">Signup</b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then((data) => console.log(data))
        .catch((err) => alert(err.message));
    },
    gotoSignup() {
      this.$router.push("/signup");
    },
  },

  data() {
    return {
      authenticated: false,
    };
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authenticated = true;
      }
    });
  },
};
</script>

<style lang="scss">
#template {
  padding-inline-end: 10px;
}
</style>
