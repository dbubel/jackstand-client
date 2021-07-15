<template>
  <div class="tile is-ancestor">
    <div class="tile is-8 is-vertical is-parent">
      <div class="tile is-child box">
        <p class="title">PassWork</p>
        <p class="subtitle">
          A simplistic password manager designed for people who want a no frills
          secure solution to keeping their credentials and sensitive information
          safe.
        </p>
      </div>
    </div>
    <div class="tile is-parent">
      <div class="tile is-child box">
        <p class="title">Login</p>
        <b-field label="Email">
          <b-input type="email" v-model="email" placeholder="@" maxlength="30">
          </b-input>
        </b-field>
        <b-field label="Password">
          <b-input type="password" v-model="password" password-reveal>
          </b-input>
        </b-field>
        <b-button @click="onsubmit">Login</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onsubmit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$buefy.toast.open({
            message: "Login Success!",
            type: "is-success",
          });
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>

<style></style>
